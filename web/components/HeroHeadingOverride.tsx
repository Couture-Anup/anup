'use client';

import { useEffect } from 'react';

export default function HeroHeadingOverride() {
  useEffect(() => {
    const clean = (value = '') =>
      value
        .replace(/[’‘]/g, "'")
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase();

    const findAndMoveHeading = () => {
      const targetWords = [
        "don't design clothes",
        'we design happiness',
      ];

      /* =====================================================
         FIND THE SMALLEST ELEMENT CONTAINING THE HERO HEADING
      ===================================================== */

      const allElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          'h1, h2, h3, div, p, span'
        )
      );

      const matches = allElements.filter((el) => {
        const text = clean(el.innerText || el.textContent || '');

        return (
          targetWords.every((word) => text.includes(word)) &&
          text.length < 250
        );
      });

      if (!matches.length) return false;

      /* Choose the smallest matching element */
      const heading =
        matches.sort((a, b) => {
          const aText = clean(a.innerText || a.textContent || '');
          const bText = clean(b.innerText || b.textContent || '');

          return aText.length - bText.length;
        })[0];

      if (
        heading.dataset.heroHeadingMoved === 'true'
      ) {
        return true;
      }

      /* =====================================================
         FIND HERO CONTAINER
      ===================================================== */

      let hero: HTMLElement | null = heading;

      for (let i = 0; i < 10 && hero; i++) {
        const hasImage =
          hero.querySelector('img') !== null;

        const text = clean(
          hero.innerText || hero.textContent || ''
        );

        const hasShopNow =
          text.includes('shop now');

        if (hasImage && hasShopNow) {
          break;
        }

        hero = hero.parentElement;
      }

      if (!hero) return false;

      /* =====================================================
         MAKE SURE WE DON'T MOVE THE WHOLE HERO
      ===================================================== */

      if (heading === hero) {
        const possibleHeading = Array.from(
          hero.querySelectorAll<HTMLElement>(
            'h1, h2, h3, p, div'
          )
        ).find((el) => {
          const text = clean(
            el.innerText || el.textContent || ''
          );

          return (
            targetWords.every((word) =>
              text.includes(word)
            ) &&
            !el.querySelector('img') &&
            text.length < 250
          );
        });

        if (!possibleHeading) return false;

        moveHeading(possibleHeading, hero);

        return true;
      }

      moveHeading(heading, hero);

      return true;
    };

    /* =====================================================
       MOVE ACTUAL EXISTING HEADING BELOW HERO
    ===================================================== */

    const moveHeading = (
      heading: HTMLElement,
      hero: HTMLElement
    ) => {
      if (
        document.getElementById(
          'moved-hero-heading-wrapper'
        )
      ) {
        return;
      }

      const wrapper =
        document.createElement('div');

      wrapper.id =
        'moved-hero-heading-wrapper';

      wrapper.style.width = '100%';
      wrapper.style.background = '#ffffff';
      wrapper.style.textAlign = 'center';
      wrapper.style.padding =
        '28px 20px 30px';
      wrapper.style.boxSizing =
        'border-box';
      wrapper.style.position = 'relative';
      wrapper.style.zIndex = '5';

      /*
       Reset all overlay positioning from original heading
      */

      heading.style.position = 'static';
      heading.style.inset = 'auto';
      heading.style.top = 'auto';
      heading.style.bottom = 'auto';
      heading.style.left = 'auto';
      heading.style.right = 'auto';

      heading.style.transform = 'none';

      heading.style.width = '100%';
      heading.style.maxWidth = 'none';

      heading.style.margin = '0 auto';
      heading.style.padding = '0';

      heading.style.color = '#111111';

      heading.style.textAlign = 'center';

      heading.style.fontSize =
        'clamp(26px, 3vw, 46px)';

      heading.style.lineHeight = '1.15';

      heading.style.fontWeight = '700';

      heading.style.opacity = '1';
      heading.style.visibility = 'visible';
      heading.style.display = 'block';

      heading.style.background =
        'transparent';

      heading.style.textShadow = 'none';

      heading.dataset.heroHeadingMoved =
        'true';

      /*
       Move the EXISTING heading
      */

      wrapper.appendChild(heading);

      /*
       Add the wrapper after hero
      */

      hero.insertAdjacentElement(
        'afterend',
        wrapper
      );
    };

    /* =====================================================
       RUN AFTER DIFFERENT LOAD STAGES
    ===================================================== */

    findAndMoveHeading();

    const delays = [
      100,
      300,
      600,
      1000,
      1500,
      2500,
      4000,
    ];

    const timers = delays.map((delay) =>
      window.setTimeout(() => {
        findAndMoveHeading();
      }, delay)
    );

    /* =====================================================
       WATCH FOR DYNAMIC / SLIDER CONTENT
    ===================================================== */

    const observer = new MutationObserver(() => {
      findAndMoveHeading();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      timers.forEach((timer) =>
        clearTimeout(timer)
      );

      observer.disconnect();
    };
  }, []);

  return null;
}
