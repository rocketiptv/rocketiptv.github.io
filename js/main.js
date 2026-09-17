/* =========================================================
   RocketTV — main.js
   Navigacija, modal za porudžbinu, paketi, FAQ, kanali,
   brojači, marquee i reveal animacije.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- Kontakt ---------------- */
  var CONTACT = {
    waNumber: '381601234567',
    waDisplay: '+online',
    telegram: 'rockettv_rs',
    email: 'podrska@rockettv.rs'
  };

  /* ---------------- Paketi ---------------- */
  var PLANS = [
    { id: '1m',  name: '1 mesec',   months: 1,  price: 10, perMonth: '10.00', save: 0 },
    { id: '3m',  name: '3 meseca',  months: 3,  price: 25, perMonth: '8.33',  save: 17, badge: 'Najtraženiji', style: 'featured' },
    { id: '6m',  name: '6 meseci',  months: 6,  price: 40, perMonth: '6.67',  save: 33 },
    { id: '12m', name: '12 meseci', months: 12, price: 60, perMonth: '5.00',  save: 50, badge: 'Najpovoljniji', style: 'best' }
  ];

  var INCLUDED = [
    '28.000+ live kanala',
    '120.000+ filmova i serija',
    '4K / FHD / HD kvalitet',
    'EPG TV vodič',
    'Catch-up do 7 dana',
    'Anti-freeze serveri',
    '1 uređaj po pretplati',
    'Aktivacija u 5 minuta',
    '24/7 podrška'
  ];

  /* ---------------- FAQ ---------------- */
  var FAQ = [
    {
      q: 'Šta mi treba da bih gledao RocketTV?',
      a: 'Internet od bar 15 Mb/s (za 4K preporučujemo 30+) i bilo koji uređaj: Smart TV, telefon, Fire Stick, Android box, MAG ili računar. Nema satelitske antene, nema dodatne opreme, nema tehničara.'
    },
    {
      q: 'Da li mogu da probam pre nego što platim?',
      a: 'Da. Zatraži 24h trial preko WhatsApp-a ili Telegrama — pošaljemo ti podatke i sam proveriš kvalitet slike na svojoj mreži. Jedan trial po domaćinstvu.'
    },
    {
      q: 'Koliko uređaja mogu da koristim?',
      a: 'Svaki paket dolazi sa jednom vezom — jedan uređaj u datom trenutku. Aplikaciju možeš instalirati na više uređaja, ali gledaš na jednom. Za istovremeno gledanje na dva ili tri ekrana dodaješ dodatnu vezu po povoljnoj ceni.'
    },
    {
      q: 'Kako se plaća?',
      a: 'Kartica, PayPal, kripto (USDT / BTC) ili uplatnica u dinarima. Nema automatske obnove — sam biraš kad i da li produžavaš.'
    },
    {
      q: 'Da li ima seckanja tokom velikih utakmica?',
      a: 'Za to služe anti-freeze serveri sa load-balancingom. Kanali za derbi i Ligu šampiona idu preko više servera istovremeno, pa jedan preopterećen ne ruši sliku. Za 4K preporučujemo Ethernet ili 5 GHz Wi-Fi.'
    },
    {
      q: 'Ima li ugovora ili otkaznog roka?',
      a: 'Ne. Plaćaš period koji izabereš i to je to. Po isteku nalog prestaje da radi dok ga ne produžiš — bez skrivenih troškova i bez poziva iz call centra.'
    },
    {
      q: 'Da li imate EPG i catch-up?',
      a: 'Da. Pun TV vodič za sve regionalne i glavne strane kanale, plus vraćanje emisija do 7 dana unazad na većini kanala.'
    },
    {
      q: 'Šta ako mi nešto ne radi?',
      a: 'Piši na WhatsApp ili Telegram. Podrška radi 24/7, na srpskom, i najčešće rešava problem za par minuta — obično je u pitanju podešavanje aplikacije ili Wi-Fi.'
    }
  ];

  /* ---------------- Uređaji (za formu) ---------------- */
  var DEVICES = [
    'Smart TV (Samsung / LG)', 'Android TV / Google TV', 'Android box', 'Amazon Fire Stick',
    'Android telefon / tablet', 'iPhone / iPad', 'MAG / Formuler', 'Enigma2 (Vu+, Dreambox)',
    'Windows / macOS', 'Drugo'
  ];

  /* ---------------- Kanali ---------------- */
  var CATEGORIES = ['Sve', 'Sport', 'Filmovi', 'Serije', 'Deca', 'Vesti', 'Dokumentarci', 'Muzika', 'Regionalni'];

  var CHANNELS = [
    // Sport
    ['Arena Sport 1', 'Sport', '4K', 'Srbija'], ['Arena Sport 2', 'Sport', 'FHD', 'Srbija'], ['Arena Sport 3', 'Sport', 'FHD', 'Srbija'],
    ['Arena Premium 1', 'Sport', '4K', 'Srbija'], ['Arena Premium 2', 'Sport', 'FHD', 'Srbija'], ['Sport Klub 1', 'Sport', '4K', 'Srbija'],
    ['Sport Klub 2', 'Sport', 'FHD', 'Srbija'], ['Sport Klub 3', 'Sport', 'FHD', 'Srbija'], ['Sport Klub Golf', 'Sport', 'HD', 'Srbija'],
    ['Eurosport 1', 'Sport', 'FHD', 'Evropa'], ['Eurosport 2', 'Sport', 'FHD', 'Evropa'], ['Sky Sports Main Event', 'Sport', '4K', 'UK'],
    ['Sky Sports Premier League', 'Sport', 'FHD', 'UK'], ['Sky Sports F1', 'Sport', 'FHD', 'UK'], ['TNT Sports 1', 'Sport', '4K', 'UK'],
    ['beIN Sports 1', 'Sport', '4K', 'Francuska'], ['DAZN 1', 'Sport', 'FHD', 'Nemačka'], ['ESPN', 'Sport', 'FHD', 'SAD'],
    ['NBA TV', 'Sport', 'FHD', 'SAD'], ['UFC Fight Pass', 'Sport', 'FHD', 'SAD'], ['Max Sport 1', 'Sport', 'FHD', 'Hrvatska'],
    // Filmovi
    ['HBO', 'Filmovi', '4K', 'Region'], ['HBO 2', 'Filmovi', 'FHD', 'Region'], ['HBO 3', 'Filmovi', 'FHD', 'Region'],
    ['Cinemax', 'Filmovi', 'FHD', 'Region'], ['Cinemax 2', 'Filmovi', 'HD', 'Region'], ['FilmBox Premium', 'Filmovi', 'FHD', 'Region'],
    ['FilmBox Extra', 'Filmovi', 'HD', 'Region'], ['Cinestar TV Premiere 1', 'Filmovi', 'FHD', 'Hrvatska'], ['Cinestar TV Action', 'Filmovi', 'HD', 'Hrvatska'],
    ['Sky Cinema Premiere', 'Filmovi', '4K', 'UK'], ['AMC', 'Filmovi', 'FHD', 'Region'], ['Kino TV', 'Filmovi', 'HD', 'Srbija'], ['Klasik TV', 'Filmovi', 'HD', 'Hrvatska'],
    // Serije
    ['Fox', 'Serije', 'FHD', 'Region'], ['Fox Life', 'Serije', 'HD', 'Region'], ['Fox Crime', 'Serije', 'HD', 'Region'],
    ['AXN', 'Serije', 'FHD', 'Region'], ['Superstar TV', 'Serije', 'FHD', 'Srbija'], ['Nova S', 'Serije', 'FHD', 'Srbija'],
    ['Prva', 'Serije', 'FHD', 'Srbija'], ['Pink Series', 'Serije', 'HD', 'Srbija'], ['Epic Drama', 'Serije', 'HD', 'Region'],
    ['Sky Atlantic', 'Serije', '4K', 'UK'], ['Comedy Central', 'Serije', 'HD', 'Region'],
    // Deca
    ['Cartoon Network', 'Deca', 'HD', 'Region'], ['Nickelodeon', 'Deca', 'HD', 'Region'], ['Nick Jr.', 'Deca', 'HD', 'Region'],
    ['Disney Channel', 'Deca', 'FHD', 'Region'], ['Disney Junior', 'Deca', 'HD', 'Region'], ['Boomerang', 'Deca', 'HD', 'Region'],
    ['Minimax', 'Deca', 'HD', 'Region'], ['Pikaboo', 'Deca', 'HD', 'Srbija'], ['Baby TV', 'Deca', 'HD', 'Region'],
    ['Da Vinci Kids', 'Deca', 'HD', 'Region'], ['JimJam', 'Deca', 'HD', 'Region'],
    // Vesti
    ['N1', 'Vesti', 'FHD', 'Srbija'], ['RTS 1', 'Vesti', 'FHD', 'Srbija'], ['RTS 2', 'Vesti', 'HD', 'Srbija'],
    ['Euronews Serbia', 'Vesti', 'HD', 'Srbija'], ['Insajder TV', 'Vesti', 'HD', 'Srbija'], ['CNN International', 'Vesti', 'FHD', 'SAD'],
    ['BBC News', 'Vesti', 'FHD', 'UK'], ['Sky News', 'Vesti', 'FHD', 'UK'], ['Al Jazeera Balkans', 'Vesti', 'HD', 'Region'],
    ['Al Jazeera English', 'Vesti', 'FHD', 'Katar'], ['Bloomberg', 'Vesti', 'FHD', 'SAD'], ['HRT 1', 'Vesti', 'FHD', 'Hrvatska'],
    ['FTV', 'Vesti', 'HD', 'BiH'], ['RTCG 1', 'Vesti', 'HD', 'Crna Gora'],
    // Dokumentarci
    ['National Geographic', 'Dokumentarci', '4K', 'Region'], ['Nat Geo Wild', 'Dokumentarci', 'FHD', 'Region'], ['Discovery Channel', 'Dokumentarci', 'FHD', 'Region'],
    ['Discovery Science', 'Dokumentarci', 'HD', 'Region'], ['History', 'Dokumentarci', 'FHD', 'Region'], ['History 2', 'Dokumentarci', 'HD', 'Region'],
    ['Animal Planet', 'Dokumentarci', 'FHD', 'Region'], ['Viasat Explore', 'Dokumentarci', 'HD', 'Region'], ['Viasat History', 'Dokumentarci', 'HD', 'Region'],
    ['Viasat Nature', 'Dokumentarci', 'HD', 'Region'], ['Travel Channel', 'Dokumentarci', 'HD', 'Region'], ['Love Nature', 'Dokumentarci', '4K', 'Kanada'],
    ['CuriosityStream', 'Dokumentarci', '4K', 'SAD'],
    // Muzika
    ['MTV', 'Muzika', 'HD', 'Region'], ['MTV Hits', 'Muzika', 'HD', 'Region'], ['VH1', 'Muzika', 'HD', 'Region'],
    ['Grand TV', 'Muzika', 'HD', 'Srbija'], ['DM Sat', 'Muzika', 'HD', 'Srbija'], ['Balkanika', 'Muzika', 'HD', 'Region'],
    ['Mezzo', 'Muzika', 'FHD', 'Francuska'], ['Clubbing TV', 'Muzika', 'FHD', 'Evropa'],
    // Regionalni
    ['Pink', 'Regionalni', 'FHD', 'Srbija'], ['Happy TV', 'Regionalni', 'HD', 'Srbija'], ['Kurir TV', 'Regionalni', 'HD', 'Srbija'],
    ['K1', 'Regionalni', 'HD', 'Srbija'], ['RTV Vojvodina 1', 'Regionalni', 'HD', 'Srbija'], ['Nova TV', 'Regionalni', 'FHD', 'Hrvatska'],
    ['RTL', 'Regionalni', 'FHD', 'Hrvatska'], ['OBN', 'Regionalni', 'HD', 'BiH'], ['Hayat', 'Regionalni', 'HD', 'BiH'],
    ['Pink M', 'Regionalni', 'HD', 'Crna Gora'], ['Prva CG', 'Regionalni', 'HD', 'Crna Gora'], ['Sitel', 'Regionalni', 'HD', 'S. Makedonija'],
    ['TV Slovenija 1', 'Regionalni', 'HD', 'Slovenija']
  ].map(function (c) { return { name: c[0], category: c[1], quality: c[2], region: c[3] }; });

  /* ---------------- SVG sprite ---------------- */
  var ICONS =
    '<svg xmlns="http://www.w3.org/2000/svg" style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true" focusable="false">' +
    '<symbol id="i-rocket" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></symbol>' +
    '<symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></symbol>' +
    '<symbol id="i-chevron" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>' +
    '<symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></symbol>' +
    '<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>' +
    '<symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></symbol>' +
    '<symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></symbol>' +
    '<symbol id="i-mail" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></symbol>' +
    '<symbol id="i-star" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></symbol>' +
    '<symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></symbol>' +
    '<symbol id="i-telegram" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></symbol>' +
    '<symbol id="i-tv" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="m17 2-5 5-5-5"/></symbol>' +
    '<symbol id="i-zap" viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></symbol>' +
    '<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></symbol>' +
    '<symbol id="i-trophy" viewBox="0 0 24 24"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/></symbol>' +
    '<symbol id="i-film" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 7.5h4M3 12h18M3 16.5h4M17 7.5h4M17 16.5h4"/></symbol>' +
    '<symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></symbol>' +
    '<symbol id="i-gauge" viewBox="0 0 24 24"><path d="m12 14 4-4M3.34 19a10 10 0 1 1 17.32 0"/></symbol>' +
    '<symbol id="i-headphones" viewBox="0 0 24 24"><path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/></symbol>' +
    '<symbol id="i-cast" viewBox="0 0 24 24"><path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 20h.01"/></symbol>' +
    '<symbol id="i-phone" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></symbol>' +
    '<symbol id="i-tablet" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/></symbol>' +
    '<symbol id="i-box" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></symbol>' +
    '<symbol id="i-laptop" viewBox="0 0 24 24"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></symbol>' +
    '<symbol id="i-monitor" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></symbol>' +
    '<symbol id="i-dish" viewBox="0 0 24 24"><path d="M4 10a7.31 7.31 0 0 0 10 10Z"/><path d="m9 15 3-3M17 13a6 6 0 0 0-6-6M21 13A10 10 0 0 0 11 3"/></symbol>' +
    '<symbol id="i-gamepad" viewBox="0 0 24 24"><path d="M6 12h4M8 10v4M15 13h.01M18 11h.01"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></symbol>' +
    '<symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></symbol>' +
    '<symbol id="i-play" viewBox="0 0 24 24"><path d="m6 3 14 9-14 9V3z"/></symbol>' +
    '</svg>';

  /* ---------------- Helpers ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
    });
  }
  function findPlan(id) {
    for (var i = 0; i < PLANS.length; i++) if (PLANS[i].id === id) return PLANS[i];
    return PLANS[1];
  }

  var toastTimer;
  function toast(msg) {
    var el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 3200);
  }

  /* ---------------- Sprite ---------------- */
  function injectSprite() {
    var wrap = document.createElement('div');
    wrap.innerHTML = ICONS;
    document.body.insertBefore(wrap.firstChild, document.body.firstChild);
  }

  /* ---------------- Navigacija ---------------- */
  function initNav() {
    var nav = $('#nav');
    var burger = $('#navBurger');
    var menu = $('#mobileMenu');
    if (!nav) return;

    function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 12); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var page = (location.pathname.split('/').pop() || 'index.html').replace('.html', '') || 'index';
    $all('[data-nav]').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-nav') === page);
    });

    if (burger && menu) {
      burger.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        nav.classList.toggle('menu-open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        $('.i-menu', burger).hidden = open;
        $('.i-close', burger).hidden = !open;
        document.body.classList.toggle('no-scroll', open);
      });
      $all('a', menu).forEach(function (a) {
        a.addEventListener('click', function () { closeMenu(); });
      });
    }

    function closeMenu() {
      if (!menu || !menu.classList.contains('open')) return;
      menu.classList.remove('open');
      nav.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      $('.i-menu', burger).hidden = false;
      $('.i-close', burger).hidden = true;
      document.body.classList.remove('no-scroll');
    }
    window.__closeMenu = closeMenu;
  }

  /* ---------------- Kontakt linkovi ---------------- */
  function fillContacts() {
    $all('[data-wa-link]').forEach(function (a) { a.href = 'https://wa.me/' + CONTACT.waNumber; });
    $all('[data-tg-link]').forEach(function (a) { a.href = 'https://t.me/' + CONTACT.telegram; });
    $all('[data-mail-link]').forEach(function (a) { a.href = 'mailto:' + CONTACT.email; });
    $all('[data-wa-display]').forEach(function (el) { el.textContent = CONTACT.waDisplay; });
    $all('[data-tg-display]').forEach(function (el) { el.textContent = '@' + CONTACT.telegram; });
    $all('[data-mail-display]').forEach(function (el) { el.textContent = CONTACT.email; });
    $all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------------- Paketi ---------------- */
  function renderPricing() {
    $all('[data-pricing]').forEach(function (root) {
      var cards = PLANS.map(function (p) {
        var btnClass = p.style === 'featured' ? 'btn-primary' : (p.style === 'best' ? 'btn-flame' : 'btn-ghost');
        return (
          '<article class="plan' + (p.style ? ' ' + p.style : '') + ' reveal">' +
            (p.badge ? '<span class="plan-badge' + (p.style === 'best' ? ' gold' : '') + '">' + esc(p.badge) + '</span>' : '') +
            '<p class="plan-name">' + esc(p.name) + '</p>' +
            '<p class="plan-price">' + p.price + '€</p>' +
            '<p class="plan-per">' + p.perMonth + '€ / mesec' + (p.save ? ' · <span>ušteda ' + p.save + '%</span>' : '') + '</p>' +
            '<div class="plan-cta"></div>' +
            '<button type="button" class="btn ' + btnClass + ' btn-block" data-order data-plan="' + p.id + '">Poruči ' + esc(p.name) + '</button>' +
          '</article>'
        );
      }).join('');

      var list = INCLUDED.map(function (i) {
        return '<li><svg class="icon"><use href="#i-check"></use></svg>' + esc(i) + '</li>';
      }).join('');

      root.innerHTML =
        '<div class="plans">' + cards + '</div>' +
        '<div class="included reveal">' +
          '<div><h3>Svaki paket uključuje</h3><p>Isti sadržaj, isti kvalitet — razlika je samo u trajanju.</p></div>' +
          '<ul>' + list + '</ul>' +
        '</div>' +
        '<p class="pricing-note">Treba ti gledanje na više ekrana istovremeno? Dodatna veza se dogovara u poruci uz porudžbinu.</p>';
    });
  }

  /* ---------------- FAQ ---------------- */
  function renderFAQ() {
    $all('[data-faq]').forEach(function (root) {
      root.innerHTML = FAQ.map(function (item, i) {
        return (
          '<div class="faq-item' + (i === 0 ? ' open' : '') + '">' +
            '<button type="button" class="faq-q" aria-expanded="' + (i === 0 ? 'true' : 'false') + '">' +
              '<span>' + esc(item.q) + '</span>' +
              '<svg class="icon"><use href="#i-chevron"></use></svg>' +
            '</button>' +
            '<div class="faq-a"><div><p>' + esc(item.a) + '</p></div></div>' +
          '</div>'
        );
      }).join('');
    });

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.faq-q');
      if (!btn) return;
      var item = btn.parentElement;
      var list = item.parentElement;
      var isOpen = item.classList.contains('open');
      $all('.faq-item', list).forEach(function (el) {
        el.classList.remove('open');
        $('.faq-q', el).setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  /* ---------------- Brojači ---------------- */
  function initCounters() {
    var els = $all('[data-count]');
    if (!els.length) return;

    function fmt(v, decimals, prefix, suffix) {
      var s;
      if (decimals > 0) s = v.toFixed(decimals);
      else s = Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return prefix + s + suffix;
    }
    function animate(el) {
      var target = parseFloat(el.getAttribute('data-target')) || 0;
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1600;
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * e, decimals, prefix, suffix);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    if (!('IntersectionObserver' in window)) { els.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Marquee ---------------- */
  function initMarquee() {
    $all('.marquee-track').forEach(function (track) {
      track.innerHTML = track.innerHTML + track.innerHTML;
    });
  }

  /* ---------------- Reveal ---------------- */
  function initReveal() {
    var els = $all('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Modal za porudžbinu ---------------- */
  var modal, state = { plan: '3m', trial: false };

  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'orderModal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML =
      '<div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle">' +
        '<button class="modal-close" type="button" data-close aria-label="Zatvori"><svg class="icon"><use href="#i-x"></use></svg></button>' +
        '<form id="orderForm" novalidate>' +
          '<p class="eyebrow" id="modalEyebrow">Porudžbina</p>' +
          '<h3 id="modalTitle">Poruči paket</h3>' +
          '<p class="modal-lead" id="modalLead"></p>' +
          '<div class="plan-picker" id="planPicker"></div>' +
          '<div class="field-row">' +
            '<div class="field"><label for="ofName">Ime</label><input id="ofName" name="name" type="text" autocomplete="name" placeholder="Ime"></div>' +
            '<div class="field"><label for="ofPhone">Telefon / WhatsApp</label><input id="ofPhone" name="phone" type="tel" autocomplete="tel" placeholder="+381 6x xxx xxxx"></div>' +
          '</div>' +
          '<div class="field"><label for="ofDevice">Uređaj</label><select id="ofDevice" name="device">' +
            DEVICES.map(function (d) { return '<option>' + esc(d) + '</option>'; }).join('') +
          '</select></div>' +
          '<div class="field"><label for="ofNote">Napomena (opciono)</label><textarea id="ofNote" rows="3" placeholder="Npr. treba mi Arena Sport u 4K i dečiji kanali…"></textarea></div>' +
          '<div class="summary" id="orderSummary"><div><span id="summaryLabel">Ukupno</span><small id="summarySub"></small></div><b id="summaryPrice"></b></div>' +
          '<div class="modal-actions">' +
            '<button type="submit" class="btn btn-wa"><svg class="icon icon-fill"><use href="#i-whatsapp"></use></svg>Pošalji preko WhatsApp-a</button>' +
            '<button type="button" class="btn btn-ghost" id="tgSend"><svg class="icon icon-fill"><use href="#i-telegram"></use></svg>Telegram</button>' +
          '</div>' +
          '<p class="form-error" id="formError" hidden>Unesi ime i broj telefona da bismo mogli da te kontaktiramo.</p>' +
          '<p class="modal-note">Bez ugovora i automatske obnove. Podaci služe isključivo za aktivaciju i podršku.</p>' +
        '</form>' +
        '<div class="modal-success" id="modalSuccess" hidden>' +
          '<div class="success-icon"><svg class="icon"><use href="#i-check"></use></svg></div>' +
          '<h3>Poruka je spremna 🚀</h3>' +
          '<p>Otvorili smo chat sa tvojom porudžbinom. Ako se prozor nije otvorio, klikni na dugme ispod.</p>' +
          '<a id="successLink" class="btn btn-wa" target="_blank" rel="noreferrer" href="#">Otvori chat</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('[data-close]')) closeOrder();
      var pick = e.target.closest('.plan-pick');
      if (pick) { state.plan = pick.getAttribute('data-plan'); renderPicker(); renderSummary(); }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeOrder();
    });
    $('#orderForm', modal).addEventListener('submit', function (e) {
      e.preventDefault();
      submitOrder('wa');
    });
    $('#tgSend', modal).addEventListener('click', function () { submitOrder('tg'); });
  }

  function renderPicker() {
    var picker = $('#planPicker', modal);
    if (state.trial) { picker.innerHTML = ''; picker.hidden = true; return; }
    picker.hidden = false;
    picker.innerHTML = PLANS.map(function (p) {
      return (
        '<button type="button" class="plan-pick' + (p.id === state.plan ? ' active' : '') + '" data-plan="' + p.id + '">' +
          (p.badge ? '<span class="mini-badge' + (p.style === 'best' ? ' gold' : '') + '">' + (p.style === 'best' ? 'Top' : 'Hit') + '</span>' : '') +
          '<b>' + p.price + '€</b><span>' + esc(p.name) + '</span>' +
        '</button>'
      );
    }).join('');
  }

  function renderSummary() {
    var price = $('#summaryPrice', modal), sub = $('#summarySub', modal), label = $('#summaryLabel', modal);
    if (state.trial) {
      label.textContent = '24h trial';
      sub.textContent = 'Besplatno · jedan trial po domaćinstvu';
      price.textContent = '0€';
      return;
    }
    var p = findPlan(state.plan);
    label.textContent = 'Ukupno · ' + p.name;
    sub.textContent = p.perMonth + '€ / mesec' + (p.save ? ' · ušteda ' + p.save + '%' : '');
    price.textContent = p.price + '€';
  }

  function openOrder(planId, trial) {
    if (!modal) buildModal();
    state.trial = !!trial;
    state.plan = planId || state.plan || '3m';
    if (window.__closeMenu) window.__closeMenu();

    $('#modalEyebrow', modal).textContent = state.trial ? 'Besplatna proba' : 'Porudžbina';
    $('#modalTitle', modal).textContent = state.trial ? 'Zatraži 24h trial' : 'Poruči paket';
    $('#modalLead', modal).textContent = state.trial
      ? 'Ostavi kontakt i uređaj — šaljemo ti probne podatke da proveriš sliku na svojoj mreži.'
      : 'Izaberi trajanje, ostavi kontakt i za par minuta stižu podaci za aktivaciju.';

    $('#orderForm', modal).hidden = false;
    $('#modalSuccess', modal).hidden = true;
    $('#formError', modal).hidden = true;
    renderPicker();
    renderSummary();

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    setTimeout(function () { $('#ofName', modal).focus(); }, 60);
  }

  function closeOrder() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }

  function buildMessage() {
    var name = $('#ofName', modal).value.trim();
    var phone = $('#ofPhone', modal).value.trim();
    var device = $('#ofDevice', modal).value;
    var note = $('#ofNote', modal).value.trim();
    var lines = ['Zdravo RocketTV! 👋'];
    if (state.trial) lines.push('Želim da zatražim 24h trial.');
    else { var p = findPlan(state.plan); lines.push('Želim da poručim paket: ' + p.name + ' (' + p.price + '€).'); }
    lines.push('Ime: ' + name);
    lines.push('Telefon: ' + phone);
    lines.push('Uređaj: ' + device);
    if (note) lines.push('Napomena: ' + note);
    return lines.join('\n');
  }

  function submitOrder(channel) {
    var name = $('#ofName', modal).value.trim();
    var phone = $('#ofPhone', modal).value.trim();
    var err = $('#formError', modal);
    if (!name || phone.replace(/\D/g, '').length < 6) { err.hidden = false; return; }
    err.hidden = true;

    var msg = buildMessage();
    var url;
    if (channel === 'wa') {
      url = 'https://wa.me/' + CONTACT.waNumber + '?text=' + encodeURIComponent(msg);
    } else {
      url = 'https://t.me/' + CONTACT.telegram;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(msg).then(function () {
          toast('Poruka je kopirana — nalepi je u Telegram chat.');
        }).catch(function () {});
      }
    }
    window.open(url, '_blank', 'noopener');

    var link = $('#successLink', modal);
    link.href = url;
    link.textContent = channel === 'wa' ? 'Otvori WhatsApp' : 'Otvori Telegram';
    $('#orderForm', modal).hidden = true;
    $('#modalSuccess', modal).hidden = false;
  }

  function bindOrderButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-order]');
      if (!btn) return;
      e.preventDefault();
      openOrder(btn.getAttribute('data-plan'), btn.hasAttribute('data-trial'));
    });
  }

  /* ---------------- Kanali ---------------- */
  function initChannels() {
    var root = $('[data-channels]');
    if (!root) return;
    var chips = $('#catChips', root), search = $('#chSearch', root), body = $('#chBody', root), count = $('#chCount', root);
    var params = new URLSearchParams(location.search);
    var cat = params.get('cat');
    if (CATEGORIES.indexOf(cat) === -1) cat = 'Sve';
    var q = '';

    function renderChips() {
      chips.innerHTML = CATEGORIES.map(function (c) {
        return '<button type="button" class="chip' + (c === cat ? ' active' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
      }).join('');
    }
    function render() {
      var list = CHANNELS.filter(function (ch) {
        var okCat = cat === 'Sve' || ch.category === cat;
        var okQ = !q || ch.name.toLowerCase().indexOf(q) !== -1 || ch.region.toLowerCase().indexOf(q) !== -1;
        return okCat && okQ;
      });
      count.textContent = list.length + ' kanala u prikazu';
      body.innerHTML = list.length
        ? list.map(function (ch) {
            return '<div class="table-row">' +
              '<span class="row-name">' + esc(ch.name) + '</span>' +
              '<span class="row-cat">' + esc(ch.category) + '</span>' +
              '<span class="row-q' + (ch.quality === '4K' ? ' q4k' : '') + '">' + esc(ch.quality) + '</span>' +
              '<span class="row-region">' + esc(ch.region) + '</span>' +
            '</div>';
          }).join('')
        : '<p class="empty">Nema rezultata za ovu pretragu.</p>';
    }
    chips.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cat]');
      if (!b) return;
      cat = b.getAttribute('data-cat');
      renderChips();
      render();
      try {
        var url = new URL(location.href);
        if (cat === 'Sve') url.searchParams.delete('cat'); else url.searchParams.set('cat', cat);
        history.replaceState(null, '', url.toString());
      } catch (err) { /* file:// ili stariji browser — ignoriši */ }
    });
    search.addEventListener('input', function () { q = search.value.trim().toLowerCase(); render(); });
    renderChips();
    render();
  }

  /* ---------------- Init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    injectSprite();
    initNav();
    fillContacts();
    renderPricing();
    renderFAQ();
    initCounters();
    initMarquee();
    initChannels();
    bindOrderButtons();
    buildModal();
    initReveal();
  });

  window.RocketTV = { openOrder: openOrder, closeOrder: closeOrder, plans: PLANS, channels: CHANNELS };
})();
