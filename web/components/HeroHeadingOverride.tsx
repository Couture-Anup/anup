'use client';

import { useEffect } from 'react';

export default function HeroHeadingOverride() {
  useEffect(() => {
    const TARGET_TEXT = "DON'T DESIGN CLOTHES. WE DESIGN HAPPINESS.";

    const normalize = (text: string) =>
      text
        .replace(/[’‘]/g, "'")
        .replace(/\s+/g, ' ')
        .trim()
        .toUpperCase();

    const moveHeroHeading = () => {
      /* Already created */
      if (document.getElementById('hero-heading-below-image')) {
        return;
      }

      const headings = Array.from(
        document.querySelectorAll<HTMLElement>('h1, h2, h3')
      );

      const targetHeading = headings.find((heading) => {
        const text = normalize(heading.innerText || '');

        return (
          text.includes(TARGET_TEXT) ||
          (
            text.includes("DON'T DESIGN CLOTHES") &&
            text.includes('WE DESIGN HAPPINESS')
          )
        );
      });

      if (!targetHeading) return;

      /* -------------------------------------------------
         FIND HERO SECTION
      ------------------------------------------------- */

      let heroSection: HTMLElement | null =
        targetHeading.parentElement;

      let levels = 0;

      while (heroSection && levels < 8) {
        const hasImage =
          heroSection.querySelector('img') !== null;

        const sectionText = normalize(
          heroSection.innerText || ''
        );

        const hasShopNow =
          sectionText.includes('SHOP NOW');

        if (hasImage && hasShopNow) {
          break;
        }

        heroSection = heroSection.parentElement;
        levels++;
      }

      if (!heroSection) return;

      /* -------------------------------------------------
         HIDE ORIGINAL OVERLAY HEADING ONLY
      ------------------------------------------------- */

      targetHeading.style.display = 'none';

      /* -------------------------------------------------
         CREATE NEW HEADING BELOW HERO IMAGE
      ------------------------------------------------- */

      const headingSection =
        document.createElement('section');

      headingSection.id =
        'hero-heading-below-image';

      headingSection.style.width = '100%';
      headingSection.style.background = '#ffffff';
      headingSection.style.padding =
        '28px 20px 30px';
      headingSection.style.textAlign = 'center';
      headingSection.style.boxSizing = 'border-box';

      /* HEADING */

      const newHeading =
        document.createElement('h1');

      newHeading.textContent =
        "Don't Design Clothes. We Design Happiness.";

      newHeading.style.margin = '0';
      newHeading.style.padding = '0';

      newHeading.style.fontFamily =
        '"Times New Roman", Times, serif';

      newHeading.style.fontWeight = '700';

      newHeading.style.fontSize =
        'clamp(26px, 3vw, 46px)';

      newHeading.style.lineHeight = '1.15';

      newHeading.style.letterSpacing =
        '0.01em';

      newHeading.style.color = '#111111';

      headingSection.appendChild(newHeading);

      /* -------------------------------------------------
         INSERT JUST AFTER HERO
      ------------------------------------------------- */

      heroSection.insertAdjacentElement(
        'afterend',
        headingSection
      );
    };

    /* RUN FIRST TIME */
    moveHeroHeading();

    /* Website content may load later */
    const timers = [
      setTimeout(moveHeroHeading, 300),
      setTimeout(moveHeroHeading, 800),
      setTimeout(moveHeroHeading, 1500),
      setTimeout(moveHeroHeading, 2500),
    ];

    /* Detect dynamically loaded hero */
    const observer = new MutationObserver(() => {
      moveHeroHeading();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return null;
}
