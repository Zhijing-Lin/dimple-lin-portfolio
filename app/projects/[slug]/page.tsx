import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  ExternalLink,
  Handshake,
  LayoutGrid,
  ListChecks,
  MessagesSquare,
  RefreshCw,
  RotateCcw,
  ScanSearch,
  Target,
  UsersRound,
  Waypoints,
} from 'lucide-react';
import { notFound } from 'next/navigation';
import {
  ProjectProgressNav,
  type ProjectProgressItem,
} from '@/components/project-progress-nav';
import { ProjectImageLightbox } from '@/components/project-image-lightbox';
import { SiteHeader } from '@/components/site-header';
import {
  legacyProjectBySlug,
  type LegacyMedia,
  type LegacySection,
} from '@/lib/legacy-projects';
import {
  metaHeadings,
  projectDetailBySlug,
  projectDetails,
} from '@/lib/project-details';

type PageProps = {
  params: Promise<{ slug: string }>;
};

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&rarr;/g, '→')
    .replace(/&mdash;/g, '—');
}

function plainText(html: string) {
  return decodeEntities(
    html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  );
}

function firstHeading(html: string) {
  const match = html.match(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/i);
  return match ? plainText(match[1]) : '';
}

function sectionTitle(section: LegacySection, index: number) {
  if (
    section.type === 'heading' ||
    section.type === 'text' ||
    section.type === 'split'
  ) {
    return firstHeading(section.html) || `Section ${index + 1}`;
  }
  if (section.type === 'columns') {
    return firstHeading(section.columns[0]?.html || '') || 'Project details';
  }
  if (section.type === 'process') return 'Design process';
  if (section.type === 'gallery') return 'Project gallery';
  return 'Overview';
}

