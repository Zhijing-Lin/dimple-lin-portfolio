'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronLeft, RotateCcw, X } from 'lucide-react';
import { projectDetailBySlug } from '@/lib/project-details';

type ProjectLink = {
  title: string;
  href: string;
  image?: string;
  external?: boolean;
  label?: string;
};

type ToolKey =
  | 'storyline'
  | 'captivate'
  | 'torus'
  | 'dot'
  | 'camtasia'
  | 'notion'
  | 'vyond'
  | 'analysis';

type ToolGroup = {
  label: string;
  secondary?: string;
  projects: ProjectLink[];
};

type Screen =
  | { kind: 'root' }
  | { kind: 'areas' }
  | { kind: 'area'; key: keyof typeof projectAreas }
  | { kind: 'tools' }
  | { kind: 'tool'; key: ToolKey };

function project(slug: string, image?: string): ProjectLink {
  const item = projectDetailBySlug[slug];
  return {
    title: item.title,
    href: `/projects/${item.slug}`,
    image: image ?? item.cover,
  };
}

const dotAI: ProjectLink = {
  title: 'Designing Just-in-Time AI Support with DOT AI',
  href: '/projects#dot-ai',
  image: '/projects/covers-refined/dot-ai.webp',
};

const tutorialSupport: ProjectLink = {
  title: 'From Tutorial Videos to Continuous Performance Support',
  href: '/projects#oli-support',
  image: '/projects/covers-refined/continuous-support.webp',
};

const projectAreas = {
  strategy: {
    label: 'Strategy & Performance',
    anchor: '/projects#category-01',
    projects: [
      project('help-center'),
      project('reviewer-judgment'),
      {
        title: 'Open 4 Peer Review Hub',
        href: 'https://open4peerreview-maskd-three.vercel.app/',
        image: '/projects/covers-hybrid/oer-review-workflow.png',
        external: true,
      },
    ],
  },
  interactive: {
    label: 'Interactive Learning',
    anchor: '/projects#category-02',
    projects: [
      project('ai-architecture'),
      project('survival-play'),
      project('nutrition-literacy'),
      project('interactive-coaching'),
    ],
  },
  ai: {
    label: 'AI & Learning Technology',
    anchor: '/projects#category-03',
    projects: [project('adaptive-ai-feedback'), dotAI],
  },
  evaluation: {
    label: 'Evaluation & Improvement',
    anchor: '/projects#category-04',
    projects: [project('learner-data'), tutorialSupport],
  },
};

const toolGroups: Record<ToolKey, ToolGroup> = {
  storyline: {
    label: 'Articulate Storyline',
    projects: [
      project('ai-architecture'),
      project('nutrition-literacy'),
      project('interactive-coaching'),
    ],
  },
  captivate: {
    label: 'Adobe Captivate',
    projects: [project('adaptive-ai-feedback')],
  },
  torus: {
    label: 'OLI Torus',
    projects: [project('reviewer-judgment'), dotAI],
  },
  dot: {
    label: 'DOT AI',
    projects: [dotAI],
  },
  camtasia: {
    label: 'Camtasia',
    projects: [tutorialSupport],
  },
  notion: {
    label: 'Notion',
    projects: [project('help-center')],
  },
  vyond: {
    label: 'Vyond',
    projects: [project('reviewer-judgment')],
  },
  analysis: {
    label: 'AI Analysis Tools',
    secondary: 'ChatGPT · Claude Code',
    projects: [project('learner-data')],
  },
};

const starTrail = [
  ['59%', '16%', '0.55s', '0.66rem', '✦'],
  ['64%', '12%', '0.9s', '0.46rem', '✧'],
  ['69%', '10%', '1.2s', '0.72rem', '✦'],
  ['75%', '12%', '1.5s', '0.48rem', '✦'],
  ['81%', '17%', '1.82s', '0.64rem', '✧'],
  ['83%', '23%', '2.12s', '0.48rem', '✦'],
  ['79%', '29%', '2.46s', '0.7rem', '✦'],
  ['73%', '31%', '2.78s', '0.45rem', '✧'],
  ['67%', '29%', '3.12s', '0.62rem', '✦'],
  ['64%', '24%', '3.42s', '0.44rem', '✦'],
  ['68%', '20%', '3.72s', '0.66rem', '✧'],
  ['75%', '25%', '4.02s', '0.48rem', '✦'],
  ['80%', '34%', '4.34s', '0.7rem', '✦'],
  ['77%', '43%', '4.68s', '0.46rem', '✧'],
  ['77%', '53%', '5.02s', '0.62rem', '✦'],
  ['81%', '62%', '5.36s', '0.48rem', '✦'],
  ['83%', '70%', '5.72s', '0.68rem', '✧'],
  ['80%', '76%', '6.06s', '0.44rem', '✦'],
  ['85%', '75%', '6.38s', '0.64rem', '✦'],
  ['89%', '79%', '6.72s', '0.48rem', '✧'],
  ['91%', '85%', '7.08s', '0.7rem', '✦'],
  ['93%', '90%', '7.4s', '0.46rem', '✦'],
] as const;

