/*
  PTA RZESZÓW — JEDNA WSPÓLNA SEKCJA NA DOLE KAŻDEJ STRONY
  ==========================================================
  Edytuj wyłącznie ten plik: sponsorzy.js

  W archiwalnym programie OSA 2022 wymieniono poniższe firmy jako WYSTAWCÓW,
  NIE jako potwierdzonych sponsorów oddziału. Dlatego taki jest nagłówek sekcji.

  Jak dodać własnych sponsorów:
    1. Zmień TYTUL i OPIS_SEKCJI.
    2. Wpisz nazwy do listy ORGANIZACJE.
    3. Opcjonalnie podaj link (adres WWW) i logo (np. "logo/nazwa.png").
    4. Każda podstrona zaktualizuje się automatycznie.

  Jeśli nie masz logo, wyświetli się estetyczna nazwa tekstowa.
  Żadnego fetch() — działa również bezpośrednio z dysku.
*/
(() => {
  const slot = document.getElementById('shared-sponsors');
  if (!slot) return;

  // ===== EDYTUJ TYLKO PONIŻSZE DANE =====
  const TYTUL = 'Wystawcy OSA 2022';
  const OPIS_SEKCJI = 'Firmy wymienione w archiwalnym programie wystawy podczas OSA 2022.';
  const ORGANIZACJE = [
    { nazwa: 'WIBROIZOLACJA', logo: '', link: '' },
    { nazwa: 'OWO Polska', logo: '', link: '' },
    { nazwa: 'Amorim Cork Composites', logo: '', link: '' },
    { nazwa: 'SVANTEK', logo: '', link: '' },
    { nazwa: 'World Acoustic Group', logo: '', link: '' }
  ];
  // ===== KONIEC DANYCH DO EDYCJI =====

  // Tworzenie zawartości przy użyciu DOM (bez wstrzykiwania danych w HTML).
  const section = document.createElement('section');
  section.className = 'sponsors-section';
  section.setAttribute('aria-label', TYTUL);

  const wrap = document.createElement('div');
  wrap.className = 'container sponsors-inner';
  const header = document.createElement('div');
  header.className = 'sponsors-header';
  const heading = document.createElement('h2');
  heading.className = 'sponsors-title';
  heading.textContent = TYTUL;
  const caption = document.createElement('p');
  caption.className = 'sponsors-description';
  caption.textContent = OPIS_SEKCJI;
  header.append(heading, caption);

  const grid = document.createElement('div');
  grid.className = 'sponsors-grid';
  for (const item of ORGANIZACJE) {
    if (!item.nazwa) continue;
    const card = document.createElement(item.link ? 'a' : 'div');
    card.className = 'sponsor-card';
    if (item.link) {
      card.href = item.link;
      // Przy zewnętrznym linku bezpiecznie otwieramy nową kartę.
      if (/^https?:\/\//i.test(item.link)) {
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
      }
    }
    if (item.logo) {
      const img = document.createElement('img');
      img.src = item.logo;
      img.alt = item.nazwa;
      img.loading = 'lazy';
      card.append(img);
    } else {
      const name = document.createElement('span');
      name.className = 'sponsor-text-logo';
      name.textContent = item.nazwa;
      card.append(name);
    }
    grid.append(card);
  }
  wrap.append(header, grid);
  section.append(wrap);
  slot.replaceWith(section);
})();
