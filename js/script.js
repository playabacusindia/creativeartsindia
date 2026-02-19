// Header hide on scroll
let lastScrollTop = 0;
const header = document.getElementById('mainHeader');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 40) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }

  lastScrollTop = scrollTop;
});

// Dropdown hover on desktop only
function setupDropdownHover() {
  const isDesktop = window.innerWidth >= 992;
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    dropdown.removeEventListener('mouseenter', dropdown._in);
    dropdown.removeEventListener('mouseleave', dropdown._out);

    if (isDesktop) {
      dropdown._in = () => {
        dropdown.classList.add('show');
        toggle.setAttribute('aria-expanded', 'true');
        menu.classList.add('show');
      };
      dropdown._out = () => {
        dropdown.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
        menu.classList.remove('show');
      };
      dropdown.addEventListener('mouseenter', dropdown._in);
      dropdown.addEventListener('mouseleave', dropdown._out);
    }
  });
}

window.addEventListener('load', setupDropdownHover);
window.addEventListener('resize', setupDropdownHover);

// animate
AOS.init();