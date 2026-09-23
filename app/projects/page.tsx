import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import { PersonalFooter } from '@/components/personal-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Projects — Dimple Lin',
  description:
    'Selected learning strategy, interactive learning, AI-enabled learning, and evaluation projects by Dimple Lin.',
};

type Project = {
  title: string;
  description: string;
  highlights: string[];
  tools: string[];
  image: string;
  imageAlt: string;
  href: string;
  anchorId?: string;
  external?: boolean;
  externalLabel?: string;
};

type Category = {
  number: string;
  shortLabel: string;
  title: string;
  description: string;
  projects: Project[];
};

const categories: Category[] = [
  {
    number: '01',
    shortLabel: 'Strategy & Performance',
    title: 'Learning Strategy & Performance Enablement',
    description:
      'Finding the real performance problem first, then designing the right support—not defaulting to training.',
    projects: [
      {
        title: 'Just-in-Time Performance Support for PLUS Tutors',
        description:
          'Turned recurring tutor challenges into actionable support through needs analysis and performance-support design.',
        highlights: ['needs analysis', 'performance-support design'],
        tools: ['Notion'],
        image: '/projects/covers-refined/needs-driven-help-center.webp',
        imageAlt: 'Tutor performance support help center interface',
        href: '/projects/help-center',
      },
      {
        title: 'Turning Reviewer Judgment into a Learnable Skill',
        description:
          'Translated reviewer performance gaps into a research-informed training experience through cognitive task analysis, SME collaboration, and iterative design.',
        highlights: ['research-informed training experience'],
        tools: ['OLI Torus', 'Vyond'],
        image: '/projects/covers-refined/reviewer-judgment.webp',
        imageAlt: 'Open educational resource reviewer training experience',
        href: '/projects/reviewer-judgment',
      },
      {
        title: 'Transforming Fragmented OER Review into an End-to-End Workflow',
        description:
          'Led a 5-person cross-functional team to transform a fragmented Open Educational Resources (OER) review workflow into an end-to-end platform through product strategy and iterative prototyping.',
        highlights: ['product strategy', 'iterative prototyping'],
        tools: [],
        image: '/projects/covers-hybrid/oer-review-workflow.png',
        imageAlt:
          'Open4PeerReview end-to-end workflow connecting coordinators, reviewers, authors, and adopters',
        href: 'https://open4peerreview-maskd-three.vercel.app/',
        external: true,
        externalLabel: 'External case study',
      },
    ],
  },
  {
    number: '02',
    shortLabel: 'Interactive Learning',
    title: 'Interactive Learning & Simulation',
    description:
      'Turning complex knowledge and judgment into realistic practice, decisions, feedback, and consequences.',
    projects: [
      {
        title: 'AI Architecture Decision-Making Simulation',
        description:
          'Designed a scenario-based simulation that helps aspiring AI PMs practice evidence-based architecture decisions and trade-off reasoning.',
        highlights: ['scenario-based simulation'],
        tools: ['Articulate Storyline', 'Synthesia', 'HTML/CSS'],
        image: '/projects/covers-refined/ai-architecture-dual-screen.webp',
        imageAlt: 'AI architecture decision-making simulation screens',
        href: '/projects/ai-architecture',
      },
      {
        title: 'Learning Survival Through Consequential Play',
        description:
          'Translated cognitive task analysis findings into gameplay mechanics that build survival judgment through decisions, consequences, and fading support.',
        highlights: ['gameplay mechanics'],
        tools: ['HTML/CSS'],
        image: '/projects/covers-refined/survival-play.webp',
        imageAlt: 'Narrative wilderness survival learning game',
        href: '/projects/survival-play',
      },
      {
        title: 'Building Nutrition Literacy Through Guided Practice',
        description:
          'Used cognitive task analysis and procedural scaffolding to turn nutrition knowledge into structured, evidence-based decision practice.',
        highlights: ['procedural scaffolding'],
        tools: ['Articulate Storyline'],
        image: '/projects/covers-refined/nutrition-literacy.webp',
        imageAlt: 'Interactive nutrition literacy course screens',
        href: '/projects/nutrition-literacy',
      },
      {
        title: 'Interactive Coaching Through Feedback',
        description:
          'Turned a complex interpersonal skill into a branching scenario with realistic choices and consequence-based feedback.',
        highlights: ['branching scenario'],
        tools: ['Articulate Storyline'],
        image: '/projects/covers-refined/interactive-coaching.webp',
        imageAlt: 'Branching manager feedback coaching scenario',
        href: '/projects/interactive-coaching',
      },
    ],
  },
  {
    number: '03',
    shortLabel: 'AI & Learning Technology',
    title: 'AI-Enabled Learning & Product Innovation',
    description:
      'Using AI as part of the learning experience—not just as a content-generation tool.',
    projects: [
      {
        title: 'Adaptive Practice & AI-Powered Feedback for Corporate Training',
        description:
          'Combined adaptive remediation with AI-powered feedback to move learners from recognizing good feedback to writing it independently.',
        highlights: ['adaptive remediation', 'AI-powered feedback'],
        tools: ['Adobe Captivate', 'LLM API'],
        image: '/projects/covers-refined/adaptive-ai-feedback.webp',
        imageAlt: 'Adaptive corporate training with AI-powered feedback',
        href: '/projects/adaptive-ai-feedback',
      },
      {
        title: 'Designing Just-in-Time AI Support with DOT AI',
        description:
          'Translated learner pain points into targeted AI support, designing prompts and activation points around moments of learner need.',
        highlights: ['targeted AI support', 'moments of learner need'],
        tools: ['DOT AI', 'OLI Torus'],
        image: '/projects/covers-refined/dot-ai.webp',
        imageAlt: 'Just-in-time DOT AI support embedded in a learning task',
        href: '#dot-ai',
        anchorId: 'dot-ai',
      },
    ],
  },
  {
    number: '04',
    shortLabel: 'Evaluation & Improvement',
    title: 'Evaluation & Continuous Improvement',
    description:
      'Using learner evidence to identify what is working, what is not, and what should change next.',
    projects: [
      {
        title: 'Turning Learner Data into Course Design Decisions',
        description:
          'Used learning analytics to turn learner behavior, performance, and survey data into evidence-based redesign priorities.',
        highlights: ['learning analytics', 'evidence-based redesign priorities'],
        tools: ['Claude Code', 'ChatGPT', 'Google Slides'],
        image: '/projects/covers-refined/learner-data.webp',
        imageAlt: 'Course evaluation findings and redesign priorities',
        href: '/projects/learner-data',
      },
      {
        title: 'Improving Tutorial Discovery with AI-Augmented Design',
        description:
          'Using synthetic user research, AI-assisted development, and iterative evaluation to make OLI Torus tutorials easier to find.',
        highlights: ['synthetic user research'],
        tools: ['Claude', 'Cursor', 'Camtasia'],
        image:
          '/projects/covers-refined/continuous-support-search-redesign.webp',
        imageAlt:
          'Before-and-after comparison of the redesigned OLI Torus tutorial search',
        href: '/projects/tutorial-search-redesign',
        anchorId: 'oli-support',
      },
    ],
  },
];

