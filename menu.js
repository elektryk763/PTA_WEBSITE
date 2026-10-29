/*
  PTA ODDZIAŁ RZESZÓW — JEDNO WSPÓLNE MENU
  Edytuj linki i nazwy wyłącznie w tym pliku.
  Podstrony automatycznie wczytują ten kod bez fetch(), PHP i serwera.
*/
(() => {
  const slot = document.getElementById('shared-menu');
  if (!slot) return;

  // ===== MENU: zmieniaj nazwy i adresy TUTAJ =====
  const menuHtml = `
<header class="site-header">
  <div class="container header-inner">
    <a aria-label="PTA Rzeszów – strona główna" class="brand" href="index.html">
      <span aria-hidden="true" class="brand-mark"><span></span><span></span><span></span></span>
      <span class="brand-name"><strong>PTA<span class="brand-period">.</span></strong><span>POLSKIE TOWARZYSTWO AKUSTYCZNE <em>ODDZIAŁ RZESZÓW</em></span></span>
    </a>
    <input aria-label="Rozwiń lub zwiń menu" class="nav-toggle" id="nav-toggle" type="checkbox">
    <label class="nav-toggle-label" for="nav-toggle"><span>Menu</span><span aria-hidden="true" class="hamburger"><i></i><i></i><i></i></span></label>
    <nav aria-label="Menu główne" class="site-nav">
      <div class="nav-item">
        <a class="nav-link" href="index.html">PTA <span aria-hidden="true" class="chevron"></span></a>
        <input aria-label="Rozwiń podmenu PTA" class="submenu-toggle" id="submenu-pta" type="checkbox">
        <label class="submenu-label" for="submenu-pta" title="Rozwiń podmenu PTA"><span aria-hidden="true" class="chevron"></span></label>
        <div class="nav-dropdown">
          <a href="https://acoustics.org.pl/pta/statut/">Statut PTA</a>
          <a href="zapisy-do-pta.html">Zapisy do PTA O/Rzeszów</a>
          <a href="zarzad.html">Zarząd</a>
        </div>
      </div>
      <a class="nav-link nav-link-plain" href="oplaty.html">Opłaty</a>
      <div class="nav-item">
        <a class="nav-link" href="osa-archiwum.html">OSA – archiwum <span aria-hidden="true" class="chevron"></span></a>
        <input aria-label="Rozwiń podmenu archiwum OSA" class="submenu-toggle" id="submenu-osa-archiwum" type="checkbox">
        <label class="submenu-label" for="submenu-osa-archiwum" title="Rozwiń podmenu archiwum OSA"><span aria-hidden="true" class="chevron"></span></label>
        <div class="nav-dropdown">
          <a href="osa-2007.html">OSA 2007</a>
          <a href="osa-2013.html">OSA 2013</a>
          <a href="osa-2022.html">OSA 2022</a>
        </div>
      </div>
      <a class="nav-link nav-link-plain" href="kontakt.html">Kontakt</a>
      <a class="nav-link nav-link-plain" href="https://www.ur.edu.pl/" target="_blank" rel="noopener noreferrer">Uniwersytet Rzeszowski <span class="external-arrow" aria-hidden="true">↗</span></a>
    </nav>
  </div>
</header>`;
  // ===== KONIEC MENU =====

  slot.outerHTML = menuHtml;

  // Aktywna podstrona i jej główna zakładka.
  // Podstrony związane z OSA 2022 należą do sekcji „OSA – archiwum”.
  const osa2022Files = new Set(['osa-2022.html', 'postepy-akustyki-2022.html']);
  const filename = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  const links = [...document.querySelectorAll('.site-nav a[href]')];
  const matched = links.filter(link => link.getAttribute('href') === filename);
  if (matched.length) {
    const active = matched.find(link => link.closest('.nav-dropdown')) || matched[0];
    active.setAttribute('aria-current', 'page');
    const group = active.closest('.nav-item');
    if (group) group.classList.add('is-active');
  } else if (osa2022Files.has(filename)) {
    document.querySelector('a[href="osa-archiwum.html"]')?.closest('.nav-item')?.classList.add('is-active');
  }
})();
