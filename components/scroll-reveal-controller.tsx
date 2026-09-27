'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(
      new Set([
        ...document.querySelectorAll<HTMLElement>(
          '[data-scroll-reveal-candidate]',
        ),
        ...document.querySelectorAll<HTMLElement>('.case-study .legacy-media'),
      ]),
    );

    if (!targets.length) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    targets.forEach((target) => target.classList.add('scroll-reveal-item'));

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-scroll-revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add('is-scroll-revealed');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.12,
      },
    );

    let observeFrame = 0;
    const setupFrame = window.requestAnimationFrame(() => {
      observeFrame = window.requestAnimationFrame(() => {
        targets.forEach((target) => observer.observe(target));
      });
    });

    return () => {
      window.cancelAnimationFrame(setupFrame);
      window.cancelAnimationFrame(observeFrame);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
