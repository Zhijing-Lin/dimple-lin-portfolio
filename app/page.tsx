import { SiteHeader } from '@/components/site-header';
import { FeaturedWork } from '@/components/home/featured-work';
import { HeroIntro } from '@/components/home/hero-intro';
import { ProcessSection } from '@/components/home/process-section';
import { PersonalFooter } from '@/components/personal-footer';

export default function HomePage() {
  return (
    <main className="home-page" id="top">
      <SiteHeader active="home" />
      <HeroIntro />
      <ProcessSection />
      <FeaturedWork />
      <PersonalFooter />
    </main>
  );
}