function ProjectCards({
  items,
  eyebrow,
}: {
  items: ProjectLink[];
  eyebrow: string;
}) {
  return (
    <div className="dbee-project-grid">
      {items.map((item) => (
        <Link
          className="dbee-project-card"
          href={item.href}
          key={item.title}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noreferrer' : undefined}
        >
          {item.image ? (
            <Image src={item.image} alt="" width={640} height={372} />
          ) : null}
          <span className="dbee-project-card-copy">
            <small>{item.label ?? eyebrow}</small>
            <strong>{item.title}</strong>
            <ArrowUpRight size={16} aria-hidden="true" />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function DBeeNavigator() {
  const pathname = usePathname();
  return <DBeeNavigatorView key={pathname} isHome={pathname === '/'} />;
}

function DBeeNavigatorView({ isHome }: { isHome: boolean }) {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>({ kind: 'root' });

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  const goBack = () => {
    if (screen.kind === 'area') setScreen({ kind: 'areas' });
    else if (screen.kind === 'tool') setScreen({ kind: 'tools' });
    else setScreen({ kind: 'root' });
  };

  return (
    <>
      {isHome ? (
        <div
          className={`dbee-star-trail${open ? ' is-hidden' : ''}`}
          aria-hidden="true"
        >
          {starTrail.map(([left, top, delay, size, glyph], index) => (
            <span
              className="dbee-trail-star"
              key={`${left}-${top}`}
              style={{
                left,
                top,
                fontSize: size,
                animationDelay: delay,
                animationDuration: `${2.15 + (index % 4) * 0.18}s`,
              }}
            >
              {glyph}
            </span>
          ))}
        </div>
      ) : null}

      <div
        className={`dbee-shell ${isHome ? 'is-home' : 'is-static'}${open ? ' is-open' : ''}`}
      >
        {open ? (
          <button
            className="dbee-backdrop"
            type="button"
            aria-label="Close D-Bee portfolio navigator"
            onClick={() => setOpen(false)}
          />
        ) : null}

        <div className="dbee-content">
          {open ? (
            <dialog
              open
              className="dbee-panel"
              id="dbee-navigator"
              aria-label="D-Bee portfolio navigator"
            >
              <header className="dbee-panel-header">
                <div>
                  <span>D-Bee / Portfolio guide</span>
                  <strong>Hi, I’m D-Bee.</strong>
                </div>
                <button
                  type="button"
                  aria-label="Close D-Bee portfolio navigator"
                  onClick={() => setOpen(false)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </header>

              <div className="dbee-panel-body">
                {screen.kind === 'root' ? (
                  <>
                    <p>
                      I can help you explore Dimple’s work. How would you like
                      to browse?
                    </p>
                    <div className="dbee-choice-list">
                      <button
                        type="button"
                        onClick={() => setScreen({ kind: 'areas' })}
                      >
                        Browse by Project Area
                      </button>
                      <button
                        type="button"
                        onClick={() => setScreen({ kind: 'tools' })}
                      >
                        Browse by Tool
                      </button>
                    </div>
                  </>
                ) : null}

                {screen.kind === 'areas' ? (
                  <>
                    <p>What kind of work would you like to explore?</p>
                    <div className="dbee-choice-list">
                      {Object.entries(projectAreas).map(([key, area]) => (
                        <button
                          type="button"
                          key={key}
                          onClick={() =>
                            setScreen({
                              kind: 'area',
                              key: key as keyof typeof projectAreas,
                            })
                          }
                        >
                          {area.label}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}

                {screen.kind === 'area' ? (
                  <>
                    <p className="dbee-result-title">
                      {projectAreas[screen.key].label}
                    </p>
                    <ProjectCards
                      items={projectAreas[screen.key].projects}
                      eyebrow={projectAreas[screen.key].label}
                    />
                    <Link
                      className="dbee-category-link"
                      href={projectAreas[screen.key].anchor}
                    >
                      View all {projectAreas[screen.key].label} projects
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </>
                ) : null}

                {screen.kind === 'tools' ? (
                  <>
                    <p>Looking for experience with a specific tool?</p>
                    <div className="dbee-choice-list dbee-tool-list">
                      {Object.entries(toolGroups).map(([key, tool]) => (
                        <button
                          type="button"
                          key={key}
                          onClick={() =>
                            setScreen({
                              kind: 'tool',
                              key: key as ToolKey,
                            })
                          }
                        >
                          <span>{tool.label}</span>
                          {tool.secondary ? (
                            <small>{tool.secondary}</small>
                          ) : null}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}

                {screen.kind === 'tool' ? (
                  <>
                    <p className="dbee-result-title">
                      {toolGroups[screen.key].label}
                    </p>
                    {toolGroups[screen.key].secondary ? (
                      <span className="dbee-secondary-label">
                        {toolGroups[screen.key].secondary}
                      </span>
                    ) : null}
                    <ProjectCards
                      items={toolGroups[screen.key].projects}
                      eyebrow={toolGroups[screen.key].label}
                    />
                  </>
                ) : null}
              </div>

              <footer className="dbee-panel-footer">
                {screen.kind !== 'root' ? (
                  <button type="button" onClick={goBack}>
                    <ChevronLeft size={15} aria-hidden="true" /> Back
                  </button>
                ) : null}
                {screen.kind !== 'root' ? (
                  <button
                    type="button"
                    onClick={() => setScreen({ kind: 'root' })}
                  >
                    <RotateCcw size={14} aria-hidden="true" /> Start Over
                  </button>
                ) : null}
                <Link href="/projects">
                  View All Projects{' '}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </footer>
            </dialog>
          ) : null}

          <span className="dbee-hover-bubble" aria-hidden="true">
            <span>Ask D-Bee</span>
            <span className="dbee-bubble-arrow">→</span>
          </span>
          <button
            className="dbee-button"
            type="button"
            aria-label="Open D-Bee portfolio navigator"
            aria-expanded={open}
            aria-controls="dbee-navigator"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="dbee-bee-visual" aria-hidden="true">
              <Image src="/home/dbee.png" alt="" width={86} height={86} />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
