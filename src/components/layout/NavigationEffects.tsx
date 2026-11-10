'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function NavigationEffects() {
  const pathname = usePathname();
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest('a[href]');
      if (!link || link.getAttribute('target') === '_blank') return;
      const destination = new URL(link.getAttribute('href')!, window.location.href);
      if (destination.origin !== window.location.origin) return;
      // Next handles route navigation; same-route links also reset accordion/scroll state.
      if (destination.pathname === window.location.pathname) {
        requestAnimationFrame(() => {
          window.dispatchEvent(new Event('triways:navigate'));
          if (!destination.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