function PortfolioIntro() {
  return (
    <section className="portfolio-intro" id="top">
      <div className="intro-copy">
        <h1 className="portfolio-title-with-flower">
          <span className="portfolio-title-text">
            Projects<span className="accent-dot">.</span>
          </span>
          <span className="portfolio-title-flower" aria-hidden="true">
            <img src="/decor/wildflower-bouquet.png" alt="" />
          </span>
        </h1>
        <p className="intro-text">
          I design evidence-driven learning experiences, performance support,
          and AI-enabled tools around real learner needs and performance gaps.
        </p>
      </div>

      <div className="intro-note" aria-label="Portfolio approach">
        <div className="intro-note-content">
          <span>How I work</span>
          <p>
            <strong>Find the gap.</strong>
            <strong>Design the right intervention.</strong>
            <strong>Test what works.</strong>
            <strong>Improve continuously.</strong>
          </p>
        </div>
        <img
          className="intro-floral-border"
          src="/decor/how-i-work-floral-border-v3.png"
          alt=""
          aria-hidden="true"
        />
      </div>

      <nav className="category-nav" aria-label="Project categories">
        <a href="#category-01">
          <span>01</span>
          <strong>Strategy &amp; Performance</strong>
        </a>
        <a href="#category-02">
          <span>02</span>
          <strong>Interactive Learning</strong>
        </a>
        <a href="#category-03">
          <span>03</span>
          <strong>AI &amp; Learning Technology</strong>
        </a>
        <a href="#category-04">
          <span>04</span>
          <strong>Evaluation &amp; Improvement</strong>
        </a>
      </nav>
    </section>
  );
}

function ToolTag({ tool }: { tool: string }) {
  return <span className="tool-tag">{tool}</span>;
}

function HighlightedDescription({
  text,
  highlights,
}: {
  text: string;
  highlights: string[];
}) {
  const escapedHighlights = highlights.map((highlight) =>
    highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  );
  const pattern = new RegExp(`(${escapedHighlights.join('|')})`, 'gi');
  const normalizedHighlights = new Set(
    highlights.map((highlight) => highlight.toLowerCase()),
  );

  return (
    <p>
      {text.split(pattern).map((part, index) =>
        normalizedHighlights.has(part.toLowerCase()) ? (
          <mark className="project-highlight" key={`${part}-${index}`}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </p>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" id={project.anchorId}>
      <a
        className="project-card-link"
        href={project.href}
        target={project.external ? '_blank' : undefined}
        rel={project.external ? 'noreferrer' : undefined}
      >
        <div className="project-image-wrap">
          <img
            src={project.image}
            alt={project.imageAlt}
            className={
              project.anchorId === 'oli-support'
                ? 'continuous-support-cover'
                : undefined
            }
          />
        </div>
        <div className="project-card-copy">
          <div className="project-title-row">
            <h3>{project.title}</h3>
            <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.7} />
          </div>
          <HighlightedDescription
            text={project.description}
            highlights={project.highlights}
          />
          {project.externalLabel ? (
            <span className="external-case-link">
              {project.externalLabel}
              <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.8} />
            </span>
          ) : (
            <div className="tool-list" aria-label="Tools used">
              {project.tools.map((tool) => (
                <ToolTag key={tool} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </a>
    </article>
  );
}

function CategorySection({ category }: { category: Category }) {
  return (
    <section className="category-section" id={`category-${category.number}`}>
      <div className="category-heading">
        <p className="eyebrow">
          {category.number} — {category.shortLabel}
        </p>
        <h2>{category.title}</h2>
        <p>{category.description}</p>
      </div>
      <div className="project-grid">
        {category.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main id="projects">
      <SiteHeader active="projects" />
      <PortfolioIntro />
      <div className="portfolio-content">
        {categories.map((category) => (
          <CategorySection key={category.number} category={category} />
        ))}
      </div>
      <PersonalFooter />
    </main>
  );
}
