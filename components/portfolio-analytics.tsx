'use client';

/* oxlint-disable prefer-rest-params -- Google tag commands use the documented IArguments queue format. */

import { useEffect, useState } from 'react';

const measurementId = 'G-X3QR11005X';
const preferenceKey = 'portfolio-analytics-consent';
type Choice = 'accepted' | 'declined';

const restrictedRegions = [
  'AT',
  'BE',
  'BG',
  'HR',
  'CY',
  'CZ',
  'DK',
  'EE',
  'FI',
  'FR',
  'DE',
  'GR',
  'HU',
  'IE',
  'IT',
  'LV',
  'LT',
  'LU',
  'MT',
  'NL',
  'PL',
  'PT',
  'RO',
  'SK',
  'SI',
  'ES',
  'SE',
  'IS',
  'LI',
  'NO',
  'GB',
  'CH',
];

type AnalyticsWindow = Window & {
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
  'ga-disable-G-X3QR11005X'?: boolean;
};

function clearAnalyticsCookies() {
  document.cookie.split(';').forEach((cookie) => {
    const name = cookie.trim().split('=')[0];
    if (name !== '_ga' && !name.startsWith('_ga_')) return;
    const expired = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    document.cookie = expired;
    document.cookie = `${expired}; domain=${window.location.hostname}`;
  });
}

function readPreference(): Choice | null {
  try {
    const choice = window.localStorage.getItem(preferenceKey);
    if (choice === 'declined' || choice === 'accepted') return choice;
  } catch {
    // Use regional defaults if browser storage is unavailable.
  }
  return null;
}

function startAnalytics(hasExplicitConsent: boolean) {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow['ga-disable-G-X3QR11005X'] = false;
  if (document.getElementById('portfolio-google-tag')) {
    if (hasExplicitConsent)
      analyticsWindow.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
    return;
  }

  analyticsWindow.dataLayer ??= [];
  analyticsWindow.gtag = function () {
    analyticsWindow.dataLayer?.push(arguments);
  };
  analyticsWindow.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  if (!hasExplicitConsent) {
    analyticsWindow.gtag('consent', 'default', {
      analytics_storage: 'denied',
      region: restrictedRegions,
    });
  }
  analyticsWindow.gtag('set', 'ads_data_redaction', true);
  analyticsWindow.gtag('set', 'url_passthrough', false);
  analyticsWindow.gtag('js', new Date());
  analyticsWindow.gtag('config', measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  const script = document.createElement('script');
  script.id = 'portfolio-google-tag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

function applyPreference(choice: Choice | null) {
  if (window.location.hostname !== 'dimple-lin.vercel.app') return;
  if (choice === 'declined') {
    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow['ga-disable-G-X3QR11005X'] = true;
    analyticsWindow.gtag?.('consent', 'update', {
      analytics_storage: 'denied',
    });
    clearAnalyticsCookies();
  } else {
    startAnalytics(choice === 'accepted');
  }
}

export function PortfolioAnalytics() {
  useEffect(() => {
    // Keep local development and deployment previews out of the reports.
    applyPreference(readPreference());
  }, []);

  return null;
}

export function AnalyticsPreferences() {
  const [choice, setChoice] = useState<Choice | null | undefined>(undefined);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() =>
      setChoice(readPreference()),
    );
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function choose(nextChoice: Choice) {
    try {
      window.localStorage.setItem(preferenceKey, nextChoice);
    } catch {
      // The choice still applies to this page visit.
    }
    applyPreference(nextChoice);
    setChoice(nextChoice);
  }

  return (
    <section
      className="analytics-preferences"
      aria-label="Website analytics preference"
    >
      <p aria-live="polite">
        {choice === undefined
          ? 'Your analytics preference'
          : choice === 'declined'
            ? 'Analytics is disabled in this browser.'
            : choice === 'accepted'
              ? 'Analytics cookies are enabled in this browser.'
              : 'Default regional analytics settings are in use.'}
      </p>
      <div>
        <button type="button" onClick={() => choose('declined')}>
          Disable analytics
        </button>
        <button type="button" onClick={() => choose('accepted')}>
          Allow analytics cookies
        </button>
      </div>
    </section>
  );
}
