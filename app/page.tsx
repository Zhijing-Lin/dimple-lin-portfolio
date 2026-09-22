import { SiteHeader } from '@/components/site-header';
import { FeaturedWork } from '@/components/home/featured-work';
import { HeroIntro } from '@/components/home/hero-intro';
import { ProcessSection } from '@/components/home/process-section';

export default function HomePage() {
  return (
    <main className="home-page" id="top">
      <SiteHeader active="home" />
      <HeroIntro />
      <ProcessSection />
      <FeaturedWork />
      <footer className="home-footer" id="resume">
        <p>Designing learning that moves from insight to action.</p>
        <a href="/projects">Explore the work ↗</a>
      </footer>
    </main>
  );
}
