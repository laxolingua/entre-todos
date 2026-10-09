-- ENTRE TODOS · Banco de propuestas · esquema base
-- Esquema propio ("banco"), separado de las tablas heredadas del prototipo en "public".
-- Lectura pública solo de lo publicado. Ninguna escritura desde el navegador:
-- la carga y las correcciones se hacen con la clave de servicio o desde migraciones.

create extension if not exists unaccent with schema extensions;

create schema if not exists banco;
comment on schema banco is 'Banco de propuestas de ENTRE TODOS: propuestas verbatim con fuente, categorías, temas y valoraciones.';

-- Búsqueda en español sin distinguir tildes ("transicion" encuentra "transición").
create text search configuration banco.es (copy = pg_catalog.spanish);
alter text search configuration banco.es
  alter mapping for hword, hword_part, word with extensions.unaccent, spanish_stem;

-- ---------------------------------------------------------------- tablas

create table banco.ambito (
  codigo text primary key check (codigo ~ '^[A-Z]{2}$'),
  nombre text not null
);
comment on table banco.ambito is 'País o territorio al que pertenece una propuesta. Hoy solo CU; preparado para otros países.';

create table banco.categoria (
  clave       text primary key check (clave ~ '^[a-z_]+$'),
  nombre      text not null,
  fase        text,
  descripcion text,
  declarada   boolean not null default true,
  orden       int not null default 100
);
comment on column banco.categoria.declarada is 'false = categoría usada en propuestas pero con nombre provisional pendiente de confirmar.';

create table banco.actor (
  id         text primary key check (id ~ '^[a-z0-9-]+$'),
  nombre     text not null,
  tipo       text not null check (tipo in ('ACAD','COAL','ORG','PERS')),
  web        text check (web is null or web ~ '^https?://'),
  verificado boolean not null default false,
  creado_en  timestamptz not null default now()
);
comment on table banco.actor is 'Organización, coalición o persona autora de documentos. Distinto de los usuarios de la plataforma.';

create table banco.fuente (
  ref                   int primary key,
  id_catalogo           text,
  tipo                  text not null check (tipo in ('ACAD','COAL','ORG','PERS')),
  documento             text not null,
  url                   text not null check (url ~ '^https?://'),
  actor_id              text references banco.actor(id),
  autor_texto           text,
  atribucion_verificada boolean not null default false,
  metodo_verificacion   text check (metodo_verificacion in ('dominio_oficial','documento_revisado','instinct')),
  nota_verificacion     text,
  verificada_en         date,
  duplicado_de          int references banco.fuente(ref),
  enlace_estado         text not null default 'sin_comprobar'
                        check (enlace_estado in ('ok','roto','bloqueado','sin_comprobar')),
  enlace_comprobado_en  timestamptz
);
comment on column banco.fuente.duplicado_de is 'Misma obra base que otra referencia. Se conserva para no perder trazabilidad.';

create table banco.tema (
  slug        text primary key check (slug ~ '^[a-z0-9-]+$'),
  nombre      text not null,
  descripcion text
);
comment on table banco.tema is 'Tema que agrupa propuestas parecidas de fuentes distintas (fusiones del banco).';

create table banco.propuesta (
  id             text primary key check (id ~ '^P-[0-9]{4,}$'),
  ambito         text not null default 'CU' references banco.ambito(codigo),
  cita           text not null check (length(btrim(cita)) > 0),
  localizacion   text,
  tema_fino      text not null,
  titular        text not null,
  resumen        text,
  fuente_ref     int not null references banco.fuente(ref),
  fecha_texto    text,
  anio           int check (anio between 1800 and 2100),
  estado_cita    text not null check (estado_cita in ('Verbatim-primario','Verbatim-secundario')),
  forma_cita     text not null default 'literal' check (forma_cita in ('literal','secundaria','citada','parafraseada')),
  tipo           text not null check (tipo in ('propuesta','critica','reforma_propuesta')),
  gremio         text,
  origen         text not null default 'organizacion' check (origen in ('organizacion','ciudadana')),
  estado         text not null default 'publicada' check (estado in ('publicada','en_revision','retirada')),
  motivo_estado  text,
  version        int not null default 1,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  busqueda       tsvector generated always as (
                   setweight(to_tsvector('banco.es'::regconfig, coalesce(titular, '')), 'A') ||
                   setweight(to_tsvector('banco.es'::regconfig, coalesce(cita, '')), 'B') ||
                   setweight(to_tsvector('banco.es'::regconfig, coalesce(resumen, '')), 'C')
                 ) stored
);
comment on column banco.propuesta.cita is 'Texto literal del documento fuente. Nunca se reescribe.';
comment on column banco.propuesta.resumen is 'Resumen editorial de la postura. Se muestra marcado como resumen.';
comment on column banco.propuesta.estado_cita is 'Verbatim-secundario = la cita viene de una síntesis de prensa, no del documento original.';
comment on column banco.propuesta.forma_cita is 'literal = palabras del autor; secundaria = texto de una fuente que recoge sus ideas; citada = palabras del autor entrecomilladas por la prensa; parafraseada = resumen del periodista, no cita literal.';

