import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ExternalLink, LayoutGrid } from 'lucide-react';
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

  if (
    media.type === 'image' &&
    media.url === '/projects/tutor-problem-space-mapping.png'
  ) {
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

function LegacySectionView({
  section,
  index,
  id,
}: {
  section: LegacySection;
  index: number;
  id: string;
}) {
  if (section.type === 'hero') return null;

  if (section.type === 'heading') {
    return (
      <section className="legacy-section legacy-section-heading" id={id}>
        <p className="legacy-section-kicker">
          {String(index).padStart(2, '0')}
        </p>
        <RichText html={section.html} />
      </section>
    );
  }

  if (section.type === 'text') {
    return (
      <section className="legacy-section legacy-section-text" id={id}>
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
    return (
      <section
        className={`legacy-section legacy-split${section.flipped ? ' is-flipped' : ''}`}
        id={id}
      >
        <div className="legacy-split-copy">
          <RichText html={section.html} />
        </div>
        <ProjectMedia media={section.media} />
      </section>
    );
  }

  if (section.type === 'process') {
    return (
      <section className="legacy-section legacy-process" id={id}>
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
    <section className="legacy-section legacy-gallery" id={id}>
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

        <ProjectProgressNav items={progressItems} />

        <div className="case-study-body">
          <div className="case-study-content">
            {renderedSections.map(({ section, index, id }) => (
              <LegacySectionView
                section={section}
                index={index}
                id={id}
                key={`${section.type}-${id}`}
              />
            ))}
          </div>
        </div>

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