function sectionId(title: string, index: number) {
  const value = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${value || 'section'}-${index + 1}`;
}

function metadataToneClass(heading: string) {
  if (heading === 'Team' || heading === 'Course Audience') {
    return 'metadata-card-warm';
  }
  if (heading === 'My Role') return 'metadata-card-blue';
  if (heading === 'Tools' || heading === 'Tool Used' || heading === 'Methods') {
    return 'metadata-card-green';
  }
  if (heading === 'Timeline') return 'metadata-card-rose';
  return 'metadata-card-neutral';
}

function RichText({
  html,
  className = '',
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={`legacy-rich-text${className ? ` ${className}` : ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

const zoomableProjectImages = new Set([
  '/projects/ai-architecture-anchored-learning.png',
  '/projects/ai-architecture-flow-diagram.png',
  '/projects/ai-architecture-immediate-feedback.png',
  '/projects/ai-architecture-just-in-time.png',
  '/projects/ai-architecture-prototype.png',
  '/projects/ai-architecture-storyboard.png',
  '/projects/help-center-procedural-job-aid.png',
  '/projects/help-center-operational-decision-guide.png',
  '/projects/reviewer-performance-gaps.png',
  '/projects/tutor-problem-space-mapping.png',
]);

function ProjectMedia({ media }: { media: LegacyMedia | null }) {
  if (!media || media.unavailable || !media.url) {
    return (
      <figure
        className="legacy-media-placeholder"
        aria-label="Media placeholder"
      >
        <span>Media</span>
        <p>Original media is not available yet.</p>
      </figure>
    );
  }

  const caption = media.caption ? plainText(media.caption) : '';

  if (media.type === 'image' && zoomableProjectImages.has(media.url)) {
    return (
      <ProjectImageLightbox
        src={media.url}
        alt={media.alt || caption || ''}
        caption={caption}
      />
    );
  }

  return (
    <figure className={`legacy-media legacy-media-${media.type}`}>
      <div className="legacy-media-frame">
        {media.type === 'video' ? (
          <iframe
            src={media.url}
            title={caption || 'Project video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <img
            src={media.url}
            alt={media.alt || caption || ''}
            loading="lazy"
          />
        )}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

const humanLoopWorkflowSteps = [
  'Tutor issue',
  'Supervisor SME meeting',
  'AI notes',
  'GPT draft',
  'My review',
  'Supervisor validation',
  'Published article',
];

function HumanLoopWorkflow() {
  return (
    <figure className="legacy-media human-loop-workflow">
      <div className="human-loop-workflow-frame">
        <div className="human-loop-workflow-intro">
          <span>Article workflow</span>
          <p>From tutor need to validated guidance</p>
        </div>
        <ol>
          {humanLoopWorkflowSteps.map((step, stepIndex) => (
            <li key={step}>
              <span>{String(stepIndex + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </div>
      <figcaption>AI-assisted workflow with human review built in</figcaption>
    </figure>
  );
}

const reviewerKnowledgeItems = [
  {
    title: 'Project Context & Purpose',
    description:
      'Understand Open 4 Peer Review and why structured peer review matters for OER quality.',
    icon: BookOpen,
  },
  {
    title: 'Reviewer Role & Mindset',
    description:
      'Support improvement through evidence—not grading or judging the author.',
    icon: Handshake,
  },
  {
    title: 'Single-Point Rubrics',
    description:
      'Understand how single-point rubrics differ from traditional grading rubrics.',
    icon: Target,
  },
  {
    title: 'Rating Categories',
    description:
      'Interpret Does Not Meet, Exemplifies, and Exceeds consistently.',
    icon: ListChecks,
  },
  {
    title: 'Rubric Structure',
    description:
      'Recognize each rubric section, framing language, glossary, and criteria.',
    icon: Waypoints,
  },
  {
    title: 'Rubric Scope',
    description:
      'Distinguish what belongs within the assigned rubric from what falls outside it.',
    icon: ScanSearch,
  },
  {
    title: 'Review Workflow',
    description:
      'Read the rubric, review the OER, gather evidence, and draft feedback.',
    icon: RefreshCw,
  },
];

function ReviewerKnowledgeMap() {
  return (
    <figure className="legacy-media reviewer-knowledge-map">
      <div className="reviewer-knowledge-map-frame">
        <p className="reviewer-visual-eyebrow">Foundational knowledge</p>
        <ul>
          {reviewerKnowledgeItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <span className="reviewer-knowledge-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption>
        Core Reviewer Knowledge Identified Through Analysis
      </figcaption>
    </figure>
  );
}

const reviewerWorkflowSteps = [
  {
    title: 'Align on objectives and course architecture',
    description:
      'Translate the needs analysis into learning objectives and an initial course structure.',
    icon: Target,
  },
  {
    title: 'Weekly team design reviews',
    description:
      'Refine scope, sequence, learning activities, and production decisions.',
    icon: UsersRound,
  },
  {
    title: 'Biweekly stakeholder reviews',
    description:
      'Validate major decisions and secure approval before development.',
    icon: MessagesSquare,
  },
  {
    title: 'User testing-informed iteration',
    description:
      'Update the learning experience based on learner feedback and observed needs.',
    icon: RotateCcw,
  },
];

function ReviewerProjectWorkflow() {
  return (
    <figure className="legacy-media reviewer-project-workflow">
      <div className="reviewer-project-workflow-frame">
        <p className="reviewer-visual-eyebrow">Recurring alignment cycle</p>
        <ol>
          {reviewerWorkflowSteps.map((step, stepIndex) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <span className="reviewer-workflow-marker" aria-hidden="true">
                  <Icon size={19} strokeWidth={1.9} />
                </span>
                <div>
                  <span>{String(stepIndex + 1).padStart(2, '0')}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="reviewer-workflow-outcome">
          <BadgeCheck size={18} aria-hidden="true" />
          <span>Validated, learner-informed course design</span>
        </div>
      </div>
      <figcaption>Project alignment and iteration workflow</figcaption>
    </figure>
  );
}

function LegacySectionView({
  section,
  index,
  id,
  projectSlug,
}: {
  section: LegacySection;
  index: number;
  id: string;
  projectSlug: string;
}) {
  if (section.type === 'hero') return null;

  const sourceIndex = section.sourceIndex ?? index;

  if (section.type === 'heading') {
    return (
      <section
        className="legacy-section legacy-section-heading"
        data-source-index={sourceIndex}
        id={id}
      >
        <p className="legacy-section-kicker">
          {String(index).padStart(2, '0')}
        </p>
        <RichText html={section.html} />
      </section>
    );
  }

  if (section.type === 'text') {
    return (
      <section
        className="legacy-section legacy-section-text"
        data-source-index={sourceIndex}
        id={id}
      >
        <RichText html={section.html} />
      </section>
    );
  }

  if (section.type === 'columns') {
    const columnHeadings = section.columns
      .map((column) => firstHeading(column.html))
      .filter(Boolean);
    const isMetadata =
      columnHeadings.length > 1 &&
      columnHeadings.every((heading) => metaHeadings.has(heading));

    return (
      <section
        className={`legacy-section legacy-columns legacy-columns-${Math.min(section.columns.length, 4)}${isMetadata ? ' is-metadata' : ''}`}
        data-source-index={sourceIndex}
        id={id}
      >
        {section.columns.map((column, columnIndex) => {
          const metadataClass = isMetadata
            ? ` ${metadataToneClass(firstHeading(column.html))}`
            : '';

          return (
            <article
              className={`legacy-column${metadataClass}`}
              key={`${index}-${columnIndex}`}
            >
              {column.media ? <ProjectMedia media={column.media} /> : null}
              <RichText html={column.html} />
            </article>
          );
        })}
      </section>
    );
  }

  if (section.type === 'split') {
    const usesHumanLoopWorkflow =
      projectSlug === 'help-center' && sourceIndex === 12;
    const usesReviewerKnowledgeMap =
      projectSlug === 'reviewer-judgment' && sourceIndex === 8;
    const usesReviewerWorkflow =
      projectSlug === 'reviewer-judgment' && sourceIndex === 11;
    const usesReviewerGapTable =
      projectSlug === 'reviewer-judgment' && sourceIndex === 10;

    if (usesReviewerGapTable) {
      return (
        <section
          className="legacy-section legacy-gallery reviewer-gap-table"
          data-source-index={sourceIndex}
          id={id}
        >
          <ProjectMedia media={section.media} />
        </section>
      );
    }

    return (
      <section
        className={`legacy-section legacy-split${section.flipped ? ' is-flipped' : ''}`}
        data-source-index={sourceIndex}
        id={id}
      >
        <div className="legacy-split-copy">
          <RichText html={section.html} />
        </div>
        {usesHumanLoopWorkflow ? (
          <HumanLoopWorkflow />
        ) : usesReviewerKnowledgeMap ? (
          <ReviewerKnowledgeMap />
        ) : usesReviewerWorkflow ? (
          <ReviewerProjectWorkflow />
        ) : (
          <ProjectMedia media={section.media} />
        )}
      </section>
    );
  }

  if (section.type === 'process') {
    return (
      <section
        className="legacy-section legacy-process"
        data-source-index={sourceIndex}
        id={id}
      >
        <p className="legacy-section-kicker">Project path</p>
        <ol>
          {section.items.map((item, itemIndex) => (
            <li key={`${item.name}-${itemIndex}`}>
              <span>{String(itemIndex + 1).padStart(2, '0')}</span>
              <strong>{item.name}</strong>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section
      className="legacy-section legacy-gallery"
      data-source-index={sourceIndex}
      id={id}
    >
      {section.items.map((item, itemIndex) => (
        <ProjectMedia media={item} key={`${item.url}-${itemIndex}`} />
      ))}
    </section>
  );
}

export function generateStaticParams() {
  return projectDetails.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectDetailBySlug[slug];
  if (!project) return {};

  return {
    title: `${project.title} — Dimple Lin`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Dimple Lin`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [{ url: project.productImage, alt: project.productImageAlt }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Dimple Lin`,
      description: project.summary,
      images: [project.productImage],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projectDetailBySlug[slug];
  const legacyProject = legacyProjectBySlug[slug];
  if (!project || !legacyProject) notFound();

  const sections = legacyProject.sections.filter(
    (section) => section.type !== 'hero' && section.type !== 'process',
  );
  const processSection = legacyProject.sections.find(
    (section) => section.type === 'process',
  );
  const hero = legacyProject.sections.find(
    (section) => section.type === 'hero',
  );
  const renderedSections = sections.map((section, index) => {
    const title = sectionTitle(section, index);
    return {
      section,
      index: index + 1,
      title,
      id: sectionId(title, section.sourceIndex ?? index),
    };
  });
  const fallbackExcludedTitles = new Set([
    'Tools',
    'Team',
    'Timeline',
    'My Role',
    'Course Audience',
    'Project details',
    'Project gallery',
  ]);
  const progressItems: ProjectProgressItem[] =
    processSection?.type === 'process' && processSection.items.length
      ? processSection.items
          .map((item) => {
            const target =
              renderedSections.find(
                ({ section }) => section.sourceIndex === item.sectionIndex,
              ) ||
              renderedSections.find(
                ({ section }) =>
                  section.sourceIndex !== null &&
                  section.sourceIndex >= item.sectionIndex,
              ) ||
              renderedSections.at(-1);
            return target
              ? { label: item.name, targetId: target.id }
              : undefined;
          })
          .filter((item): item is ProjectProgressItem => Boolean(item))
      : renderedSections
          .filter(
            ({ section, title }) =>
              !fallbackExcludedTitles.has(title) &&
              !title.startsWith('Section ') &&
              (section.type === 'heading' ||
                section.type === 'text' ||
                section.type === 'split' ||
                section.type === 'columns'),
          )
          .map(({ title, id }) => ({ label: title, targetId: id }));
  const currentIndex = projectDetails.findIndex((item) => item.slug === slug);
  const nextProject =
    projectDetails[(currentIndex + 1) % projectDetails.length];
  const progressNavAfterSourceIndex =
    project.slug === 'reviewer-judgment'
      ? 6
      : project.slug === 'ai-architecture'
        ? 4
        : null;
  const delaysProgressNav = progressNavAfterSourceIndex !== null;
  const introductionSections = delaysProgressNav
    ? renderedSections.filter(
        ({ section }) =>
          section.sourceIndex !== null &&
          section.sourceIndex <= (progressNavAfterSourceIndex ?? -1),
      )
    : [];
  const mainSections = delaysProgressNav
    ? renderedSections.filter(
        ({ section }) =>
          section.sourceIndex === null ||
          section.sourceIndex > (progressNavAfterSourceIndex ?? -1),
      )
    : renderedSections;
  const renderSection = ({
    section,
    index,
    id,
  }: (typeof renderedSections)[number]) => (
    <LegacySectionView
      section={section}
      index={index}
      id={id}
      projectSlug={project.slug}
      key={`${section.type}-${id}`}
    />
  );

  return (
    <main className="case-study" data-project-slug={project.slug} id="top">
      <SiteHeader active="projects" />

      <article>
        <header className="case-study-hero">
          <div className="case-study-hero-copy">
            <a className="back-link" href="/projects">
              <ArrowLeft size={16} aria-hidden="true" /> All projects
            </a>
            <p className="eyebrow">{project.category}</p>
            {hero?.type === 'hero' ? (
              <RichText html={hero.titleHtml} className="case-study-title" />
            ) : (
              <h1>{project.title}</h1>
            )}
            {hero?.type === 'hero' && plainText(hero.subtitleHtml) ? (
              <RichText
                html={hero.subtitleHtml}
                className="case-study-summary case-study-summary-rich"
              />
            ) : (
              <p className="case-study-summary">{project.summary}</p>
            )}
            <div className="tool-list" aria-label="Tools used">
              {project.tools.map((tool) => (
                <span className="tool-tag" key={tool}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="case-study-visual">
            <figure className="case-study-cover">
              <img src={project.cover} alt="" />
            </figure>
            <div className="case-study-launches" aria-label="Project links">
              {project.launchLinks.map((launchLink) => (
                <a
                  className="case-study-launch"
                  href={launchLink.url}
                  target="_blank"
                  rel="noreferrer"
                  key={launchLink.url}
                >
                  <span>{launchLink.label}</span>
                  <span className="case-study-launch-icon" aria-hidden="true">
                    <ExternalLink size={16} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </header>

        {delaysProgressNav ? (
          <>
            <div className="case-study-body case-study-body-before-progress">
              <div className="case-study-content">
                {introductionSections.map(renderSection)}
              </div>
            </div>
            <ProjectProgressNav items={progressItems} />
            <div className="case-study-body case-study-body-after-progress">
              <div className="case-study-content">
                {mainSections.map(renderSection)}
              </div>
            </div>
          </>
        ) : (
          <>
            <ProjectProgressNav items={progressItems} />
            <div className="case-study-body">
              <div className="case-study-content">
                {mainSections.map(renderSection)}
              </div>
            </div>
          </>
        )}

        <footer className="next-project">
          <div className="next-project-actions">
            <a
              className="next-project-button next-project-button-primary"
              href={`/projects/${nextProject.slug}`}
              aria-label={`Next project: ${nextProject.title}`}
            >
              <span>Next Project</span>
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              className="next-project-button next-project-button-secondary"
              href="/projects"
            >
              <LayoutGrid size={16} aria-hidden="true" />
              <span>All Projects</span>
            </a>
          </div>
          <img src={nextProject.cover} alt="" />
        </footer>
      </article>
    </main>
  );
}
