'use client';

/* oxlint-disable nextjs/no-html-link-for-pages -- Match the portfolio's static-export document navigation. */
/* oxlint-disable prefer-rest-params -- Google tag commands use the documented IArguments queue format. */

import { useEffect, useState } from 'react';

const measurementId = 'G-X3QR11005X';
const preferenceKey = 'portfolio-analytics-consent';
type Choice = 'accepted' | 'declined';

type AnalyticsWindow = Window & {
  dataLayer?: IArguments[];
  gtag?: (...args: unknown[]) => void;
  'ga-disable-G-X3QR11005X'?: boolean;
};

function startAnalytics() {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow['ga-disable-G-X3QR11005X'] = false;
  if (document.getElementById('portfolio-google-tag')) {
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

export function PortfolioAnalytics() {
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Keep local development and deployment previews out of the reports.
    if (window.location.hostname !== 'dimple-lin.vercel.app') return;
    let choice: string | null = null;
    try {
      choice = window.localStorage.getItem(preferenceKey);
    } catch {
      // Visitors can still choose when browser storage is unavailable.
    }
    if (choice === 'accepted') startAnalytics();
    const frame = window.requestAnimationFrame(() => {
      setEnabled(true);
      if (choice !== 'accepted' && choice !== 'declined') setVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function choose(choice: Choice) {
    try {
      window.localStorage.setItem(preferenceKey, choice);
    } catch {
      // The choice still applies to this page visit.
    }
    if (choice === 'accepted') {
      startAnalytics();
    } else {
      const analyticsWindow = window as AnalyticsWindow;
      analyticsWindow['ga-disable-G-X3QR11005X'] = true;
      analyticsWindow.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
      });
      // Clear this site's Analytics cookies when a visitor opts out.
      document.cookie.split(';').forEach((cookie) => {
        const name = cookie.trim().split('=')[0];
        if (name !== '_ga' && !name.startsWith('_ga_')) return;
        const expired = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
        document.cookie = expired;
        document.cookie = `${expired}; domain=${window.location.hostname}`;
      });
    }
    setVisible(false);
  }

  if (!enabled) return null;

  return (
    <>
      <button
        className="analytics-settings"
        type="button"
        onClick={() => setVisible(true)}
      >
        Cookie settings
      </button>
      {visible && (
        <section
          className="analytics-notice"
          aria-label="Analytics cookie preferences"
        >
          <p className="analytics-notice-title">
            A little insight, with your permission.
          </p>
          <p>
            I use Google Analytics cookies to understand visits and improve this
            portfolio. You can accept or decline, and change your choice
            anytime. <a href="/privacy">Privacy notice</a>
          </p>
          <div className="analytics-notice-actions">
            <button type="button" onClick={() => choose('declined')}>
              Decline
            </button>
            <button type="button" onClick={() => choose('accepted')}>
              Accept analytics
            </button>
          </div>
        </section>
      )}
    </>
  );
}
