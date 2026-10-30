'use strict';

(() => {
  const data = window.WILSON_DATA;
  if (!data) return;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const fragment = html => { const box = document.createElement('template'); box.innerHTML = html; return box.content; };
  const plain = html => fragment(html).textContent.replace(/\s+/g, ' ').trim();
  const findAsset = part => Object.entries(data.assets).find(([url]) => url.includes(part))?.[1] || '';
  const asset = {logo:findAsset('5be82335'), hero:findAsset('645399b6'), couch:findAsset('49af55ee'), mission:findAsset('58862d90')};
  const iconPaths = {
    sprout:'<path d="M12 22V11M12 16C5 17 3 12 3 7c6-1 10 2 9 9ZM12 12c-1-7 3-10 9-10 0 7-3 11-9 10Z"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    screen:'<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8m-4-5v5"/>',
    phone:'<path d="m4 3 4-1 3 6-3 2c2 3 3 4 6 6l2-3 6 3-1 4c-1 4-8 1-13-4S0 4 4 3Z"/>',
    mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7L22 6"/>',
    book:'<path d="M12 5c-4-3-7-3-10-2v16c4-1 7-1 10 2 3-3 6-3 10-2V3c-3-1-6-1-10 2Zm0 0v16"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4m0-15.6-1.4 1.4M5.6 18.4l-1.4 1.4"/>',
    chat:'<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"/>',
    flower:'<path d="M12 12C2 7 7-3 12 6c5-9 10 1 0 6Zm0 0c10-5 15 5 5 5 4 9-7 9-5-5Zm0 0c2 10-9 10-5 1-10 0-5-10 5-1Z"/>',
    check:'<path d="m5 12 4 4L20 5"/>'
  };
  const icon = (name, css = '') => `<svg class="${css}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.sprout}</svg>`;
  const route = path => `#/${String(path || '').replace(/^https?:\/\/www\.wilsoncounseling\.org\/?/, '').replace(/^\//, '')}`;
  const bookButton = (label = 'Book an appointment', css = '') => `<button class="button ${css}" data-book>${label} <span aria-hidden="true">↗</span></button>`;
  const link = (label, path, css = '') => `<a class="text-link ${css}" href="${route(path)}">${label} <span aria-hidden="true">↗</span></a>`;
  const eyebrow = text => `<div class="eyebrow">${text}</div>`;
  const image = (src, alt, css = '', eager = false) => src ? `<img src="${escape(src)}" alt="${escape(alt)}" class="${css}" loading="${eager ? 'eager' : 'lazy'}" decoding="async"${eager ? ' fetchpriority="high"' : ''}>` : '';
  const therapists = [
    {path:'elvin-keles',name:'Elvin Aydin Keles',credentials:'LPC',focus:'Individuals & couples'},
    {path:'claudia-balatoni',name:'Claudia Balatoni',credentials:'M.A., LPC',focus:'English & Spanish'},
    {path:'clayton-hutchins',name:'Clayton Hutchins',credentials:'LPC',focus:'Adolescents, adults & couples'},
    {path:'lisa-smith',name:'Lisa Smith',credentials:'LPC',focus:'EMDR & trauma therapy'},
    {path:'nancy-wilson',name:'Nancy Wilson',credentials:'LPC-S',focus:'Individuals, couples & families'}
  ];
  const groups = [
    {name:'For yourself',paths:['anxiety-therapy','autism-spectrum-disorder-counseling','adhd-services','cancer-support-services','eating-disorder-therapy','lgbtq-counseling','sports-counseling','career-counseling','emdr-trauma-therapy','ptsd-treatment','chronic-pain-therapy','online-therapy','lpc-supervision']},
    {name:'For your relationship',paths:['premarital-counseling','couples-marriage-counseling','affair-recovery-counseling','intensive-couples-therapy','divorce-counseling','infertility-counseling']},
    {name:'For your family',paths:['perinatal-and-postnatal-treatment','family-therapy','parenting-counseling','child-therapy','teen-therapy','school-college-counseling']}
  ];
  const allServices = groups.flatMap(group => group.paths.map(path => ({path,group:group.name,label:data.nav[path] || path})));
  const categoryFor = path => allServices.find(s => s.path === path)?.group || 'Counseling & therapy';
  const featuredServices = data.specialties.map((service, index) => ({...service,number:index+1,path:service.path.replace(/^https?:\/\/www\.wilsoncounseling\.org/, '').replace(/^\//,''),category:['Individual','Individual','Individual','Family','Relationships','Family'][index]}));
  const introHTML = data.homeBlocks.find(block => block.includes('Today Can Be')) || '';
  const introParagraphs = $$('p', fragment(introHTML)).map(p => p.textContent.trim()).filter(Boolean);
  const reasons = data.homeBlocks.flatMap(block => $$('li', fragment(block)).map(li => li.textContent.trim()));
  const missionHTML = data.homeBlocks.find(block => block.includes('Mission Statement')) || '';
  const missionParagraphs = $$('p', fragment(missionHTML)).map(p => p.textContent.trim()).filter(Boolean);
  const main = $('#main');
  let observer;
  let lastRoute = '';
  let lastFocus = null;
  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');

  $('#brand-logo').src = asset.logo;
  $('#services-menu').innerHTML = groups.map(group => `<div><h4>${group.name}</h4>${group.paths.map(path => `<a href="${route(path)}">${escape(data.nav[path])}</a>`).join('')}</div>`).join('') + `<a class="menu-all" href="#/services">Explore all counseling services <span aria-hidden="true">↗</span></a>`;

  function footer() {
    $('#footer').innerHTML = `<div class="shell"><div class="footer-grid"><div class="footer-brand"><a class="brand" href="#/" aria-label="Wilson Counseling home">${image(asset.logo,'', '',true)}<span>Wilson<span class="brand-small">COUNSELING</span></span></a><p>Helping people move forward when life feels stuck. In Houston and throughout Texas.</p><a class="creator-credit" href="https://github.com/sebastianswebdev" target="_blank" rel="noopener">Redesign concept by @sebastianswebdev ↗</a><div class="social-links"><a href="https://www.facebook.com/wilsoncounseling" target="_blank" rel="noopener" aria-label="Wilson Counseling on Facebook">f</a><a href="https://www.instagram.com/wilsoncounselingofficial/" target="_blank" rel="noopener" aria-label="Wilson Counseling on Instagram">ig</a><a href="https://www.linkedin.com/company/wilson-counseling/" target="_blank" rel="noopener" aria-label="Wilson Counseling on LinkedIn">in</a></div></div><div class="footer-col"><h3>COME AS YOU ARE</h3><address>6575 West Loop South, Suite 160<br>Bellaire, Texas 77401</address><a href="tel:+17135650922" style="margin-top:12px">713-565-0922</a><a class="footer-email" href="mailto:contact@wilsoncounseling.org">contact@wilsoncounseling.org</a></div><div class="footer-col"><h3>FIND YOUR WAY</h3><a href="#/services">Our services</a><a href="#/our-therapists">Meet our therapists</a><a href="#/faq">FAQ & rates</a><a href="#/contact-a-therapist">Get in touch</a></div><div class="footer-col"><h3>A LITTLE GUIDANCE</h3><a href="#/wilson-counseling-blog">The journal</a><a href="#/self-tests">Self tests</a><a href="#/resources">Helpful resources</a><a href="#/make-a-referral">Make a referral</a></div></div><div class="footer-bottom"><span>© 2025 Wilson Counseling. All rights reserved.</span><div><a href="https://www.privacypolicies.com/live/c4ce43d9-3591-44d7-a94f-c4205ce7d8d8" target="_blank" rel="noopener">Privacy policy ↗</a><a href="https://www.privacypolicies.com/live/7b11d85f-30b7-4340-a1ae-8f5648301beb" target="_blank" rel="noopener">Terms & conditions ↗</a><span>A premium private pay practice</span></div></div></div>`;
  }

  function featured() {
    const press = [
      ['57a9707d','USA Today','https://www.wilsoncounseling.org/s/09-21-2025-Premium-Mental-Health-sm-8l8d.pdf',''],
      ['8a08601a','AARP','https://www.aarp.org/family-relationships/staying-friends-with-ex-partners-family/','aarp'],
      ['02f6f7c1','FOX 26 Houston','','fox'],
      ['82504023','Scary Mommy','https://www.scarymommy.com/lifestyle/signs-youre-actually-an-introvert','scary'],
      ['91932599','GenTwenty','https://gentwenty.com/how-modern-practices-help-couples-reconnect-rebuild-intimacy/','gentwenty']
    ];
    return `<section class="featured" aria-label="As featured in"><div class="shell featured-inner"><div class="eyebrow">As featured in</div>${press.map(([part,name,url,css]) => url ? `<a class="press-logo ${css}" href="${url}" target="_blank" rel="noopener" aria-label="Wilson Counseling featured in ${name}">${image(findAsset(part),name)}</a>` : `<div class="press-logo ${css}">${image(findAsset(part),name)}</div>`).join('')}</div></section>`;
  }

  function serviceCards(filter = 'All care') {
    const services = featuredServices.filter(service => filter === 'All care' || service.category === filter);
    return services.map(service => `<article class="service-card"><a class="service-card-image" href="${route(service.path)}" tabindex="-1" aria-hidden="true"><span class="service-card-number">0${service.number}</span>${image(service.image,service.title + ' counseling')}</a><div class="service-card-content"><span class="card-category">${service.category === 'Individual' ? 'For yourself' : service.category === 'Family' ? 'For your family' : 'For your relationship'}</span><h3><a href="${route(service.path)}">${escape(service.title)}</a></h3><p>${escape(service.text)}</p><a class="card-link" href="${route(service.path)}" aria-label="Explore ${escape(service.title)} counseling">Explore this service <span aria-hidden="true">↗</span></a></div></article>`).join('');
  }

  function therapistCards() {
    return therapists.map(therapist => {
      const page = data.pages[therapist.path];
      const photo = page?.images[1]?.src || page?.images[0]?.src;
      return `<a class="therapist-card" href="${route(therapist.path)}"><div class="therapist-photo">${image(photo,therapist.name)}<span class="therapist-arrow" aria-hidden="true">↗</span></div><h3>${therapist.name}</h3><p>${therapist.credentials}<br>${therapist.focus}</p></a>`;
    }).join('');
  }

  function articleCategory(path) {
    if (/autism/.test(path)) return 'Understanding yourself';
    if (/cancer|illness|loneliness/.test(path)) return 'Cancer support & healing';
    return 'Relationships & connection';
  }

  function journalCards(paths) {
    return paths.filter(path => data.pages[path]).map(path => {
      const page = data.pages[path];
      return `<article class="journal-card"><a href="${route(path)}" class="journal-image" tabindex="-1" aria-hidden="true">${image(page.images[0]?.src || asset.hero,page.title)}</a><div class="eyebrow">${articleCategory(path)}</div><h3><a href="${route(path)}">${escape(page.title)}</a></h3>${link('Read the article',path)}</article>`;
    }).join('');
  }

  function accordion(items) {
    return `<div class="accordion">${items.map(item => `<details><summary>${escape(item.title)}</summary><div class="answer">${localize(item.html)}</div></details>`).join('')}</div>`;
  }

  function faqHighlights() {
    const source = data.pages.faq;
    const questions = ['How much does counseling','Will my insurance','How long does counseling'];
    const items = questions.map(needle => source.groups?.find(group => group.title.startsWith(needle))).filter(Boolean);
    if (!items.length) return '';
    return `<section class="faq-section"><div class="shell faq-grid"><div class="faq-heading reveal">${eyebrow('A little clarity')}<h2>It's okay to<br>have questions.</h2><p>Therapy is an investment in yourself and in your relationships.</p>${link('More questions & rates','faq')}</div><div class="reveal">${accordion(items)}</div></div></section>`;
  }

  function cta() {
    return `<section class="cta-section"><div class="shell cta-inner"><div class="reveal">${eyebrow('You can do this')}<h2>A first step.<br>A new way forward.</h2><p>Getting help takes courage. You take that first step toward change by contacting a therapist.</p></div><div class="cta-actions reveal">${bookButton('Begin therapy today','button-dark')}<a href="tel:+17135650922">Or call us at 713-565-0922</a></div></div></section>`;
  }

  function home() {
    const recent = data.posts.slice(1,4);
    const introFirst = introParagraphs[0] || 'Are you ready to grow from your struggles, heal from your pain, and make the changes you want in your life?';
    const introRest = introParagraphs.slice(1).filter(text => !text.startsWith('It takes courage'));
    return `<section class="hero"><div class="shell hero-grid"><div class="hero-copy"><div class="eyebrow">Welcome to Wilson Counseling</div><h1>Helping people<br>move forward<br>when life feels <em>stuck.</em></h1><p class="hero-description">Helping couples and individuals heal relationships, recover from betrayal, and move through trauma and anxiety.</p><div class="hero-actions">${bookButton('Find your way forward')}<a class="text-link" href="#/services">Explore our services <span aria-hidden="true">↓</span></a></div><div class="hero-meta"><span>${icon('pin')} Houston, Texas</span><span>${icon('screen')} Online across Texas</span></div></div><div class="hero-art"><div class="hero-outline"></div><div class="hero-image-wrap">${image(asset.hero,'Soft dandelion seeds, the original Wilson Counseling imagery','hero-image',true)}</div><div class="hero-orbit">${icon('sprout')}</div><div class="hero-pill"><span class="status-dot"></span> A premium private pay practice</div><div class="hero-note"><span class="note-icon">${icon('heart')}</span><p>You are strong.<br>You don't have to do this alone.</p></div></div></div><div class="shell hero-foot"><a href="#care">A little support. A way forward. <span aria-hidden="true">↓</span></a><p>Couples counseling · Marriage intensives · EMDR therapy</p></div></section>${featured()}<section id="care" class="section intro-section"><div class="shell intro-grid"><div class="intro-heading reveal">${eyebrow('Change is possible')}<h2>Today can be the day<br>you get unstuck.<br><em>And change your life.</em></h2><div class="intro-note"><span>${icon('sprout')}</span> Real support. Individualized care. Room to grow.</div></div><div class="intro-copy reveal"><p>${escape(introFirst)}</p><details class="intro-more"><summary>A way forward, even when it feels difficult</summary>${introRest.map(text => `<p>${escape(text)}</p>`).join('')}</details>${link('Meet the people who can help','our-therapists')}</div></div></section><section class="section services-section" id="specialties"><div class="shell"><div class="section-top reveal"><div>${eyebrow('Counseling & therapy specialties')}<h2>Care that meets you<br><em>where you are.</em></h2></div><p>Couples counseling, marriage intensives & EMDR therapy in Houston. Support for you, your relationships, and your family.</p></div><div class="service-controls reveal"><div class="filter-tabs" role="group" aria-label="Filter counseling specialties">${['All care','Individual','Relationships','Family'].map((label,index) => `<button class="filter-button ${index === 0 ? 'active' : ''}" data-filter="${label}" aria-pressed="${index === 0}">${label}</button>`).join('')}</div><span class="service-count">Find your starting point</span></div><div class="service-grid" id="home-service-grid" aria-live="polite">${serviceCards()}</div><div class="services-bottom reveal"><p>Not sure where to begin? We're here to help you find the right fit.</p>${link('Explore all counseling services','services')}</div></div></section><section class="section approach-section"><div class="shell approach-grid"><div class="approach-visual reveal"><div class="approach-photo">${image(asset.couch,'A comfortable space to talk and work through what matters to you')}</div><div class="approach-caption">${icon('heart')}<p>A space to feel heard.<br>A chance to feel better.</p><span>You're welcome here</span></div></div><div class="approach-copy reveal">${eyebrow('Reasons to go to a therapist')}<h2>You don't have to<br>figure it all out <em>alone.</em></h2><p>At Wilson Counseling, your therapist will listen to your concerns, customize a treatment plan, and give you powerful tools to start feeling good again.</p><ul class="reason-list">${reasons.slice(0,5).map(reason => `<li>${escape(reason)}</li>`).join('')}</ul><details class="reasons-more"><summary>More ways therapy can help</summary><ul class="reason-list">${reasons.slice(5).map(reason => `<li>${escape(reason)}</li>`).join('')}</ul></details>${bookButton('Take the first step','button-outline')}</div></div></section><section class="section team-section"><div class="shell"><div class="section-top reveal"><div>${eyebrow('Real people. Meaningful connections.')}<h2>The right support starts<br>with the <em>right person.</em></h2></div><p>It is important that you find a therapist who is a good fit for you. Get to know our Houston counseling team.</p></div><div class="team-grid reveal">${therapistCards()}</div><div class="team-note reveal"><p>A safe, supportive environment. A unique approach to your needs.</p>${link('Meet our therapists','our-therapists')}</div></div></section>${videoSection()}<section class="mission-section"><div class="shell mission-grid"><div class="mission-art reveal">${image(asset.mission,'Wilson Counseling — original aqua and coral bird logo')}${icon('flower','mission-flower')}</div><div class="mission-copy reveal">${eyebrow('Our mission')}<h2>Live more fully.<br>Be part of <em>healing the world.</em></h2>${missionParagraphs.map(text => `<p>${escape(text)}</p>`).join('')}</div></div></section><section class="section journal-section"><div class="shell"><div class="section-top reveal"><div>${eyebrow('From the Wilson Counseling journal')}<h2>A little perspective.<br><em>A little more possibility.</em></h2></div>${link('Explore the journal','wilson-counseling-blog')}</div><div class="journal-grid reveal">${journalCards(recent)}</div></div></section>${faqHighlights()}${cta()}`;
  }

  function videoSection() {
    const videoText = introParagraphs.find(text => text.startsWith('It takes courage')) || 'It takes courage to decide to go to therapy, and it can be overwhelming to pick a Texas therapist. In this video, I give tips for finding a therapist who will be a good fit for you.';
    return `<section class="video-section"><div class="shell video-grid"><div class="reveal">${eyebrow('A good place to begin')}<h2>Finding a therapist<br>who feels right <em>for you.</em></h2><p>${escape(videoText)}</p>${data.video ? '<button class="text-link" style="background:none;color:inherit" data-video>Watch the video <span aria-hidden="true">↗</span></button>' : '<a class="text-link" href="https://www.youtube.com/channel/UC1YAqgWws0P1zokcpbZwOpA" target="_blank" rel="noopener">Watch our videos <span aria-hidden="true">↗</span></a>'}</div>${data.video ? `<button class="video-thumb reveal" data-video aria-label="Play video: finding the right therapist">${image(therapists.length ? data.pages['nancy-wilson'].images[1]?.src : asset.couch,'Nancy Wilson')}<span class="play-circle" aria-hidden="true">▷</span><span class="video-thumb-label">Finding your therapist · Nancy Wilson</span></button>` : `<a class="video-thumb reveal" href="https://www.youtube.com/channel/UC1YAqgWws0P1zokcpbZwOpA" target="_blank" rel="noopener" aria-label="Watch Wilson Counseling videos on YouTube">${image(data.pages['nancy-wilson'].images[1]?.src,'Nancy Wilson')}<span class="play-circle" aria-hidden="true">▷</span><span class="video-thumb-label">Wilson Counseling · YouTube ↗</span></a>`}</div></section>`;
  }

  function routeHero(title, description = '', label = 'Wilson Counseling', cover = '') {
    return `<section class="route-hero ${cover ? 'has-image' : ''}"><div class="shell"><div><div class="breadcrumbs"><a href="#/">Home</a><span aria-hidden="true">/</span><span>${escape(label)}</span></div>${eyebrow(label)}<h1>${escape(title)}</h1>${description ? `<p>${escape(description)}</p>` : ''}${cover ? bookButton('Begin therapy today') : ''}</div>${cover ? image(cover,title,'route-cover',true) : ''}</div></section>`;
  }

  function servicesPage() {
    return routeHero('Support for every part of your life.','Explore counseling and therapy specialties for yourself, your relationship, and your family. In person in Houston and online throughout Texas.','Our services') + `<section class="page-section"><div class="shell"><div class="directory-tools"><div class="filter-tabs" role="group" aria-label="Filter services">${['All services',...groups.map(group => group.name)].map((name,i) => `<button class="filter-button ${!i ? 'active' : ''}" data-directory-filter="${name}" aria-pressed="${!i}">${name}</button>`).join('')}</div><label class="search-field"><span aria-hidden="true">⌕</span><input id="service-search" type="search" placeholder="Find a service…" aria-label="Search counseling services"></label></div><div class="directory-grid" id="service-directory" aria-live="polite">${directoryItems()}</div></div></section>${cta()}`;
  }

  function directoryItems(filter = 'All services', search = '') {
    const items = allServices.filter(service => (filter === 'All services' || filter === service.group) && `${service.label} ${service.group}`.toLowerCase().includes(search.toLowerCase()));
    return items.length ? items.map(service => `<a class="directory-item" href="${route(service.path)}"><div><small>${service.group}</small><h3>${escape(service.label)}</h3></div><span aria-hidden="true">↗</span></a>`).join('') : '<p class="empty-results">No matching services. Try another word or view all services.</p>';
  }

  function therapistsPage() {
    return routeHero('The right person can make a difference.','It is important that you find a therapist who is a good fit for you. Meet the people behind Wilson Counseling.','Our therapists') + `<section class="section full-team"><div class="shell"><div class="team-grid">${therapistCards()}</div><div class="team-note"><p>In-person therapy in Houston. Online therapy throughout Texas.</p>${link('Questions? Get in touch.','contact-a-therapist')}</div></div></section>${cta()}`;
  }

  function faqPage() {
    const page = data.pages.faq;
    const groups = page.groups || [];
    const rates = groups.filter(item => item.title.includes('Rates'));
    const other = groups.filter(item => !item.title.includes('Rates'));
    return routeHero('A little clarity for your first step.','Frequently asked questions about therapy, our practice, and session rates.','FAQ & rates') + `<section class="page-section"><div class="shell"><div class="faq-page"><p class="faq-intro">Therapy is an investment in yourself and in your relationships. Therapy can make all the difference when you are feeling stuck, lost, or hopeless.</p>${accordion(other)}<h2>Session rates</h2><p class="faq-intro">Fees vary by provider and based on the services provided. All sessions are 45–50 minutes unless otherwise specified. Longer sessions are available at a pro-rated fee upon request.</p>${accordion(rates)}<div style="margin-top:35px">${link('Talk with our team','contact-a-therapist')}</div></div></div></section>${cta()}`;
  }

  function contactPage() {
    const page = data.pages['contact-a-therapist'];
    const contactBody = page.html.replace('<h2>Contact a Therapist in Houston</h2>', '').replace('you can use the form below.', 'you can email our team using the link on this page.').replace('Or fill out the form above', 'Or email contact@wilsoncounseling.org');
    const officeImage = page.images.find(item => /office/i.test(item.source))?.src || page.images[1]?.src;
    return routeHero("You don't need the perfect words.",'No pressure. Just a conversation. Reach out to Wilson Counseling in Houston or from anywhere in Texas.','Contact us') + `<section class="page-section"><div class="shell contact-layout"><div><div class="contact-panel"><h2>Let's find your<br><em>way forward.</em></h2><div class="contact-option"><span class="icon-circle">${icon('phone')}</span><div><h3>Call or text</h3><a href="tel:+17135650922">713-565-0922</a><p><a href="sms:+17135650922" style="font-size:11px">Send a text message ↗</a></p></div></div><div class="contact-option"><span class="icon-circle">${icon('mail')}</span><div><h3>Email our team</h3><a href="mailto:contact@wilsoncounseling.org">contact@wilsoncounseling.org</a><p>We’ll respond within one business day.</p></div></div><div class="contact-option"><span class="icon-circle">${icon('pin')}</span><div><h3>Our Houston office</h3><address>6575 West Loop South, Suite 160<br>Bellaire, TX 77401</address><p>Free parking available on-site.</p></div></div>${bookButton('Book my appointment')}</div>${officeImage ? image(officeImage,'The Wilson Counseling office in Bellaire, Texas','contact-photo') : ''}</div><div class="article-copy">${localize(contactBody)}<p class="local-form-note">To send a message from this local preview, use the email or text links above. Appointment scheduling opens our secure Jane booking site.</p></div></div></section>${cta()}`;
  }

  function resourcesPage() {
    const resources = [
      ['Self tests','A resource that can help you see if you would benefit from counseling are our self-assessments.','self-tests','sun'],
      ['The Wilson Counseling journal','Articles on relationships, anxiety, healing, and the things that matter to you.','wilson-counseling-blog','book'],
      ['6 Keys Audiobook',plain(data.pages['6-keys-audiobook']?.description || '').slice(0,240),'6-keys-audiobook','heart'],
      ['Our YouTube channel','Hear directly from Wilson Counseling. Explore videos about therapy and well-being.','https://www.youtube.com/channel/UC1YAqgWws0P1zokcpbZwOpA','screen'],
      ['Make a referral','Connect someone with Wilson Counseling.','make-a-referral','chat'],
      ['FAQ & rates','Find answers to your questions about counseling, session rates, insurance, and getting started.','faq','sprout']
    ];
    return routeHero('A little guidance goes a long way.','Resources from Wilson Counseling to help you understand yourself and take your next step.','Helpful resources') + `<section class="page-section"><div class="shell resource-grid">${resources.map(([title,text,path,ico]) => `<article class="resource-card"><div class="resource-icon">${icon(ico)}</div><h2>${title}</h2><p>${escape(text)}</p>${path.startsWith('https') ? `<a class="text-link" href="${path}" target="_blank" rel="noopener">Watch our videos <span aria-hidden="true">↗</span></a>` : link('Explore this resource',path)}</article>`).join('')}</div></section>${cta()}`;
  }

  function journalPage() {
    return routeHero('Words for wherever you are.','Perspectives from Wilson Counseling on relationships, mental health, and finding a way forward.','The journal') + `<section class="page-section journal-page"><div class="shell"><div class="journal-search"><label class="search-field"><span aria-hidden="true">⌕</span><input id="journal-search" type="search" placeholder="Search the journal…" aria-label="Search local journal articles"></label></div><div class="journal-grid" id="journal-results" aria-live="polite">${journalCards(data.posts)}</div></div></section>${cta()}`;
  }

  function referralPage() {
    return routeHero('Help someone take their next step.','','Make a referral') + `<section class="page-section"><div class="shell contact-layout"><div class="article-copy"><h2>Make a referral</h2><p>Contact Wilson Counseling to connect someone with a therapist in Houston or throughout Texas.</p><p><a href="mailto:contact@wilsoncounseling.org?subject=Referral%20inquiry">Email contact@wilsoncounseling.org</a><br><a href="tel:+17135650922">Call 713-565-0922</a></p><p>For the original practice’s referral form, use the link below.</p><a class="text-link" href="https://www.wilsoncounseling.org/make-a-referral" target="_blank" rel="noopener">Open the original referral form <span aria-hidden="true">↗</span></a></div><div class="sidebar-card"><h3>A good fit matters.</h3><p>Get to know our team before making a referral.</p>${link('Meet our therapists','our-therapists')}</div></div></section>${cta()}`;
  }

  function localize(html) {
    const dom = fragment(html);
    $$('script,style,iframe,form',dom).forEach(el => el.remove());
    $$('*',dom).forEach(el => {
      [...el.attributes].filter(attr => /^on/i.test(attr.name)).forEach(attr => el.removeAttribute(attr.name));
    });
    $$('a',dom).forEach(a => {
      const href = a.getAttribute('href') || '';
      if (/^javascript:/i.test(href)) { a.removeAttribute('href'); return; }
      try {
        const url = new URL(href, 'https://www.wilsoncounseling.org');
        const path = decodeURIComponent(url.pathname.replace(/^\/|\/$/g,''));
        if (url.hostname.replace(/^www\./,'') === 'wilsoncounseling.org' && (data.pages[path] || ['services','our-therapists',''].includes(path))) {
          a.href = route(path);
        } else if (url.protocol === 'https:' || url.protocol === 'http:') {
          a.href = url.href;
          a.target = '_blank';
          a.rel = 'noopener';
        }
      } catch { a.removeAttribute('href'); }
    });
    const box = document.createElement('div');box.append(dom);return box.innerHTML;
  }

  function sidebar(path) {
    const related = allServices.filter(service => service.path !== path && service.group === categoryFor(path)).slice(0,5);
    return `<aside class="article-sidebar"><div class="sidebar-sticky"><div class="sidebar-card">${eyebrow('Here for you')}<h3>You don't have<br>to do this alone.</h3><p>Counseling in person in Houston and online throughout Texas.</p>${bookButton('Get started')}</div><div class="sidebar-links"><h4 class="sidebar-title">${related.length ? 'EXPLORE RELATED CARE' : 'YOUR NEXT STEP'}</h4>${related.length ? related.map(service => `<a href="${route(service.path)}">${escape(service.label)} <span aria-hidden="true">↗</span></a>`).join('') : `<a href="#/our-therapists">Meet our therapists ↗</a><a href="#/services">Explore our services ↗</a><a href="#/faq">FAQ & rates ↗</a>`}</div></div></aside>`;
  }

  function contentPage(path) {
    const page = data.pages[path];
    if (!page) return routeHero('Let’s help you find your way.','This page is not included in the local preview.','Wilson Counseling') + `<div class="shell page-section">${link('Explore all services','services')}</div>`;
    const therapist = therapists.find(t => t.path === path);
    const isArticle = path.startsWith('wilson-counseling-blog/');
    const title = therapist?.name || (isArticle ? page.title : page.label);
    const label = therapist ? 'Our therapists' : isArticle ? articleCategory(path) : categoryFor(path);
    const description = therapist ? `${therapist.credentials} · ${therapist.focus} · Houston, Texas` : isArticle ? '' : plain(page.description).slice(0,240);
    const cover = therapist ? page.images[1]?.src : page.images[0]?.src;
    let body = page.html;
    // The first heading is already presented in the page hero.
    const dom = fragment(body);
    const heading = $('h1,h2',dom);
    if (heading && (plain(heading.outerHTML).toLowerCase() === page.title.toLowerCase() || therapist)) heading.remove();
    const box=document.createElement('div');box.append(dom);body=box.innerHTML;
    const extraLinks = (page.links || []).filter(item => !/schedule|appointment|contact|begin|learn more/i.test(item.title));
    const gallery = !isArticle && !therapist ? page.images.filter(item => item.src !== cover && !/\/(\d+|image-asset)\.(png|jpeg)/i.test(item.source)).slice(0,2) : [];
    const resourceNote = path === 'self-tests' ? `<p>Online assessment forms open on the original website.</p><a class="text-link" href="https://www.wilsoncounseling.org/self-tests" target="_blank" rel="noopener">Open self-assessments <span aria-hidden="true">↗</span></a>` : '';
    return routeHero(title,description,label,cover || '') + `<div class="shell article-layout"><article class="article-copy">${localize(body)}${page.accordions?.length ? accordion(page.accordions) : ''}${resourceNote}${extraLinks.length ? `<div class="article-links">${localize(extraLinks.map(item => `<a href="${escape(item.url)}">${escape(item.title)} ↗</a>`).join(''))}</div>` : ''}${gallery.length ? `<div class="article-gallery">${gallery.map(item => image(item.src,item.alt || title)).join('')}</div>` : ''}${isArticle ? `<div style="margin-top:40px">${link('Back to the journal','wilson-counseling-blog')}</div>` : ''}</article>${sidebar(path)}</div>${cta()}`;
  }

  function closeMenus() {
    $$('.nav-dropdown button[aria-expanded="true"]').forEach(button => { button.setAttribute('aria-expanded','false');$('#'+button.getAttribute('aria-controls')).hidden=true; });
    $('.menu-toggle').setAttribute('aria-expanded','false');
    $('.menu-toggle').setAttribute('aria-label','Open navigation');
    $('#mobile-menu').hidden=true;
  }

  function initReveals() {
    observer?.disconnect();
    if (!('IntersectionObserver' in window) || motionQuery.matches) return;
    document.documentElement.classList.add('js-motion');
    observer=new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.07});
    $$('.reveal').forEach(el => observer.observe(el));
  }

  function getPath() {
    if (!location.hash.startsWith('#/')) return '';
    try {return decodeURIComponent(location.hash.slice(2).replace(/\/$/,''));}catch{return '';}
  }

  function render() {
    if (location.hash && !location.hash.startsWith('#/')) return;
    const path=getPath();
    closeMenus();
    const pages = {'':home,'services':servicesPage,'our-therapists':therapistsPage,'faq':faqPage,'contact-a-therapist':contactPage,'resources':resourcesPage,'wilson-counseling-blog':journalPage,'make-a-referral':referralPage};
    main.innerHTML=(pages[path] || (()=>contentPage(path)))();
    main.classList.remove('route-enter');
    void main.offsetWidth;
    main.classList.add('route-enter');
    const title = path === '' ? 'A little support. A way forward.' : data.nav[path] || ({services:'Our services','our-therapists':'Our therapists'}[path]) || 'Wilson Counseling';
    document.title=`${title} — Wilson Counseling`;
    $$('.desktop-nav>a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===route(path)));
    if (path!==lastRoute || location.hash.startsWith('#/')) {window.scrollTo({top:0,behavior:'instant'}); main.focus({preventScroll:true});}
    lastRoute=path;
    initReveals();
    updateScroll();
  }

  function updateScroll() {
    const height=document.documentElement.scrollHeight-innerHeight;
    const progress=height>0?Math.min(1,Math.max(0,scrollY/height)):0;
    $('.reading-progress').style.transform=`scaleX(${progress})`;
    $('.site-header').classList.toggle('scrolled',scrollY>30);
    $('.back-top').hidden=scrollY<650;
  }
  let frame=0;
  addEventListener('scroll',()=>{if(!frame){frame=requestAnimationFrame(()=>{updateScroll();frame=0;});}},{passive:true});
  addEventListener('hashchange',render);
  addEventListener('resize',()=>{if(innerWidth>960 && !$('#mobile-menu').hidden)closeMenus();updateScroll();});
  motionQuery.addEventListener?.('change',()=>{document.documentElement.classList.toggle('js-motion',!motionQuery.matches);initReveals();});

  const dialog=$('#booking-dialog');
  function openBooking(button) {lastFocus=button;closeMenus();dialog.showModal();document.body.classList.add('modal-open');}
  function closeBooking(){dialog.close();}
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');lastFocus?.focus();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeBooking();}});
  $('.dialog-close',dialog).addEventListener('click',closeBooking);

  document.addEventListener('click',event=>{
    const book=event.target.closest('[data-book]');
    if(book){openBooking(book);return;}
    const video=event.target.closest('[data-video]');
    if(video && data.video){
      let player=$('#video-dialog');
      if(!player){player=document.createElement('dialog');player.id='video-dialog';player.className='video-dialog';player.setAttribute('aria-label','Finding the right therapist');player.innerHTML=`<button class="dialog-close" aria-label="Close video">×</button><video controls preload="metadata"><source src="${data.video}" type="video/mp4"></video>`;document.body.append(player);$('.dialog-close',player).onclick=()=>player.close();player.addEventListener('close',()=>{$('video',player).pause();document.body.classList.remove('modal-open');video.focus();});}
      player.showModal();document.body.classList.add('modal-open');$('video',player).play().catch(()=>{});return;
    }
    const filter=event.target.closest('[data-filter]');
    if(filter){$$('[data-filter]').forEach(button=>{const active=button===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});$('#home-service-grid').innerHTML=serviceCards(filter.dataset.filter);return;}
    const directoryFilter=event.target.closest('[data-directory-filter]');
    if(directoryFilter){$$('[data-directory-filter]').forEach(button=>{const active=button===directoryFilter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});$('#service-directory').innerHTML=directoryItems(directoryFilter.dataset.directoryFilter,$('#service-search').value);return;}
    const menuButton=event.target.closest('.nav-dropdown>button');
    if(menuButton){const open=menuButton.getAttribute('aria-expanded')!=='true';closeMenus();menuButton.setAttribute('aria-expanded',String(open));$('#'+menuButton.getAttribute('aria-controls')).hidden=!open;return;}
    if(event.target.closest('.menu-toggle')){const open=$('.menu-toggle').getAttribute('aria-expanded')!=='true';closeMenus();$('.menu-toggle').setAttribute('aria-expanded',String(open));$('.menu-toggle').setAttribute('aria-label',open?'Close navigation':'Open navigation');$('#mobile-menu').hidden=!open;return;}
    if(!event.target.closest('.nav-dropdown,#mobile-menu'))closeMenus();
    const anchor=event.target.closest('a');
    if(anchor?.getAttribute('href')==='#care'){event.preventDefault();$('#care')?.scrollIntoView({behavior:motionQuery.matches?'instant':'smooth'});}
    if(event.target.closest('.back-top'))window.scrollTo({top:0,behavior:motionQuery.matches?'instant':'smooth'});
  });

  document.addEventListener('input',event=>{
    if(event.target.id==='service-search')$('#service-directory').innerHTML=directoryItems($('[data-directory-filter].active')?.dataset.directoryFilter || 'All services',event.target.value);
    if(event.target.id==='journal-search'){
      const term=event.target.value.toLowerCase().trim();
      const results=data.posts.filter(path=>`${data.pages[path]?.title} ${articleCategory(path)}`.toLowerCase().includes(term));
      $('#journal-results').innerHTML=results.length?journalCards(results):'<p class="empty-results">No matching articles. Try another search.</p>';
    }
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'){const open=$('.nav-dropdown button[aria-expanded="true"]') || ($('.menu-toggle').getAttribute('aria-expanded')==='true' ? $('.menu-toggle') : null);closeMenus();open?.focus();}});

  footer();
  render();
})();
