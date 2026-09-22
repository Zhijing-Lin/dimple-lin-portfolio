'use client';

import { useEffect, useState } from 'react';

export type ProjectProgressItem = {
  label: string;
  targetId: string;
};

export function ProjectProgressNav({
  items,
}: {
  items: ProjectProgressItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const threshold = Math.min(260, window.innerHeight * 0.32);
      let nextIndex = 0;

      items.forEach((item, index) => {
        const target = document.getElementById(item.targetId);
        if (target && target.getBoundingClientRect().top <= threshold) {
          nextIndex = index;
        }
      });

      setActiveIndex((current) =>
        current === nextIndex ? current : nextIndex,
      );
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [items]);

  return (
    <div className="project-progress-shell">
      <nav className="project-progress-nav" aria-label="Project sections">
        <ol
          style={{
            gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
          }}
        >
          {items.map((item, index) => {
            const state =
              index === activeIndex
                ? 'is-current'
                : index < activeIndex
                  ? 'is-visited'
                  : 'is-upcoming';

            return (
              <li className={state} key={`${item.targetId}-${item.label}`}>
                <a
                  href={`#${item.targetId}`}
                  aria-current={index === activeIndex ? 'step' : undefined}
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{index + 1}</span>
                  <strong>{item.label}</strong>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
