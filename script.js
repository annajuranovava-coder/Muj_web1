/* script.js – Anna Juranová | Homepage Interactivity */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     1. SCROLL-REVEAL – fade-in při scrollu
  ============================================================ */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
          // Timeline dot se při reveal animaci posune – čáru přepočítáme až doanimuje
          if (entry.target.classList.contains('timeline__item')) {
            setTimeout(setTimelineLineBounds, 750);
          }
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Stagger delay pro karty vedle sebe
    el.style.transitionDelay = `${Math.min(i % 4 * 0.1, 0.35)}s`;
    revealObserver.observe(el);
  });


  /* ============================================================
     2. NAVBAR – přidá třídu 'scrolled' po 60 px
  ============================================================ */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ============================================================
     3. HAMBURGER MENU
  ============================================================ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Zavřít kliknutím mimo menu
    document.addEventListener('click', (e) => {
      if (
        navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  /* ============================================================
     4. FAQ ACCORDION – animovaný rozbalovací seznam
  ============================================================ */
  document.querySelectorAll('.accordion-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item   = header.closest('.accordion-item');
      const body   = item.querySelector('.accordion-body');
      const isOpen = header.getAttribute('aria-expanded') === 'true';

      // Zavřít ostatní v tomtéž sloupci
      const column = item.closest('.faq__col');
      if (column) {
        column.querySelectorAll('.accordion-item').forEach((other) => {
          if (other !== item) {
            other.querySelector('.accordion-header')
                 .setAttribute('aria-expanded', 'false');
            other.querySelector('.accordion-body')
                 .classList.remove('open');
          }
        });
      }

      header.setAttribute('aria-expanded', String(!isOpen));
      body.classList.toggle('open', !isOpen);
    });
  });


  /* ============================================================
     5. GOOGLE ANALYTICS – načte se, jen když uživatel povolí
        analytické cookies (viz sekce 5b níže)
  ============================================================ */
  const GA_MEASUREMENT_ID = 'G-6XY39G09GY';

  function loadGoogleAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }

  if (localStorage.getItem('cookie-analytics') === 'true') {
    loadGoogleAnalytics();
  }


  /* ============================================================
     5b. COOKIE BAR
  ============================================================ */
  const cookieBar       = document.getElementById('cookie-bar');
  const cookieAccept    = document.getElementById('cookie-accept');
  const cookieReject    = document.getElementById('cookie-reject');
  const cookieSettings  = document.getElementById('cookie-settings');

  const cookieModal          = document.getElementById('cookie-modal');
  const cookieModalOverlay   = document.getElementById('cookie-modal-overlay');
  const cookieModalClose     = document.getElementById('cookie-modal-close');
  const cookieModalSave      = document.getElementById('cookie-modal-save');
  const cookieModalAcceptAll = document.getElementById('cookie-modal-accept-all');
  const cookieAnalyticsToggle = document.getElementById('cookie-analytics-toggle');

  // Zobraz ihned po načtení, pokud ještě nepadlo rozhodnutí
  if (cookieBar && !localStorage.getItem('cookie-consent')) {
    cookieBar.classList.remove('hidden');
  }

  const hideCookieBar = (decision, analyticsAllowed) => {
    localStorage.setItem('cookie-consent', decision);
    localStorage.setItem('cookie-analytics', analyticsAllowed ? 'true' : 'false');
    if (analyticsAllowed) loadGoogleAnalytics();
    cookieBar?.classList.add('hidden');
  };

  cookieAccept?.addEventListener('click', () => hideCookieBar('accepted', true));
  cookieReject?.addEventListener('click', () => hideCookieBar('rejected', false));

  if (cookieModal && cookieAnalyticsToggle) {
    const openModal = () => {
      cookieAnalyticsToggle.checked = localStorage.getItem('cookie-analytics') === 'true';
      cookieModal.classList.remove('hidden');
    };
    const closeModal = () => cookieModal.classList.add('hidden');

    cookieSettings?.addEventListener('click', openModal);
    cookieModalClose?.addEventListener('click', closeModal);
    cookieModalOverlay?.addEventListener('click', closeModal);

    cookieModalSave?.addEventListener('click', () => {
      hideCookieBar('customized', cookieAnalyticsToggle.checked);
      closeModal();
    });
    cookieModalAcceptAll?.addEventListener('click', () => {
      cookieAnalyticsToggle.checked = true;
      hideCookieBar('accepted', true);
      closeModal();
    });
  }


  /* ============================================================
     6. SMOOTH SCROLL – fallback pro starší prohlížeče
  ============================================================ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const navH = navbar ? navbar.offsetHeight : 0;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* ============================================================
     7. MICRO-INTERAKCE – parallax na hero blobs při pohybu myši
  ============================================================ */
  const heroSection = document.getElementById('hero');
  if (heroSection && window.matchMedia('(hover: hover)').matches) {
    let rafId;
    heroSection.addEventListener('mousemove', (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;   // -0.5 až 0.5
        const y = (e.clientY - rect.top)  / rect.height - 0.5;

        const blobs = heroSection.querySelectorAll('.hero__watercolor');
        blobs.forEach((blob, i) => {
          const factor = (i + 1) * 14;
          blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      heroSection.querySelectorAll('.hero__watercolor').forEach((blob) => {
        blob.style.transform = '';
      });
    });
  }


  /* ============================================================
     7b. CALENDLY – otevře rezervaci jako popup místo nové záložky
     Skript se donačte až při prvním kliknutí (ne hned při načtení
     stránky), aby se cookies/tracking od Calendly nespouštěly
     bez souhlasu uživatele – viz cookie lišta (sekce 5b).
  ============================================================ */
  let calendlyWidgetPromise = null;

  function loadCalendlyWidget() {
    if (!calendlyWidgetPromise) {
      calendlyWidgetPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        script.onload = () => resolve();
        document.head.appendChild(script);
      });
    }
    return calendlyWidgetPromise;
  }

  document.querySelectorAll('.js-calendly-popup').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      loadCalendlyWidget().then(() => {
        window.Calendly.initPopupWidget({ url: link.href });
      });
    });
  });


  /* ============================================================
     8. CONTACT FORM – AJAX submit (bez přesměrování na Formspree)
  ============================================================ */
  const form        = document.getElementById('contact-form');
  const formSuccess = document.getElementById('contact-form-success');
  const formError   = document.getElementById('contact-form-error');

  if (form) {
    const submitBtn = form.querySelector('[type="submit"]');
    const btnLabel  = submitBtn ? submitBtn.textContent : '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot check
      const honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) return; // bot

      formError?.classList.add('hidden');
      if (submitBtn) {
        submitBtn.textContent = 'Odesílám...';
        submitBtn.disabled = true;
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });

        if (response.ok) {
          form.classList.add('hidden');
          formSuccess?.classList.remove('hidden');
          formSuccess?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          formError?.classList.remove('hidden');
        }
      } catch {
        formError?.classList.remove('hidden');
      } finally {
        if (submitBtn) {
          submitBtn.textContent = btnLabel;
          submitBtn.disabled = false;
        }
      }
    });
  }


  /* ============================================================
     9. ANIMACE čísel v badge (hero section)
  ============================================================ */
  const badges = document.querySelectorAll('.hero__badge-num');
  const badgeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.textContent, 10);
          if (isNaN(target)) return;
          let current = 0;
          const step  = Math.ceil(target / 20);
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            entry.target.textContent = current;
            if (current >= target) clearInterval(timer);
          }, 60);
          badgeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  badges.forEach((b) => badgeObserver.observe(b));


  /* ============================================================
     10. TIMELINE LINE – čára začíná/končí přesně u první/poslední ikony
  ============================================================ */
  function setTimelineLineBounds() {
    document.querySelectorAll('.timeline').forEach((timeline) => {
      const dots = timeline.querySelectorAll('.timeline__dot');
      if (dots.length < 2) return;

      // getBoundingClientRect() místo offsetTop: dokud se položka ještě
      // nezrevealovala, má transform: translateY(...), a ten dělá z ní
      // nový offsetParent pro její vlastní ikonku – offsetTop by se pak
      // měřil vůči špatnému prvku (samotné položce, ne vůči .timeline).
      const timelineRect = timeline.getBoundingClientRect();
      const firstRect = dots[0].getBoundingClientRect();
      const lastRect  = dots[dots.length - 1].getBoundingClientRect();

      const topOffset    = (firstRect.top + firstRect.height / 2) - timelineRect.top;
      const bottomOffset = timelineRect.bottom - (lastRect.top + lastRect.height / 2);

      timeline.style.setProperty('--timeline-line-top', `${topOffset}px`);
      timeline.style.setProperty('--timeline-line-bottom', `${bottomOffset}px`);
    });
  }

  const timelineEls = document.querySelectorAll('.timeline');
  if (timelineEls.length) {
    setTimelineLineBounds();
    window.addEventListener('load', setTimelineLineBounds);
    window.addEventListener('resize', setTimelineLineBounds);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setTimelineLineBounds);
    }

    // Nejspolehlivější pojistka: přepočítat při JAKÉKOLI změně výšky
    // timeline sekce (font se dotáhl, obsah karty se zalomil jinak, otočení telefonu…)
    if (typeof ResizeObserver !== 'undefined') {
      const timelineResizeObserver = new ResizeObserver(() => {
        setTimelineLineBounds();
      });
      timelineEls.forEach((el) => timelineResizeObserver.observe(el));
    }
  }

}); // end DOMContentLoaded
