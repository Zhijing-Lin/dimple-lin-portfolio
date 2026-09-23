import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Mail,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'About Dimple Lin — Instructional Designer',
  description:
    'Dimple Lin brings together learner empathy, learning science, and product thinking to design practical learning and performance solutions.',
  openGraph: {
    title: 'About Dimple Lin — Instructional Designer',
    description:
      'From education and teaching to learning science, technology, and performance-focused learning design.',
    url: '/about',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'About Dimple Lin — Instructional Designer',
    description:
      'From education and teaching to learning science, technology, and performance-focused learning design.',
    images: [],
  },
};

const journeyStops = [
  {
    number: '01',
    title: 'Education & Teaching',
    detail: 'China → Wisconsin → Colorado',
    icon: BookOpen,
  },
  {
    number: '02',
    title: 'Learning Science & Technology',
    detail: 'Carnegie Mellon · Pittsburgh',
    icon: BrainCircuit,
  },
  {
    number: '03',
    title: 'Learning Design in Practice',
    detail: 'Learning · Performance · Product',
    icon: BriefcaseBusiness,
  },
];

export default function AboutPage() {
  return (
    <main className="about-page" id="top">
      <SiteHeader active="about" />

      <section className="about-intro" aria-labelledby="about-title">
        <div className="about-intro-grid">
          <div className="about-intro-copy">
            <h1 id="about-title">About Me<span>.</span></h1>
            <p className="about-intro-lead">
              I’m an instructional designer who combines a <strong>foundation
              in education, learning science, and product thinking</strong> to
              build <strong>practical learning experiences</strong> that help
              people <strong>perform better</strong>.
            </p>
          </div>

          <figure className="about-intro-photo">
            <Image
              src="/about/dimple-coast.jpg"
              alt="Dimple standing beside a coastal landscape"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              priority
            />
          </figure>
        </div>
      </section>

      <section className="about-journey" id="journey" aria-labelledby="journey-title">
        <div className="about-section-heading">
          <h2 id="journey-title">My Journey<span>.</span></h2>
          <p className="about-journey-intro">
            My journey has taken me from <strong>teaching in real classrooms</strong>{' '}
            to studying <strong>learning science and AI-enabled learning at
            Carnegie Mellon</strong>, and then into client-facing instructional
            design work across <strong>performance support, e-learning,
            learning analytics, and learning technology</strong>.
          </p>
        </div>

        <div className="about-journey-grid">
          <aside className="about-route" aria-label="Dimple Lin’s learning design journey">
            <p className="about-visual-label">Learning design journey</p>
            <ol>
              {journeyStops.map((stop) => {
                const Icon = stop.icon;
                return (
                  <li key={stop.number}>
                    <span className="about-route-node">
                      <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                    <span className="about-route-copy">
                      <small>{stop.number}</small>
                      <strong>{stop.title}</strong>
                      <span>{stop.detail}</span>
                    </span>
                  </li>
                );
              })}
            </ol>
          </aside>

          <div className="about-journey-stories">
            <article>
              <p className="about-story-number">01</p>
              <div>
                <h3>Building a foundation in how people learn</h3>
                <p>
                  I began my path in education, studying and gaining{' '}
                  <strong>classroom experience in both China and the United
                  States</strong>. After graduating from UW–Madison, I spent a
                  year <strong>leading my own second-grade classroom</strong>.
                </p>
                <p>
                  Teaching strengthened my leadership and communication skills,
                  but more importantly, it taught me to pay attention to{' '}
                  <strong>how differently people interpret information, respond
                  to feedback, and make sense of something new</strong>.
                </p>
              </div>
            </article>

            <article>
              <p className="about-story-number">02</p>
              <div>
                <h3>Moving from teaching to designing learning</h3>
                <p>
                  I became increasingly interested in how learning could be{' '}
                  <strong>designed beyond a single classroom and supported
                  through technology</strong>.
                </p>
                <p>
                  At Carnegie Mellon, I began studying{' '}
                  <strong>learning science, instructional design, educational
                  technology, and AI-supported learning</strong> more deeply—
                  giving me a stronger evidence-based foundation for
                  understanding not just what to teach, but{' '}
                  <strong>how people learn and practice effectively</strong>.
                </p>
              </div>
            </article>

            <article>
              <p className="about-story-number">03</p>
              <div>
                <h3>Connecting learning with performance and product</h3>
                <p>
                  Through internships and client projects, I moved further into{' '}
                  <strong>performance-focused instructional design</strong>—
                  working across e-learning, performance support, learning
                  analytics, AI-enabled learning, and learning technology.
                </p>
                <p>
                  These experiences also pushed me beyond course design. I
                  learned to <strong>work cross-functionally, manage projects,
                  collaborate with product and technical teams, and use data to
                  guide decisions</strong>—including determining when training
                  is, and is not, the right solution.
                </p>
              </div>
            </article>

            <blockquote>
              Today, I bring together learner empathy, learning science, and
              product thinking to design solutions that improve performance—
              <strong>not just deliver content.</strong>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="about-outside" aria-labelledby="outside-title">
        <div className="about-section-heading about-outside-heading">
          <h2 id="outside-title">Life Beyond Work<span>.</span></h2>
        </div>

        <div className="about-outside-grid">
          <div className="about-outside-copy">
            <p>
              When I’m not designing learning experiences, I’m usually{' '}
              <strong>moving or somewhere outdoors</strong>.
            </p>
            <p>
              I love <strong>traveling, hiking, working out, and spending time
              in nature</strong>. I’m always excited to explore somewhere new—
              whether that means a new city, a mountain trail, or simply getting
              outside for the day.
            </p>
          </div>

          <figure className="about-outside-photo">
            <Image
              src="/about/dimple-outdoors.jpg"
              alt="Dimple standing beside a forest stream surrounded by trees and moss"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
            />
            <figcaption>Exploring the Pacific Northwest</figcaption>
          </figure>
        </div>
      </section>

      <footer className="about-contact" id="contact">
        <div>
          <p className="about-eyebrow">Let’s connect</p>
          <h2>Interested in thoughtful learning design?</h2>
        </div>
        <a href="mailto:zhijing3@andrew.cmu.edu">
          <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
          Get in touch
          <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </footer>
    </main>
  );
}
