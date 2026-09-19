import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';

type Project = {
  title: string;
  description: string;
  tools: string[];
  image: string;
  imageAlt: string;
  href: string;
  anchorId?: string;
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
        title: 'Needs-Driven Help Center for Tutor Performance Support',
        description:
          'Turned recurring live-session challenges into just-in-time tutor support through needs analysis, workflow observation, SME knowledge elicitation, and intervention selection.',
        tools: ['Notion'],
        image: '/projects/covers/needs-driven-help-center.png',
        imageAlt: 'Tutor performance support help center interface',
        href: '/projects/help-center',
      },
      {
        title: 'Turning Reviewer Judgment into a Learnable Skill',
        description:
          'Designed a research-informed pre-training experience that helps OER reviewers apply rubrics consistently and produce specific, evidence-based, actionable feedback.',
        tools: ['OLI Torus', 'Vyond'],
        image: '/projects/covers/reviewer-judgment.png',
        imageAlt: 'Open educational resource reviewer training experience',
        href: '/projects/reviewer-judgment',
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
          'A scenario-based simulation that helps aspiring AI product managers diagnose system failures, compare architecture options, and justify decisions using evaluation and cost evidence.',
        tools: ['Articulate Storyline', 'Synthesia', 'HTML/CSS'],
        image: '/projects/covers/ai-architecture.png',
        imageAlt: 'AI architecture decision-making simulation screens',
        href: '/projects/ai-architecture',
      },
      {
        title: 'Learning Survival Through Consequential Play',
        description:
          'A narrative-driven educational game that teaches campsite selection and firemaking through hands-on decisions, fading support, and meaningful gameplay consequences.',
        tools: ['Phaser', 'Midjourney', 'HTML/CSS'],
        image: '/projects/covers/survival-play.png',
        imageAlt: 'Narrative wilderness survival learning game',
        href: '/projects/survival-play',
      },
      {
        title: 'Building Nutrition Literacy Through Guided Practice',
        description:
          'An interactive Storyline experience that helps young adults move from basic nutrition knowledge to structured, evidence-based food decisions.',
        tools: ['Articulate Storyline'],
        image: '/projects/covers/nutrition-literacy.png',
        imageAlt: 'Interactive nutrition literacy course screens',
        href: '/projects/nutrition-literacy',
      },
      {
        title: 'Interactive Coaching Through Feedback',
        description:
          'A branching workplace scenario where new managers practice navigating difficult feedback conversations and experience the consequences of their choices.',
        tools: ['Articulate Storyline'],
        image: '/projects/covers/interactive-coaching.png',
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
          'An adaptive corporate learning experience that uses performance-based remediation and AI-powered feedback to help managers move from recognizing good feedback to writing it independently.',
        tools: ['Adobe Captivate', 'LLM API'],
        image: '/projects/covers/adaptive-ai-feedback.png',
        imageAlt: 'Adaptive corporate training with AI-powered feedback',
        href: '/projects/adaptive-ai-feedback',
      },
      {
        title: 'Designing Just-in-Time AI Support with DOT AI',
        description:
          'Used learner feedback to identify recurring pain points in an existing AI learning course, then designed and embedded targeted DOT AI support at the moments learners need it.',
        tools: ['DOT AI', 'OLI Torus'],
        image: '/projects/covers/dot-ai.png',
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
          'An AI-assisted evaluation of the Beyond Backpacks course that transformed learner behavior, performance, and survey data into evidence-based redesign priorities.',
        tools: ['Claude Code', 'ChatGPT', 'Google Slides'],
        image: '/projects/covers/learner-data.png',
        imageAlt: 'Course evaluation findings and redesign priorities',
        href: '/projects/learner-data',
      },
      {
        title: 'From Tutorial Videos to Continuous Performance Support',
        description:
          'Evaluated an existing tutorial-video system and redesigned how course authors find help through searchable content, AI-assisted support, and a continuous-improvement approach.',
        tools: ['Camtasia', 'HTML/CSS'],
        image: '/projects/covers/continuous-support.png',
        imageAlt:
          'Tutorial videos redesigned as continuous performance support',
        href: '#oli-support',
        anchorId: 'oli-support',
      },
    ],
  },
];

function PortfolioIntro() {
  return (
    <section className="portfolio-intro" id="top">
      <div className="intro-copy">
        <p className="eyebrow">Selected work</p>
        <h1>
          Projects<span className="accent-dot">.</span>
        </h1>
        <p className="intro-text">
          Learning strategy, interactive experiences, AI-enabled learning, and
          evaluation—designed around real learner and performance needs.
        </p>
      </div>

      <div className="intro-note" aria-label="Portfolio approach">
        <span>How I work</span>
        <p>Find the gap. Design the practice. Improve the system.</p>
      </div>

      <nav className="category-nav" aria-label="Project categories">
        <a href="#category-01">
          <span>01</span> Strategy &amp; Performance
        </a>
        <a href="#category-02">
          <span>02</span> Interactive Learning
        </a>
        <a href="#category-03">
          <span>03</span> AI &amp; Learning Technology
        </a>
        <a href="#category-04">
          <span>04</span> Evaluation &amp; Improvement
        </a>
      </nav>
    </section>
  );
}

function ToolTag({ tool }: { tool: string }) {
  return <span className="tool-tag">{tool}</span>;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card" id={project.anchorId}>
      <a className="project-card-link" href={project.href}>
        <div className="project-image-wrap">
          <img src={project.image} alt={project.imageAlt} />
        </div>
        <div className="project-card-copy">
          <div className="project-title-row">
            <h3>{project.title}</h3>
            <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.7} />
          </div>
          <p>{project.description}</p>
          <div className="tool-list" aria-label="Tools used">
            {project.tools.map((tool) => (
              <ToolTag key={tool} tool={tool} />
            ))}
          </div>
        </div>
      </a>
    </article>
  );
}

function CategorySection({ category, index }: { category: Category; index: number }) {
  return (
    <section
      className={`category-section ${index % 2 === 0 ? 'category-white' : 'category-warm'}`}
      id={`category-${category.number}`}
    >
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
      <SiteHeader />
      <PortfolioIntro />
      <div className="portfolio-content">
        {categories.map((category, index) => (
          <CategorySection key={category.number} category={category} index={index} />
        ))}
        <footer className="site-footer">
          <p>Designing learning that moves from insight to action.</p>
          <span>© 2026 Dimple Lin</span>
        </footer>
      </div>
    </main>
  );
}
