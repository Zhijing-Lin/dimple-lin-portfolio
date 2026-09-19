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
      <svg
        className={`dbee-flight-path${open ? ' is-hidden' : ''}`}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <mask id="dbee-flight-mask" maskUnits="userSpaceOnUse">
            <path
              className="dbee-flight-reveal"
              pathLength="1"
              d="M590 160 C770 75 905 190 812 310 C736 408 602 327 659 224 C720 114 929 305 765 521 C684 628 785 700 831 718 C907 748 901 846 936 910"
            />
          </mask>
        </defs>
        <path
          className="dbee-flight-line"
          d="M590 160 C770 75 905 190 812 310 C736 408 602 327 659 224 C720 114 929 305 765 521 C684 628 785 700 831 718 C907 748 901 846 936 910"
          mask="url(#dbee-flight-mask)"
        />
      </svg>

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