create index propuesta_busqueda_idx on banco.propuesta using gin (busqueda);
create index propuesta_fuente_idx on banco.propuesta (fuente_ref);
create index propuesta_tema_fino_idx on banco.propuesta (tema_fino);

create table banco.propuesta_categoria (
  propuesta_id    text not null references banco.propuesta(id) on delete cascade,
  categoria_clave text not null references banco.categoria(clave),
  orden           smallint not null default 0,
  primary key (propuesta_id, categoria_clave)
);
create index propuesta_categoria_cat_idx on banco.propuesta_categoria (categoria_clave);

create table banco.tema_propuesta (
  tema_slug    text not null references banco.tema(slug) on delete cascade,
  propuesta_id text not null references banco.propuesta(id) on delete cascade,
  primary key (tema_slug, propuesta_id)
);
create index tema_propuesta_prop_idx on banco.tema_propuesta (propuesta_id);

create table banco.no_propuesta (
  id           text primary key,
  cita         text not null,
  localizacion text,
  fuente_ref   int references banco.fuente(ref),
  tipo         text not null,
  motivo       text not null
);
comment on table banco.no_propuesta is 'Fragmentos revisados y excluidos del banco, con el motivo. Públicos por transparencia.';

-- ---------------------------------------------------------------- historial

create table banco.propuesta_version (
  id           bigint generated always as identity primary key,
  propuesta_id text not null references banco.propuesta(id) on delete cascade,
  version      int not null,
  anterior     jsonb not null,
  motivo       text,
  cambiado_en  timestamptz not null default now()
);
comment on table banco.propuesta_version is 'Copia de cada versión anterior de una propuesta (Carta §6: queda registro de qué cambió).';
create index propuesta_version_prop_idx on banco.propuesta_version (propuesta_id, version);

create function banco.registrar_version() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (old.cita, old.localizacion, old.titular, old.resumen, old.fuente_ref, old.estado, old.estado_cita, old.forma_cita, old.tipo)
     is not distinct from
     (new.cita, new.localizacion, new.titular, new.resumen, new.fuente_ref, new.estado, new.estado_cita, new.forma_cita, new.tipo) then
    return new;  -- nada sustantivo cambió
  end if;
  insert into banco.propuesta_version (propuesta_id, version, anterior, motivo)
  values (old.id, old.version,
          to_jsonb(old) - 'busqueda',
          nullif(current_setting('banco.motivo_cambio', true), ''));
  new.version := old.version + 1;
  new.actualizado_en := now();
  return new;
end $$;

create trigger propuesta_historial
  before update on banco.propuesta
  for each row execute function banco.registrar_version();

-- ---------------------------------------------------------------- permisos

alter table banco.ambito              enable row level security;
alter table banco.categoria           enable row level security;
alter table banco.actor               enable row level security;
alter table banco.fuente              enable row level security;
alter table banco.tema                enable row level security;
alter table banco.propuesta           enable row level security;
alter table banco.propuesta_categoria enable row level security;
alter table banco.tema_propuesta      enable row level security;
alter table banco.no_propuesta        enable row level security;
alter table banco.propuesta_version   enable row level security;

create policy lectura_publica on banco.ambito              for select to anon, authenticated using (true);
create policy lectura_publica on banco.categoria           for select to anon, authenticated using (true);
create policy lectura_publica on banco.actor               for select to anon, authenticated using (true);
create policy lectura_publica on banco.fuente              for select to anon, authenticated using (true);
create policy lectura_publica on banco.tema                for select to anon, authenticated using (true);
create policy lectura_publica on banco.no_propuesta        for select to anon, authenticated using (true);
create policy lectura_publica on banco.propuesta           for select to anon, authenticated using (estado = 'publicada');
create policy lectura_publica on banco.propuesta_categoria for select to anon, authenticated
  using (exists (select 1 from banco.propuesta p where p.id = propuesta_id and p.estado = 'publicada'));
create policy lectura_publica on banco.tema_propuesta      for select to anon, authenticated
  using (exists (select 1 from banco.propuesta p where p.id = propuesta_id and p.estado = 'publicada'));
create policy lectura_publica on banco.propuesta_version   for select to anon, authenticated
  using (exists (select 1 from banco.propuesta p where p.id = propuesta_id and p.estado = 'publicada'));

grant usage on schema banco to anon, authenticated;
grant select on all tables in schema banco to anon, authenticated;
revoke insert, update, delete, truncate on all tables in schema banco from anon, authenticated;

-- ---------------------------------------------------------------- API pública (vistas)
-- Vistas en "public" para que la API REST de Supabase las sirva sin exponer el esquema entero.
-- security_invoker: respetan las políticas de quien consulta.

