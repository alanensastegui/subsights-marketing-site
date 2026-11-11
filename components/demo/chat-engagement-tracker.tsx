'use client';

import { useEffect } from 'react';
import { useAnalytics } from '@/lib/analytics';

// The demo assistant runs in a cross-origin iframe, so the page cannot read the chat. It can tell when a visitor
// moves into it: the window blurs while the iframe holds focus. One event per page view, through the site's own
// consent-aware analytics provider. What was asked is recorded by the assistant itself (bot-api conversations).
export function ChatEngagementTracker({ slug }: { slug: string }) {
  const { trackEvent } = useAnalytics();
  useEffect(() => {
    let sent = false;
    const onBlur = () => {
      if (sent) return;
      const active = document.activeElement;
      if (!(active instanceof HTMLIFrameElement) || !active.closest('#live-assistant')) return;
      sent = true;
      void trackEvent({
        event_name: 'demo_chat_engaged',
        event_category: 'engagement',
        event_label: slug,
        custom_parameters: { page: window.location.pathname },
      });
    };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, [slug, trackEvent]);
  return null;
}
