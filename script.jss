// ============ MOBILE NAV ============
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ============ TERMINAL TYPING EFFECT ============
// EDIT: change this line to describe yourself differently if you like
const typedEl = document.getElementById('typedText');
const phrases = [
  'Frontend Developer',
  'React & JavaScript',
  'Building clean UIs'
];
let phraseIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

// ============ SCROLL REVEAL ============
const revealTargets = document.querySelectorAll(
  '.about-text, .about-stats, .skills-grid, .project-card, .contact-form, .social-links'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ============ NAVBAR SHADOW ON SCROLL ============
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20 ? '0 8px 24px rgba(0,0,0,0.35)' : 'none';
});

// ============ CONTACT FORM VALIDATION ============
const form = document.getElementById('contactForm');
const fields = {
  name: { el: document.getElementById('name'), error: document.getElementById('nameError') },
  email: { el: document.getElementById('email'), error: document.getElementById('emailError') },
  message: { el: document.getElementById('message'), error: document.getElementById('messageError') },
};
const formSuccess = document.getElementById('formSuccess');

function setFieldError(key, msg) {
  const { el, error } = fields[key];
  error.textContent = msg;
  el.closest('.form-row').classList.toggle('invalid', Boolean(msg));
}

function validateName() {
  const v = fields.name.el.value.trim();
  if (!v) return setFieldError('name', 'Please enter your name.'), false;
  setFieldError('name', '');
  return true;
}

function validateEmail() {
  const v = fields.email.el.value.trim();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!v) return setFieldError('email', 'Please enter your email.'), false;
  if (!re.test(v)) return setFieldError('email', 'Enter a valid email address.'), false;
  setFieldError('email', '');
  return true;
}

function validateMessage() {
  const v = fields.message.el.value.trim();
  if (!v) return setFieldError('message', 'Please write a short message.'), false;
  if (v.length < 10) return setFieldError('message', 'A little more detail would help.'), false;
  setFieldError('message', '');
  return true;
}

fields.name.el.addEventListener('blur', validateName);
fields.email.el.addEventListener('blur', validateEmail);
fields.message.el.addEventListener('blur', validateMessage);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const validName = validateName();
  const validEmail = validateEmail();
  const validMessage = validateMessage();

  if (validName && validEmail && validMessage) {
    // EDIT: hook this up to a real email service (Formspree, EmailJS, etc.) to actually receive messages
    formSuccess.textContent = "Thanks — your message is in. I'll get back to you soon.";
    form.reset();
    setTimeout(() => { formSuccess.textContent = ''; }, 6000);
  } else {
    formSuccess.textContent = '';
    const firstInvalid = form.querySelector('.form-row.invalid input, .form-row.invalid textarea');
    if (firstInvalid) firstInvalid.focus();
  }
});
