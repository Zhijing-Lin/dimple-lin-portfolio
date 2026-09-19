import { ArrowRight } from 'lucide-react';
import { SkillGarden } from './skill-garden';

export function HeroIntro() {
  return (
    <section className="home-hero" id="home">
      <div className="home-hero-copy" id="about">
        <p className="home-kicker">
          Hi, I’m <span className="dimple-name">Dimple.</span>
        </p>
        <h1>
          I turn real{' '}
          <span className="home-highlight">learning and performance gaps</span>{' '}
          into <span className="home-highlight">evidence-driven experiences</span>{' '}
          using research, learning science, AI, and data.
        </h1>
        <div className="home-actions">
          <a className="home-button home-button-primary" href="/projects">
            View Projects <ArrowRight size={17} aria-hidden="true" />
          </a>
          <a className="home-button home-button-secondary" href="/#about">
            About Me
          </a>
        </div>
      </div>
      <SkillGarden />
    </section>
  );
}
