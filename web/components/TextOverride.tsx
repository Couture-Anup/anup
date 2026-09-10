'use client';

import { useEffect } from 'react';

export default function TextOverride() {
  useEffect(() => {
    const OLD_TEXT = 'OUR CUSTOMERS ARE CELEBRITIES FOR US';
    const NEW_TEXT = 'Every Customer Is a Celebrity to Us !';

    const normalize = (value: string) =>
      value.replace(/\s+/g, ' ').trim().toUpperCase();

    const replaceText = () => {
      const allElements = Array.from(
        document.querySelectorAll<HTMLElement>('body *')
      );

      for (const element of allElements) {
        const fullText = normalize(element.innerText || '');

        if (fullText === OLD_TEXT) {
          element.textContent = NEW_TEXT;

          // PREMIUM BOLD STYLE
          element.style.fontWeight = '700';
          element.style.letterSpacing = '0.03em';

          return;
        }
      }
    };

    replaceText();

    const timers = [
      setTimeout(replaceText, 500),
      setTimeout(replaceText, 1500),
      setTimeout(replaceText, 3000),
    ];

    const observer = new MutationObserver(replaceText);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      timers.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  return null;
}
