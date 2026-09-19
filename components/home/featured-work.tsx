import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projectDetailBySlug } from '@/lib/project-details';

const featured = [
  {
    slug: 'help-center',
    label: 'Performance Support',
    description:
      'Turning recurring tutor challenges into needs-driven, just-in-time support.',
    image: '/projects/covers-hybrid/needs-driven-help-center.png',
  },
  {
    slug: 'reviewer-judgment',
    label: 'Learning Experience Design',
    description:
      'Making expert review judgment visible, teachable, and practiceable.',
    image: '/projects/covers-hybrid/reviewer-judgment.png',
  },
  {
    slug: 'ai-architecture',
    label: 'AI + Simulation',
    description:
      'Helping aspiring AI PMs move from knowing architecture concepts to making evidence-based decisions.',
    image: '/projects/covers-hybrid/ai-architecture.png',
  },
  {
    slug: 'learner-data',
    label: 'Evaluation + Analytics',
    description:
      'Turning learner behavior and performance data into evidence-based redesign priorities.',
    image: '/projects/covers-hybrid/learner-data.png',
  },
].map((item) => ({ ...item, project: projectDetailBySlug[item.slug] }));

export function FeaturedWork() {
  return (
    <section className="home-section featured-section" id="featured-work">
      <header className="home-section-heading featured-heading">
        <div>
          <p className="home-eyebrow">Featured work</p>
          <h2>A few problems I’ve worked on</h2>
        </div>
        <a className="featured-all-link" href="/projects">
          Explore all projects <ArrowRight size={17} aria-hidden="true" />
        </a>
      </header>

      <div className="featured-grid">
        {featured.map(({ project, label, description, image }) => (
          <article className="featured-card" key={project.slug}>
            <a href={`/projects/${project.slug}`}>
              <div className="featured-image-wrap">
                <img
                  src={image}
                  alt={project.productImageAlt}
                />
              </div>
              <div className="featured-copy">
                <span>{label}</span>
                <div className="featured-title-row">
                  <h3>{project.title}</h3>
                  <ArrowUpRight size={21} aria-hidden="true" />
                </div>
                <p>{description}</p>
              </div>
            </a>
          </article>
        ))}
      </div>

      <a className="featured-all-link featured-all-link-mobile" href="/projects">
        Explore all projects <ArrowRight size={17} aria-hidden="true" />
      </a>
    </section>
  );
}
