/* Scentry site: builds the page from content.js. You normally never need to edit this file. */
(function () {
  'use strict';
  var S = window.SITE, app = document.getElementById('app');
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showProblem(msg) {
    app.innerHTML = '<div style="margin:2rem;padding:1.5rem;border:3px solid #b00020;background:#fff;color:#1d2026;font:16px/1.5 system-ui,sans-serif;border-radius:10px">' +
      '<strong>content.js has a problem.</strong> Most often a comma, quote mark, or bracket went missing in the last edit. Undo that edit and try again.' +
      (msg ? '<br><small style="color:#666">' + String(msg).replace(/</g, '&lt;') + '</small>' : '') + '</div>';
  }
  if (!S) { showProblem(''); return; }
  window.addEventListener('error', function (e) { if (!app.children.length) showProblem(e.message); });

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var showEmpty = !(S.settings && S.settings.showPlaceholders === false);
  if (!showEmpty) document.body.classList.add('hide-empty');

  var SHIELD = '<svg class="shield" viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3l11 4.2v7.8c0 6.4-4.4 10.9-11 13.4C9.4 25.9 5 21.4 5 15V7.2z" fill="currentColor"/><path d="M10.6 15.6l4 4 7-7.4" fill="none" style="stroke:var(--check,#1c2820)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var MARK = '<span class="wordmark" role="img" aria-label="Scentry">SC<span class="e-mark" aria-hidden="true"><i></i><i></i><i></i></span>NTRY</span>';

  /* ---------- Hero: a gear bag that starts out funky ---------- */
  function bagArt() {
    var fumes = [
      'M178 214 C150 188 204 168 176 138 S198 92 178 60',
      'M232 206 C204 176 262 156 232 122 S252 74 236 38',
      'M290 214 C262 184 318 160 290 128 S312 82 294 50',
      'M346 220 C322 196 372 178 348 150 S366 112 352 86'
    ];
    return '<svg class="bag-art" viewBox="0 0 520 440" role="img" aria-labelledby="bag-title">' +
      '<title id="bag-title">A gym bag. Without Scentry, smell lines rise from it. With Scentry, they are gone.</title>' +
      '<ellipse class="halo" cx="260" cy="250" rx="230" ry="170"/>' +
      '<ellipse cx="262" cy="404" rx="190" ry="16" fill="#000" opacity=".3"/>' +
      '<path d="M150 236 C150 160 372 160 372 236" fill="none" stroke="#fdf1ed" stroke-width="16" stroke-linecap="round"/>' +
      '<rect x="78" y="226" width="368" height="170" rx="64" fill="#fdf1ed"/>' +
      '<path d="M100 262 H424" stroke="#b7aaa3" stroke-width="5" stroke-dasharray="3 9" stroke-linecap="round"/>' +
      '<rect x="372" y="290" width="74" height="86" rx="22" fill="#4a6350"/>' +
      '<rect x="116" y="296" width="132" height="62" rx="16" fill="#2b3a30"/>' +
      '<text x="182" y="334" text-anchor="middle" class="bag-label">SCENTRY</text>' +
      '<g class="fumes" fill="none" stroke-linecap="round" stroke-width="13">' +
        fumes.map(function (d, i) { return '<path class="fume" style="--i:' + i + '" d="' + d + '" pathLength="100"/>'; }).join('') +
      '</g>' +
      '<g class="fresh">' +
        '<g transform="translate(330 120)"><g class="badge"><circle r="46" fill="#fdf1ed"/><g transform="translate(-24 -26) scale(1.5)" color="#3f8d4d" style="--check:#fdf1ed">' + SHIELD.replace(/<svg[^>]*>|<\/svg>/g, '') + '</g></g></g>' +
        '<path class="spark s1" d="M130 120 l7 -18 l7 18 l18 7 l-18 7 l-7 18 l-7 -18 l-18 -7z" fill="#b9efb4"/>' +
        '<path class="spark s2" d="M432 214 l5 -13 l5 13 l13 5 l-13 5 l-5 13 l-5 -13 l-13 -5z" fill="#fdf1ed"/>' +
        '<path class="spark s3" d="M92 190 l4 -10 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4z" fill="#b9efb4"/>' +
      '</g>' +
    '</svg>';
  }

  function renderHeader() {
    var b = S.brand;
    var links = [['problem', 'The problem'], ['audience', 'Who it is for'], ['product', 'What we build'], ['learning', 'What we learned'], ['progress', 'Where we are']];
    if (hasTeam()) links.push(['team', 'Team']);
    links.push(['faq', 'Questions']);
    return '<header class="site-header"><div class="wrap header-row">' +
      '<a class="brand" href="#top" aria-label="' + esc(b.name) + ', top of page">' + SHIELD + MARK + '</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="bars" aria-hidden="true"></span><span class="sr-only">Menu</span></button>' +
      '<nav id="site-nav" class="site-nav" aria-label="Main"><ul>' +
        links.map(function (l) { return '<li><a href="#' + l[0] + '">' + esc(l[1]) + '</a></li>'; }).join('') +
        '<li><a class="btn btn-small" href="#contact">Follow along</a></li>' +
      '</ul></nav></div></header>';
  }

  function renderHero() {
    var h = S.hero;
    return '<section class="hero" id="top"><div class="wrap hero-grid">' +
      '<div class="hero-copy">' +
        '<p class="hero-kicker">' + esc(S.brand.tagline) + '</p>' +
        '<h1>' + esc(h.headline) + '</h1>' +
        '<p class="hero-text">' + esc(h.text) + '</p>' +
        '<div class="btn-row"><a class="btn" href="#contact">' + esc(h.primaryLabel) + '</a>' +
          (S.brand.surveyUrl ? '<a class="btn btn-ghost" href="' + esc(S.brand.surveyUrl) + '" target="_blank" rel="noopener">Take the survey</a>' : '<a class="btn btn-ghost" href="#product">What we are building</a>') +
        '</div>' +
        (S.brand.incubator && S.brand.incubator.name ? '<p class="hero-inc">A student venture in ' + esc(S.brand.incubator.name) + '.</p>' : '') +
      '</div>' +
      '<div class="hero-stage" data-state="funk">' + bagArt() +
        '<div class="toggle-row">' +
          '<span class="toggle-side" data-side="funk">' + esc(h.toggleOff) + '</span>' +
          '<button class="switch" type="button" role="switch" aria-checked="false" aria-label="Show the bag with Scentry"><span class="knob"></span></button>' +
          '<span class="toggle-side" data-side="fresh">' + esc(h.toggleOn) + '</span>' +
        '</div>' +
        '<p class="sr-only" role="status" aria-live="polite" id="hero-status"></p>' +
      '</div></div></section>';
  }

  function renderProblem() {
    var p = S.problem;
    return '<section class="section dark" id="problem"><div class="wrap">' +
      '<div class="section-head"><h2>' + esc(p.title) + '</h2><p class="intro">' + esc(p.intro) + '</p></div>' +
      '<ul class="gear-list">' + p.items.map(function (it) {
        return '<li class="gear"><h3>' + esc(it.name) + '</h3><p>' + esc(it.why) + '</p></li>';
      }).join('') + '</ul></div></section>';
  }

  function renderAudience() {
    var a = S.audience;
    return '<section class="section" id="audience"><div class="wrap"><div class="section-head"><h2>' + esc(a.title) + '</h2><p class="intro">' + esc(a.intro) + '</p></div>' +
      '<ul class="groups">' + a.groups.map(function (g) { return '<li class="group"><h3>' + esc(g.who) + '</h3><p>' + esc(g.text) + '</p></li>'; }).join('') + '</ul></div></section>';
  }

  function slot(base, label, cls) {
    return '<figure class="slot ' + (cls || '') + '" data-photo><div class="slot-empty" aria-hidden="true"><span>' + esc(label) + '</span><small>' + esc(base) + '.jpg</small></div>' +
      '<img data-base="' + esc(base) + '" data-i="0" src="' + esc(base) + '.jpg" alt="" decoding="async" loading="lazy"></figure>';
  }

  function renderProduct() {
    var p = S.product;
    return '<section class="section" id="product"><div class="wrap product-grid">' +
      '<div><h2>' + esc(p.title) + '</h2><p class="lead">' + esc(p.lead) + '</p>' +
        '<ul class="goals">' + p.goals.map(function (g) { return '<li><h3>' + esc(g.title) + '</h3><p>' + esc(g.text) + '</p></li>'; }).join('') + '</ul></div>' +
      '<div class="product-photo">' + slot('photos/product', 'Product or prototype photo') + '<span class="status-badge">' + esc(p.status) + '</span></div>' +
    '</div></section>';
  }

  function renderLearning() {
    var d = S.discovery;
    var stats = (d.stats || []).map(function (s) { return '<li><span class="stat-n">' + esc(s.value) + '</span><span class="stat-l">' + esc(s.label) + '</span></li>'; }).join('');
    var quotes = (d.quotes || []).map(function (q) { return '<figure class="quote"><blockquote>' + esc(q.text) + '</blockquote><figcaption>' + esc(q.who) + '</figcaption></figure>'; }).join('');
    return '<section class="section tint" id="learning"><div class="wrap">' +
      '<div class="section-head"><h2>' + esc(d.title) + '</h2><p class="intro">' + esc(d.intro) + '</p></div>' +
      (stats ? '<ul class="stats">' + stats + '</ul>' : '') +
      '<div class="ask"><h3>What we are asking</h3><ul>' + d.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join('') + '</ul>' +
        (S.brand.surveyUrl ? '<a class="btn" href="' + esc(S.brand.surveyUrl) + '" target="_blank" rel="noopener">Answer in two minutes</a>' : '') + '</div>' +
      (quotes ? '<div class="quotes">' + quotes + '</div>' : '') +
    '</div></section>';
  }

  function renderProgress() {
    var p = S.progress, label = { done: 'Done', now: 'Happening now', next: 'Up next' };
    return '<section class="section" id="progress"><div class="wrap"><div class="section-head"><h2>' + esc(p.title) + '</h2></div>' +
      '<ol class="steps">' + p.steps.map(function (s) {
        return '<li class="step step-' + esc(s.status) + '"><span class="step-tag">' + esc(label[s.status] || s.status) + '</span><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></li>';
      }).join('') + '</ol></div></section>';
  }

  function hasTeam() { return (S.teamSection.members && S.teamSection.members.length) || showEmpty; }
  function renderTeam() {
    var t = S.teamSection, m = t.members || [], cards = '';
    if (m.length) {
      cards = m.map(function (x) {
        var slug = String(x.photo || x.name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        return '<li class="member">' + slot('photos/team/' + slug, 'Photo', 'member-photo') + '<h3>' + esc(x.name) + '</h3><p>' + esc(x.role || '') + '</p></li>';
      }).join('');
    } else if (showEmpty) {
      for (var i = 0; i < (t.emptyPreviewCount || 3); i++) cards += '<li class="member">' + slot('photos/team/name', 'Team member photo', 'member-photo') + '<h3 class="ph-text">Name</h3><p class="ph-text">Role</p></li>';
    } else return '';
    return '<section class="section tint" id="team"><div class="wrap"><div class="section-head"><h2>' + esc(t.title) + '</h2><p class="intro">' + esc(t.intro) + '</p></div><ul class="members">' + cards + '</ul></div></section>';
  }

  function renderFaq() {
    var f = S.faq;
    return '<section class="section" id="faq"><div class="wrap faq-grid"><h2>' + esc(f.title) + '</h2><div class="faq-list">' +
      f.items.map(function (it) { return '<details class="faq-item"><summary>' + esc(it.q) + '</summary><p>' + esc(it.a) + '</p></details>'; }).join('') +
    '</div></div></section>';
  }

  function renderContact() {
    var c = S.contact, b = S.brand, buttons = '';
    if (b.email) buttons += '<a class="btn btn-light" href="mailto:' + esc(b.email) + '?subject=' + encodeURIComponent('Scentry') + '">Email us</a>';
    if (b.surveyUrl) buttons += '<a class="btn btn-ghost-light" href="' + esc(b.surveyUrl) + '" target="_blank" rel="noopener">Take the survey</a>';
    if (!buttons && showEmpty) buttons = '<p class="ph-note">Add your email or survey link in content.js (brand section) and the buttons appear here.</p>';
    return '<section class="section dark contact" id="contact"><div class="wrap"><h2>' + esc(c.title) + '</h2><p class="intro">' + esc(c.text) + '</p><div class="btn-row">' + buttons + '</div></div></section>';
  }

  function renderFooter() {
    var inc = S.brand.incubator;
    return '<footer class="site-footer"><div class="wrap"><div class="footer-mark">' + MARK + '</div><div class="footer-row"><p>' + esc(S.footerNote) + '</p>' +
      (inc && inc.name ? '<p>Built in the ' + (inc.url ? '<a href="' + esc(inc.url) + '" target="_blank" rel="noopener">' + esc(inc.name) + '</a>' : esc(inc.name)) + '.</p>' : '') +
      '<p><a href="#top">Back to top</a></p></div></div></footer>';
  }

  function render() {
    app.innerHTML = '<a class="skip" href="#main">Skip to content</a>' + renderHeader() +
      '<main id="main">' + renderHero() + renderProblem() + renderAudience() + renderProduct() + renderLearning() + renderProgress() + renderTeam() + renderFaq() + renderContact() + '</main>' + renderFooter();
  }

  /* ---------- Photos: hide the dashed box once a photo loads; try png/jpeg/webp if jpg is missing ---------- */
  var EXTS = ['jpg', 'png', 'jpeg', 'webp'];
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.base) return;
    var i = parseInt(img.dataset.i, 10) + 1;
    if (i < EXTS.length) { img.dataset.i = i; img.src = img.dataset.base + '.' + EXTS[i]; } else img.remove();
  }, true);
  document.addEventListener('load', function (e) {
    var img = e.target;
    if (img instanceof HTMLImageElement && img.dataset.base) { var f = img.closest('[data-photo]'); if (f) f.classList.add('has-photo'); }
  }, true);

  /* ---------- Nav and hero toggle ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle'), nav = document.getElementById('site-nav');
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('is-open', open);
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('is-open'); } });
    var header = document.querySelector('.site-header');
    function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  function initHero() {
    var stage = document.querySelector('.hero-stage'), sw = stage.querySelector('.switch'), status = document.getElementById('hero-status');
    var touched = false;
    function set(state, say) {
      stage.dataset.state = state; sw.setAttribute('aria-checked', String(state === 'fresh'));
      if (say) status.textContent = state === 'fresh' ? 'With Scentry: the smell is gone.' : 'Without Scentry: the smell is back.';
    }
    sw.addEventListener('click', function () { touched = true; set(stage.dataset.state === 'fresh' ? 'funk' : 'fresh', true); });
    stage.querySelectorAll('.toggle-side').forEach(function (s) {
      s.addEventListener('click', function () { touched = true; set(s.dataset.side, true); });
    });
    // One moment on load: the bag starts out funky, then Scentry clears it.
    if (!REDUCE) setTimeout(function () { if (!touched) set('fresh', false); }, 1700);
  }

  try { render(); initNav(); initHero(); } catch (err) { showProblem(err && err.message); if (window.console) console.error(err); }
})();