create view public.banco_propuestas with (security_invoker = true) as
select p.id, p.ambito, p.titular, p.cita, p.localizacion, p.resumen, p.tema_fino,
       (select tp.tema_slug from banco.tema_propuesta tp
         where tp.propuesta_id = p.id order by tp.tema_slug limit 1) as tema,
       array(select pc.categoria_clave from banco.propuesta_categoria pc
             where pc.propuesta_id = p.id order by pc.orden) as categorias,
       p.anio, p.fecha_texto, p.estado_cita, p.forma_cita, p.tipo, p.origen, p.version, p.actualizado_en,
       f.ref as fuente_ref, f.documento as fuente_documento, f.url as fuente_url, f.tipo as fuente_tipo,
       a.id as actor_id, a.nombre as actor_nombre,
       coalesce(a.nombre, f.autor_texto) as autoria,
       f.atribucion_verificada, f.metodo_verificacion
from banco.propuesta p
join banco.fuente f on f.ref = p.fuente_ref
left join banco.actor a on a.id = f.actor_id
where p.estado = 'publicada';

create view public.banco_categorias with (security_invoker = true) as
select c.clave, c.nombre, c.fase, c.descripcion, c.declarada, c.orden,
       (select count(*) from banco.propuesta_categoria pc
          join banco.propuesta p on p.id = pc.propuesta_id and p.estado = 'publicada'
        where pc.categoria_clave = c.clave) as propuestas
from banco.categoria c;

create view public.banco_actores with (security_invoker = true) as
select a.id, a.nombre, a.tipo, a.web, a.verificado,
       (select count(*) from banco.fuente f where f.actor_id = a.id) as documentos,
       (select count(*) from banco.propuesta p join banco.fuente f on f.ref = p.fuente_ref
        where f.actor_id = a.id and p.estado = 'publicada') as propuestas
from banco.actor a;

create view public.banco_fuentes with (security_invoker = true) as
select f.ref, f.id_catalogo, f.tipo, f.documento, f.url, f.actor_id, a.nombre as actor_nombre,
       f.autor_texto, f.atribucion_verificada, f.metodo_verificacion, f.nota_verificacion, f.verificada_en,
       f.duplicado_de, f.enlace_estado,
       (select count(*) from banco.propuesta p where p.fuente_ref = f.ref and p.estado = 'publicada') as propuestas
from banco.fuente f left join banco.actor a on a.id = f.actor_id;

create view public.banco_temas with (security_invoker = true) as
select t.slug, t.nombre, t.descripcion,
       array(select tp.propuesta_id from banco.tema_propuesta tp
             join banco.propuesta p on p.id = tp.propuesta_id and p.estado = 'publicada'
             where tp.tema_slug = t.slug order by tp.propuesta_id) as propuestas,
       array(select distinct coalesce(a.nombre, f.autor_texto, f.documento)
             from banco.tema_propuesta tp
             join banco.propuesta p on p.id = tp.propuesta_id and p.estado = 'publicada'
             join banco.fuente f on f.ref = p.fuente_ref
             left join banco.actor a on a.id = f.actor_id
             where tp.tema_slug = t.slug) as autorias
from banco.tema t;

create view public.banco_no_propuestas with (security_invoker = true) as
select n.id, n.cita, n.localizacion, n.fuente_ref, n.tipo, n.motivo from banco.no_propuesta n;

create view public.banco_historial with (security_invoker = true) as
select v.propuesta_id, v.version, v.anterior, v.motivo, v.cambiado_en from banco.propuesta_version v;

grant select on public.banco_propuestas, public.banco_categorias, public.banco_actores,
                public.banco_fuentes, public.banco_temas, public.banco_no_propuestas,
                public.banco_historial
  to anon, authenticated;

-- Búsqueda: texto libre (sintaxis tipo buscador web) + filtro opcional por categoría.
create function public.banco_buscar(q text default '', p_categoria text default null, p_limite int default 50)
returns setof public.banco_propuestas
language sql stable security invoker set search_path = '' as $$
  select v.*
  from public.banco_propuestas v
  join banco.propuesta p on p.id = v.id
  where (p_categoria is null or p_categoria = any (v.categorias))
    and (coalesce(btrim(q), '') = '' or p.busqueda @@ websearch_to_tsquery('banco.es'::regconfig, q))
  order by case when coalesce(btrim(q), '') = '' then 0
                else ts_rank(p.busqueda, websearch_to_tsquery('banco.es'::regconfig, q)) end desc,
           v.id
  limit least(greatest(coalesce(p_limite, 50), 1), 200);
$$;
grant execute on function public.banco_buscar(text, text, int) to anon, authenticated;

-- Supabase concede por defecto todos los privilegios sobre objetos nuevos de "public".
-- Las vistas del banco son de solo lectura para el público.
revoke insert, update, delete, truncate on public.banco_propuestas, public.banco_categorias, public.banco_actores,
       public.banco_fuentes, public.banco_temas, public.banco_no_propuestas, public.banco_historial
  from anon, authenticated;
