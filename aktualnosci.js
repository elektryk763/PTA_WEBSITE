// Aktualności są przechowywane wyłącznie w pliku aktualnosci.json.
// Dodawaj, usuwaj i zmieniaj wpisy właśnie tam.
(async function () {
  const lista = document.getElementById('news-list');
  if (!lista) return;

  try {
    const odpowiedz = await fetch('./PLIKI/AKTUALNOSCI/aktualnosci.json', { cache: 'no-store' });
    if (!odpowiedz.ok) throw new Error('Nie można pobrać aktualności');
    const wpisy = await odpowiedz.json();
    if (!Array.isArray(wpisy)) throw new Error('Niepoprawny format JSON');

    lista.replaceChildren();

    if (wpisy.length === 0) {
      const komunikat = document.createElement('p');
      komunikat.className = 'section-lead';
      komunikat.textContent = 'Na razie brak aktualności.';
      lista.append(komunikat);
      return;
    }

    for (const wpis of wpisy) {
      if (!wpis || !wpis.tytul || !wpis.tresc) continue;

      const artykul = document.createElement('article');
      artykul.className = 'news-entry';

      if (wpis.data) {
        const data = document.createElement('time');
        data.className = 'news-entry-date';
        data.dateTime = wpis.data;
        data.textContent = wpis.data;
        artykul.append(data);
      }

      const tytul = document.createElement('h3');
      tytul.className = 'news-entry-title';
      tytul.textContent = wpis.tytul;
      artykul.append(tytul);

      const tresc = document.createElement('p');
      tresc.className = 'news-entry-text';
      tresc.textContent = wpis.tresc;
      artykul.append(tresc);

      // Link jest opcjonalny. Podawaj lokalny plik HTML lub adres https://.
      if (typeof wpis.link === 'string' && /^(?:[\w-]+\.html(?:#[\w-]+)?|https:\/\/[^\s]+)$/.test(wpis.link)) {
        const link = document.createElement('a');
        link.className = 'text-link';
        link.href = wpis.link;
        link.textContent = 'Czytaj więcej ↗';
        artykul.append(link);
      }

      lista.append(artykul);
    }

    if (lista.childElementCount === 0) {
      lista.textContent = 'Na razie brak aktualności.';
    }
  } catch (blad) {
    console.error('Aktualności:', blad);
    lista.textContent = 'Nie udało się wczytać aktualności.';
  }
})();
