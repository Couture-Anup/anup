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

    const findTargetHeading = (): HTMLElement | null => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          'h1, h2, h3, h4, p, div, span'
        )
      );

      const matches = elements.filter((el) => {
        const text = clean(el.innerText || el.textContent || '');

        return (
          text.includes("don't design clothes") &&
          text.includes('we design happiness') &&
          text.length < 300
        );
      });

      if (!matches.length) return null;

      matches.sort((a, b) => {
        const aText = clean(a.innerText || a.textContent || '');
        const bText = clean(b.innerText || b.textContent || '');

        return aText.length - bText.length;
      });

      return matches[0];
    };

    const findHeroSection = (
      heading: HTMLElement
    ): HTMLElement | null => {
      let current: HTMLElement | null = heading.parentElement;

      for (let i = 0; i < 12 && current; i++) {
        const images = current.querySelectorAll('img');

        if (images.length > 0) {
          return current;
        }

        current = current.parentElement;
      }

      return null;
    };

    const moveHeading = () => {
      if (
        document.getElementById(
          'hero-heading-below-image-wrapper'
        )
      ) {
        return true;
      }

      const heading = findTargetHeading();

      if (!heading) return false;

      const heroSection = findHeroSection(heading);

      if (!heroSection) return false;

      const wrapper = document.createElement('div');

      wrapper.id = 'hero-heading-below-image-wrapper';

      wrapper.style.width = '100%';
      wrapper.style.backgroundColor = '#ffffff';
      wrapper.style.padding = '28px 16px 32px';
      wrapper.style.textAlign = 'center';
      wrapper.style.boxSizing = 'border-box';
      wrapper.style.position = 'relative';
      wrapper.style.zIndex = '10';

      /*
       RESET ORIGINAL OVERLAY STYLES
      */

      heading.style.position = 'relative';

      heading.style.top = 'auto';
      heading.style.right = 'auto';
      heading.style.bottom = 'auto';
      heading.style.left = 'auto';

      heading.style.inset = 'auto';

      heading.style.transform = 'none';

      heading.style.width = '100%';
      heading.style.maxWidth = '1200px';

      heading.style.margin = '0 auto';
      heading.style.padding = '0';

      heading.style.display = 'block';

      heading.style.opacity = '1';
      heading.style.visibility = 'visible';

      heading.style.color = '#111111';

      heading.style.textAlign = 'center';

      heading.style.fontSize =
        'clamp(24px, 3vw, 44px)';

      heading.style.lineHeight = '1.2';

      heading.style.fontWeight = '600';

      heading.style.textShadow = 'none';

      heading.style.background = 'transparent';

      /*
       Remove classes that may force absolute positioning
      */

      heading.classList.remove(
        'absolute',
        'fixed',
        'top-0',
        'bottom-0',
        'left-0',
        'right-0',
        'inset-0',
        'text-white'
      );

      /*
       MOVE REAL HEADING
      */

      wrapper.appendChild(heading);

      /*
       PLACE AFTER HERO SECTION
      */

      heroSection.insertAdjacentElement(
        'afterend',
        wrapper
      );

      return true;
    };

    /*
     RUN IMMEDIATELY
    */

    moveHeading();

    /*
     RUN AGAIN AFTER PAGE LOAD
    */

    const timers = [
      100,
      300,
      600,
      1000,
      1500,
      2500,
      4000,
      6000,
    ].map((delay) =>
      window.setTimeout(() => {
        moveHeading();
      }, delay)
    );

    /*
     WATCH SANITY / DYNAMIC CONTENT
    */

    const observer = new MutationObserver(() => {
      moveHeading();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      timers.forEach((timer) =>
        window.clearTimeout(timer)
      );

      observer.disconnect();
    };
  }, []);

  return null;
}
