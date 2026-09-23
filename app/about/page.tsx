import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowDown,
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

const journeyStories = [
  {
    number: '01',
    title: 'Building a foundation in how people learn',
    paragraphs: [
      'I began my path in education, studying and gaining classroom experience in both China and the United States. After graduating from UW–Madison, I spent a year leading my own second-grade classroom.',
      'Teaching strengthened my leadership and communication skills, but more importantly, it taught me to pay attention to how differently people interpret information, respond to feedback, and make sense of something new.',
    ],
  },
  {
    number: '02',
    title: 'Moving from teaching to designing learning',
    paragraphs: [
      'I became increasingly interested in how learning could be designed beyond a single classroom and supported through technology.',
      'At Carnegie Mellon, I began studying learning science, instructional design, educational technology, and AI-supported learning more deeply—giving me a stronger evidence-based foundation for understanding not just what to teach, but how people learn and practice effectively.',
    ],
  },
  {
    number: '03',
    title: 'Connecting learning with performance and product',
    paragraphs: [
      'Through internships and client projects, I moved further into performance-focused instructional design—working across e-learning, performance support, learning analytics, AI-enabled learning, and learning technology.',
      'These experiences also pushed me beyond course design. I learned to work cross-functionally, manage projects, collaborate with product and technical teams, use data to guide decisions, and determine when training is—and is not—the right solution.',
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="about-page" id="top">
      <SiteHeader active="about" />

      <section className="about-intro" aria-labelledby="about-title">
        <p className="about-eyebrow">About me</p>
        <h1 id="about-title">
          I design learning that connects{' '}
          <span>people, performance, and technology.</span>
        </h1>
        <div className="about-intro-copy">
          <p className="about-intro-lead">
            I’m an instructional designer who combines a foundation in
            education, learning science, and product thinking to build
            practical learning experiences that help people perform better.
          </p>
          <p>
            My journey has taken me from teaching in real classrooms to
            studying learning science and AI-enabled learning at Carnegie
            Mellon, and then into client-facing instructional design work
            across performance support, e-learning, learning analytics, and
            learning technology.
          </p>
        </div>
        <a className="about-scroll-cue" href="#journey">
          My journey <ArrowDown size={16} aria-hidden="true" />
        </a>
      </section>

      <section className="about-journey" id="journey" aria-labelledby="journey-title">
        <div className="about-section-heading">
          <p className="about-eyebrow">My journey</p>
          <h2 id="journey-title">
            Three chapters that shaped how I design.
          </h2>
        </div>

        <div className="about-journey-grid">
          <aside className="about-route" aria-label="Dimple Lin’s learning design journey">
            <span className="about-route-origin">Education to impact</span>
            <svg
              className="about-route-line"
              viewBox="0 0 80 620"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M40 16 C16 92 66 150 39 225 C18 292 62 363 39 430 C22 482 51 552 40 606" />
            </svg>
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
            {journeyStories.map((story) => (
              <article key={story.number}>
                <p className="about-story-number">{story.number}</p>
                <div>
                  <h3>{story.title}</h3>
                  {story.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}

            <blockquote>
              Today, I bring together learner empathy, learning science, and
              product thinking to design solutions that improve performance—
              <strong>not just deliver content.</strong>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="about-outside" aria-labelledby="outside-title">
        <div className="about-outside-copy">
          <p className="about-eyebrow">Outside of work</p>
          <h2 id="outside-title">Usually moving—or somewhere outdoors.</h2>
          <p>
            When I’m not designing learning experiences, I’m usually moving or
            somewhere outdoors.
          </p>
          <p>
            I love traveling, hiking, working out, and spending time in nature.
            I’m always excited to explore somewhere new—whether that means a new
            city, a mountain trail, or simply getting outside for the day.
          </p>
          <ul aria-label="Interests">
            <li>Travel</li>
            <li>Hiking</li>
            <li>Fitness</li>
            <li>Nature</li>
          </ul>
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
