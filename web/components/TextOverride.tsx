'use client';

import { useEffect } from 'react';

export default function TextOverride() {
  useEffect(() => {
    const oldText = 'OUR CUSTOMERS ARE CELEBRITIES FOR US';
    const newText = 'EVERY CLIENT IS A CELEBRITY';

    const replaceText = () => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
      );

      let node;

      while ((node = walker.nextNode())) {
        if (node.textContent?.trim() === oldText) {
          node.textContent = newText;
        }
      }
    };

    replaceText();

    const observer = new MutationObserver(replaceText);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
