import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import {
  majorHeadings,
  metaHeadings,
  projectDetailBySlug,
  projectDetails,
  subheadings,
  type ProjectDetail,
} from '@/lib/project-details';

type PageProps = {
  params: Promise<{ slug: string }>;
};

type DetailSection = {
  heading: string;
  kind: 'major' | 'meta';
  lines: string[];
};

const ignoredLines = new Set([
  'Home',
  'About',
  'Resume',
  'Contact me',
  'Get in touch',
  'Made with',
  'Image gallery item',
  'Screen design displayed in a mockup',
  'Read more of my case studies',
  'Try the course',
  'Try out the course',
  'Read the report',
  '1',
  '2',
  '3',
  '4',
  '5',
]);

function sectionId(heading: string, index: number) {
  const value = heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return value || `section-${index + 1}`;
}

function cleanLine(line: string) {
  return line
    .replace(/（加一下用vyond）/gi, '')
    .replace(/（view example）/gi, '')
    .trim();
}

function parseProject(project: ProjectDetail): DetailSection[] {
  const lines = project.sourceText
    .split(/\r?\n/)
    .map((line) => cleanLine(line))
    .filter(Boolean);
  const titleIndex = lines.indexOf(project.title);
  const start = titleIndex >= 0 ? titleIndex + 2 : 0;
  const endIndex = lines.indexOf('Read more of my case studies', start);
  const body = lines
    .slice(start, endIndex >= 0 ? endIndex : lines.length)
    .filter(
      (line) =>
        !ignoredLines.has(line) &&
        line !== project.title &&
        line !== project.summary,
    );

  const sections: DetailSection[] = [];
  let current: DetailSection = {
    heading: 'Overview',
    kind: 'major',
    lines: [],
  };

  for (const line of body) {
    if (majorHeadings.has(line) || metaHeadings.has(line)) {
      if (current.lines.length) sections.push(current);
      current = {
        heading: line,
        kind: metaHeadings.has(line) ? 'meta' : 'major',
        lines: [],
      };
      continue;
    }
    current.lines.push(line);
  }
  if (current.lines.length) sections.push(current);

  return sections.filter(
    (section, index) =>
      section.lines.length > 0 &&
      !(
        section.heading === 'Overview' &&
        index > 0 &&
        sections[index - 1]?.heading === 'Project Overview'
      ),
  );
}

function DetailLine({ line }: { line: string }) {
  const isSubheading =
    subheadings.has(line) ||
    /^Example \d/i.test(line) ||
    /^\d+\.\s+[A-Z]/.test(line) ||
    /^[A-B]\.\s+/.test(line);

  if (isSubheading) return <h3>{line}</h3>;

  const isLead =
    line.length < 78 &&
    /^[A-Z]/.test(line) &&
    !/[.!?]$/.test(line) &&
    !line.includes('→');

  if (isLead) return <p className="detail-lead">{line}</p>;
  return <p>{line}</p>;
}

export function generateStaticParams() {
  return projectDetails.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
      images: [
        {
          url: project.productImage,
          alt: project.productImageAlt,
        },
      ],
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
  if (!project) notFound();

  const sections = parseProject(project);
  const currentIndex = projectDetails.findIndex((item) => item.slug === slug);
  const nextProject = projectDetails[(currentIndex + 1) % projectDetails.length];

  return (
    <main className="case-study" id="top">
      <SiteHeader active="projects" />

      <article>
        <header className="case-study-hero">
          <div className="case-study-hero-copy">
            <a className="back-link" href="/projects">
              <ArrowLeft size={16} aria-hidden="true" /> All projects
            </a>
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
            <p className="case-study-summary">{project.summary}</p>
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

        <section className="product-proof" aria-label="Selected project screen">
          <figure>
            <img src={project.productImage} alt={project.productImageAlt} />
            <figcaption>Selected screen from the project</figcaption>
          </figure>
        </section>

        <div className="case-study-body">
          <aside className="case-study-index" aria-label="Case study contents">
            <p>Case study</p>
            <nav>
              {sections
                .filter((section) => section.kind === 'major')
                .map((section, index) => (
                  <a key={`${section.heading}-${index}`} href={`#${sectionId(section.heading, index)}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {section.heading}
                  </a>
                ))}
            </nav>
          </aside>

          <div className="case-study-content">
            {sections.map((section, index) => (
              <section
                className={`detail-section detail-section-${section.kind}`}
                id={sectionId(section.heading, index)}
                key={`${section.heading}-${index}`}
              >
                <p className="section-number">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2>{section.heading}</h2>
                {section.kind === 'meta' ? (
                  <div className="detail-meta-list">
                    {section.lines.map((line, lineIndex) => (
                      <span key={`${line}-${lineIndex}`}>{line}</span>
                    ))}
                  </div>
                ) : (
                  <div className="detail-prose">
                    {section.lines.map((line, lineIndex) => (
                      <DetailLine line={line} key={`${line}-${lineIndex}`} />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        <footer className="next-project">
          <p>Next case study</p>
          <a href={`/projects/${nextProject.slug}`}>
            <span>{nextProject.title}</span>
            <ArrowRight aria-hidden="true" />
          </a>
          <img src={nextProject.cover} alt="" />
        </footer>
      </article>
    </main>
  );
}
