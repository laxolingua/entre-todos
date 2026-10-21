-- Derechos y garantías fundamentales: se documentan, no se votan (Método, sección 4).
alter table banco.consolidada add column votable boolean not null default true;
update banco.consolidada set votable = false where id in (
  'presos-politicos','despenalizacion-disenso','legalizacion-organizaciones','pluripartidismo','elecciones-libres',
  'libertad-expresion','libertad-reunion-asociacion','libertad-religiosa','libre-movilidad','acceso-informacion-internet',
  'inviolabilidad-intimidad','igualdad-y-no-discriminacion','debido-proceso','amparo-y-garantias','carta-de-derechos',
  'pactos-ddhh','dignidad-humana','independencia-judicial','diaspora-derechos-plenos','libertad-sindical');
-- banco_valorar rechaza estas propuestas (ver versión aplicada en producción el 21 oct 2026).
