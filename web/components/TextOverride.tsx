'use client';

import { useEffect } from 'react';

export default function TextOverride() {
  useEffect(() => {
    const OLD_TEXT = 'OUR CUSTOMERS ARE CELEBRITIES FOR US';
    const NEW_TEXT = 'EVERY CLIENT IS A CELEBRITY';

    const normalize = (value: string) =>
      value.replace(/\s+/g, ' ').trim().toUpperCase();

    const replaceText = () => {
      const allElements = Array.from(
        document.querySelectorAll<HTMLElement>('body *')
      );

      for (const element of allElements) {
        const fullText = normalize(element.innerText || '');

        if (fullText === OLD_TEXT) {
          element.innerHTML = NEW_TEXT;
          return;
        }
      }

      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );

      let node: Node | null;

      while ((node = walker.nextNode())) {
        const text = node.textContent || '';

        if (normalize(text).includes(OLD_TEXT)) {
          node.textContent = text.replace(
            /OUR\s+CUSTOMERS\s+ARE\s+CELEBRITIES\s+FOR\s+US/gi,
            NEW_TEXT
          );
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
