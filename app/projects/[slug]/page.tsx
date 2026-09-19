import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import {
  legacyProjectBySlug,
  type LegacyMedia,
  type LegacySection,
} from '@/lib/legacy-projects';
import { projectDetailBySlug, projectDetails } from '@/lib/project-details';

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

  return (
    <figure className={`legacy-media legacy-media-${media.type}`}>
      {media.type === 'video' ? (
        <iframe
          src={media.url}
          title={caption || 'Project video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <img src={media.url} alt={media.alt || caption || ''} loading="lazy" />
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

function LegacySectionView({
  section,
  index,
}: {
  section: LegacySection;
  index: number;
}) {
  if (section.type === 'hero') return null;

  const title = sectionTitle(section, index);
  const id = sectionId(title, index);

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
        {section.cta ? (
          <a
            className="legacy-cta"
            href={section.cta.url}
            target="_blank"
            rel="noreferrer"
          >
            {section.cta.title} <ExternalLink size={17} aria-hidden="true" />
          </a>
        ) : null}
      </section>
    );
  }

  if (section.type === 'columns') {
    return (
      <section
        className={`legacy-section legacy-columns legacy-columns-${Math.min(section.columns.length, 4)}`}
        id={id}
      >
        {section.columns.map((column, columnIndex) => (
          <article className="legacy-column" key={`${index}-${columnIndex}`}>
            {column.media ? <ProjectMedia media={column.media} /> : null}
            <RichText html={column.html} />
          </article>
        ))}
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
    (section) => section.type !== 'hero',
  );
  const hero = legacyProject.sections.find(
    (section) => section.type === 'hero',
  );
  const currentIndex = projectDetails.findIndex((item) => item.slug === slug);
  const nextProject =
    projectDetails[(currentIndex + 1) % projectDetails.length];

  return (
    <main className="case-study" id="top">
      <SiteHeader active="projects" />

      <article>
        <header className="case-study-hero">
          <div className="case-study-hero-copy">
            <Link className="back-link" href="/projects">
              <ArrowLeft size={16} aria-hidden="true" /> All projects
            </Link>
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
          <figure className="case-study-cover">
            <img src={project.cover} alt="" />
          </figure>
        </header>

        <div className="case-study-body">
          <aside className="case-study-index" aria-label="Case study contents">
            <p>Case study</p>
            <nav>
              {sections.map((section, index) => {
                const title = sectionTitle(section, index);
                return (
                  <a
                    key={`${title}-${index}`}
                    href={`#${sectionId(title, index + 1)}`}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {title}
                  </a>
                );
              })}
            </nav>
          </aside>

          <div className="case-study-content">
            {sections.map((section, index) => (
              <LegacySectionView
                section={section}
                index={index + 1}
                key={`${section.type}-${index}`}
              />
            ))}
          </div>
        </div>

        <footer className="next-project">
          <p>Next case study</p>
          <Link href={`/projects/${nextProject.slug}`}>
            <span>{nextProject.title}</span>
            <ArrowRight aria-hidden="true" />
          </Link>
          <img src={nextProject.cover} alt="" />
        </footer>
      </article>
    </main>
  );
}
