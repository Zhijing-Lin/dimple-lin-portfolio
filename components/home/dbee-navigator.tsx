'use client';

import { useEffect, useState } from 'react';
import {
  Apple,
  ArrowUpRight,
  BarChart3,
  Bot,
  ChevronLeft,
  ClipboardCheck,
  Compass,
  LifeBuoy,
  MessageSquare,
  Network,
  RotateCcw,
  Sparkles,
  Video,
  Workflow,
  X,
  type LucideIcon,
} from 'lucide-react';
import { projectDetailBySlug } from '@/lib/project-details';

type ProjectLink = {
  title: string;
  href: string;
  image?: string;
  external?: boolean;
  label?: string;
  icon: LucideIcon;
};

type ToolKey =
  | 'storyline'
  | 'captivate'
  | 'torus'
  | 'dot'
  | 'camtasia'
  | 'notion'
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
  | { kind: 'tool'; key: ToolKey }
  | { kind: 'highlights' };

function project(slug: string, image?: string): ProjectLink {
  const item = projectDetailBySlug[slug];
  return {
    title: item.title,
    href: `/projects/${item.slug}`,
    image: image ?? item.cover,
    icon: projectIcons[slug],
  };
}

const projectIcons: Record<string, LucideIcon> = {
  'help-center': LifeBuoy,
  'reviewer-judgment': ClipboardCheck,
  'ai-architecture': Network,
  'survival-play': Compass,
  'nutrition-literacy': Apple,
  'interactive-coaching': MessageSquare,
  'adaptive-ai-feedback': Sparkles,
  'learner-data': BarChart3,
};

const dotAI: ProjectLink = {
  title: 'Designing Just-in-Time AI Support with DOT AI',
  href: '/projects#dot-ai',
  image: '/projects/covers/dot-ai.png',
  icon: Bot,
};

const tutorialSupport: ProjectLink = {
  title: 'From Tutorial Videos to Continuous Performance Support',
  href: '/projects#oli-support',
  image: '/projects/covers/continuous-support.png',
  icon: Video,
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
        icon: Workflow,
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
  analysis: {
    label: 'AI Analysis Tools',
    secondary: 'ChatGPT · Claude Code',
    projects: [project('learner-data')],
  },
};

const highlights = [
  {
    ...project('help-center', '/projects/covers-hybrid/needs-driven-help-center.png'),
    label: 'Performance Support',
  },
  {
    ...project('reviewer-judgment', '/projects/covers-hybrid/reviewer-judgment.png'),
    label: 'Learning Experience Design',
  },
  {
    ...project('ai-architecture', '/projects/covers-hybrid/ai-architecture.png'),
    label: 'AI + Simulation',
  },
  {
    ...project('learner-data', '/projects/covers-hybrid/learner-data.png'),
    label: 'Evaluation + Analytics',
  },
];

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

function ProjectList({ items }: { items: ProjectLink[] }) {
  return (
    <div className="dbee-project-list">
      {items.map((item) => {
        const ProjectIcon = item.icon;
        return (
          <a
            href={item.href}
            key={item.title}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noreferrer' : undefined}
          >
            <span className="dbee-project-icon" aria-hidden="true">
              <ProjectIcon size={16} strokeWidth={1.75} />
            </span>
            <span>{item.title}</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

export function DBeeNavigator() {
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

      <div className={`dbee-shell${open ? ' is-open' : ''}`}>
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
                  I can help you explore Dimple’s work. How would you like to
                  browse?
                </p>
                <div className="dbee-choice-list">
                  <button type="button" onClick={() => setScreen({ kind: 'areas' })}>
                    Browse by Project Area
                  </button>
                  <button type="button" onClick={() => setScreen({ kind: 'tools' })}>
                    Browse by Tool
                  </button>
                  <button
                    type="button"
                    onClick={() => setScreen({ kind: 'highlights' })}
                  >
                    Show Me the Highlights
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
                <p className="dbee-result-title">{projectAreas[screen.key].label}</p>
                <ProjectList items={projectAreas[screen.key].projects} />
                <a className="dbee-category-link" href={projectAreas[screen.key].anchor}>
                  View all {projectAreas[screen.key].label} projects
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
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
                      {tool.secondary ? <small>{tool.secondary}</small> : null}
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {screen.kind === 'tool' ? (
              <>
                <p className="dbee-result-title">{toolGroups[screen.key].label}</p>
                {toolGroups[screen.key].secondary ? (
                  <span className="dbee-secondary-label">
                    {toolGroups[screen.key].secondary}
                  </span>
                ) : null}
                <ProjectList items={toolGroups[screen.key].projects} />
              </>
            ) : null}

            {screen.kind === 'highlights' ? (
              <>
                <p className="dbee-result-title">A few highlights to start with</p>
                <div className="dbee-highlight-grid">
                  {highlights.map((item) => (
                    <a href={item.href} key={item.title}>
                      <img src={item.image ?? ''} alt="" />
                      <span>{item.label}</span>
                      <strong>{item.title}</strong>
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  ))}
                </div>
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
              <button type="button" onClick={() => setScreen({ kind: 'root' })}>
                <RotateCcw size={14} aria-hidden="true" /> Start Over
              </button>
            ) : null}
            <a href="/projects">
              View All Projects <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </footer>
            </dialog>
          ) : null}

          <span className="dbee-hover-bubble" aria-hidden="true">
            Need help exploring?
          </span>
          <button
            className="dbee-button"
            type="button"
            aria-label="Open D-Bee portfolio navigator"
            aria-expanded={open}
            aria-controls="dbee-navigator"
            onClick={() => setOpen((value) => !value)}
          >
            <img src="/home/dbee.png" alt="" aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  );
}
