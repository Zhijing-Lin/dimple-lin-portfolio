import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { PersonalFooter } from '@/components/personal-footer';
import { AnalyticsPreferences } from '@/components/portfolio-analytics';

export const metadata: Metadata = { title: 'Privacy notice — Dimple Lin' };

export default function PrivacyPage() {
  return (
    <main className="home-page">
      <SiteHeader />
      <article className="portfolio-privacy">
        <h1>Privacy notice</h1>
        <p>Updated October 6, 2026</p>
        <h2>Website analytics</h2>
        <p>
          This portfolio uses Google Analytics to understand which pages
          visitors explore, how they find the website, approximate geographic
          regions, device and browser types, and engagement such as scrolling
          and outbound link clicks. Google processes the collected data to
          provide reports. Analytics may use first-party cookies to distinguish
          visits and returning browsers. For visitors in the European Economic
          Area, the United Kingdom, and Switzerland, Analytics cookie storage is
          disabled by default until they choose to allow it here; limited
          measurements without Analytics cookies may still be sent. The reports
          do not reveal visitors&apos; names or email addresses.
        </p>
        <p>
          This site does not intentionally send names, email addresses, phone
          numbers, or contact-message contents to Google Analytics. Advertising
          personalization and Google signals are disabled in this site&apos;s
          analytics configuration.
        </p>
        <h2>Your choice</h2>
        <p>
          You can disable analytics or allow Analytics cookies using the buttons
          below. Your preference is stored in your browser. Disabling analytics
          stops this site&apos;s future measurement in that browser and removes
          this site&apos;s Analytics cookies; it does not erase data previously
          processed by Google. Choices to decline analytics made before this
          update are still respected.
        </p>
        <AnalyticsPreferences />
        <p>
          Learn more about{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noreferrer"
          >
            how Google uses information from sites that use its services
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Google&apos;s privacy policy
          </a>
          .
        </p>
        <h2>Contact</h2>
        <p>
          For questions about this portfolio&apos;s privacy practices, email{' '}
          <a href="mailto:linzhijing168@gmail.com">linzhijing168@gmail.com</a>.
          If you contact Dimple by email or follow an external link, the
          relevant service handles that interaction under its own privacy
          policy.
        </p>
      </article>
      <PersonalFooter />
    </main>
  );
}
