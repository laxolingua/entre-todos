const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      navigation.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const demo = document.querySelector('[data-vote-demo]');
if (demo) {
  const consent = demo.querySelector('[data-demo-consent]');
  const choices = [...demo.querySelectorAll('[data-demo-choice]')];
  const questionStep = demo.querySelector('[data-step="question"]');
  const receiptStep = demo.querySelector('[data-step="receipt"]');
  const result = demo.querySelector('[data-demo-result]');
  const reset = demo.querySelector('[data-demo-reset]');

  consent.addEventListener('change', () => {
    choices.forEach((button) => { button.disabled = !consent.checked; });
  });

  choices.forEach((button) => {
    button.addEventListener('click', () => {
      result.textContent = button.dataset.demoChoice;
      questionStep.classList.remove('active');
      receiptStep.classList.add('active');
      reset.focus();
    });
  });

  reset.addEventListener('click', () => {
    consent.checked = false;
    choices.forEach((button) => { button.disabled = true; });
    receiptStep.classList.remove('active');
    questionStep.classList.add('active');
    consent.focus();
  });
}
