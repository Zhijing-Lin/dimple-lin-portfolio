import type { Metadata } from 'next';
import { SiteHeader } from '@/components/site-header';
import { PersonalFooter } from '@/components/personal-footer';

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
          This portfolio uses Google Analytics only after you accept analytics
          cookies. It helps Dimple Lin understand which pages visitors explore,
          how they find the website, approximate geographic regions, device and
          browser types, and engagement such as scrolling and outbound link
          clicks. Google processes the collected data to provide these reports.
          Analytics cookies distinguish visits and returning browsers; the
          reports do not reveal visitors&apos; names or email addresses.
        </p>
        <p>
          This site does not intentionally send names, email addresses, phone
          numbers, or contact-message contents to Google Analytics. Advertising
          personalization and Google signals are disabled in this site&apos;s
          analytics configuration.
        </p>
        <h2>Your choice</h2>
        <p>
          Choose Accept analytics or Decline in the cookie notice. You can
          reopen Cookie settings at the bottom left of any page to change your
          choice. Your preference is stored in your browser. Declining prevents
          this site&apos;s analytics collection; you can still browse all
          content. Withdrawing permission stops future collection and removes
          this site&apos;s Google Analytics cookies, but does not erase data
          previously processed by Google.
        </p>
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
