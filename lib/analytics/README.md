# Analytics System Documentation

This project includes a comprehensive, privacy-compliant analytics system that automatically tracks user interactions while respecting regional privacy regulations and providing robust development tooling.

## 🚀 Quick Setup

### 1. Environment Configuration

The system automatically detects your runtime environment and configures analytics accordingly. Set the following environment variables:

```bash
# Runtime Environment (auto-detected, can be overridden)
NEXT_PUBLIC_RUNTIME_ENV=local|preview|staging|prod

# Google Analytics Measurement ID (set only in envs where GA should run)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Verify Installation

1. Start your development server: `npm run dev`
2. Open your browser's developer tools
3. Check the Console tab for analytics logs (in development)
4. Look for the floating analytics dashboard button (top-right corner)
5. In production, check the Network tab for Google Analytics requests

## 📊 Features

### Privacy-First Design
- **GDPR Compliance**: Automatic EEA/UK detection and consent enforcement
- **Consent Management**: Granular consent categories with persistent storage
- **Regional Awareness**: Different behavior based on user location
- **Data Minimization**: PII scrubbing in error tracking

### Automatic Tracking
- **Page Views**: Automatically tracked on route changes with Next.js App Router
- **Performance**: Web vitals integration with configurable sampling
- **Development Mode**: Console logging + real-time visual dashboard
- **Production Mode**: Google Analytics 4 with consent mode

### Environment-Aware Behavior
- **Local Development**: Console analytics with development dashboard
- **Preview/Staging**: Console analytics for testing
- **Production**: Google Analytics with optimized sampling and consent mode

## 🏗️ Architecture

### Provider Pattern
The system uses a provider pattern with automatic selection based on environment and consent:

- **GoogleAnalytics**: GA4 provider with consent mode and GDPR compliance
- **ConsoleAnalytics**: Development provider with rich logging and dashboard integration
- **DisabledAnalytics**: No-op provider for server-side rendering and consent-denied states

### File Structure
```
lib/analytics/
├── index.ts                    # Main exports and provider access
├── types.ts                    # TypeScript interfaces and event types
├── context.tsx                 # React Context for analytics state
├── config.ts                   # Environment-aware configuration
├── consent.ts                  # GDPR consent management
├── event-queue.ts              # Event buffering system
├── providers/
│   ├── ga4.ts                 # Google Analytics 4 implementation
│   ├── console.ts             # Development console provider
│   ├── disabled.ts            # No-op provider
│   └── test.ts                # Testing provider
└── README.md                   # This file

components/analytics/
├── consent-banner.tsx          # GDPR consent collection UI
├── dev-analytics-dashboard.tsx # Development debugging panel
├── google-analytics.tsx        # GA script loader
└── page-view-tracker.tsx       # Automatic page view tracking
```

## 🔧 Usage

### Basic Analytics Hook

Use the `useAnalytics` hook in any client component:

```tsx
"use client";
import { useAnalytics } from "@/lib/analytics";

export default function MyComponent() {
  const { 
    trackEvent, 
    trackButtonClick, 
    trackLinkClick, 
    trackFormSubmit,
    trackConversion,
    trackTiming,
    trackException
  } = useAnalytics();

  const handleButtonClick = () => {
    trackButtonClick("Sign Up Button", "/homepage");
  };

  const handleFormSubmit = () => {
    trackFormSubmit("Contact Form", "/contact");
  };

  const handlePurchase = () => {
    trackConversion({
      conversion_id: "AW-CONVERSION_ID",
      conversion_label: "CONVERSION_LABEL",
      value: 99.99,
      currency: "USD"
    });
  };

  const handleError = () => {
    trackException({
      description: "User action failed",
      fatal: false,
      custom_parameters: {
        action: "purchase",
        page: "/checkout"
      }
    });
  };

  return (
    <button onClick={handleButtonClick}>
      Sign Up
    </button>
  );
}
```

### Available Tracking Methods

#### Core Methods
- `trackPageView(event)` - Track page views with custom parameters
- `trackEvent(event)` - Track custom events with category and label
- `trackConversion(event)` - Track conversions (e.g., purchases)
- `trackTiming(event)` - Track performance metrics and user timing
- `trackException(event)` - Track errors and exceptions with PII scrubbing
- `setUserProperty(name, value)` - Set user properties for segmentation
- `setUserId(userId)` - Set user ID for cross-device tracking

#### Convenience Methods
- `trackButtonClick(buttonName, page?)` - Track button clicks with context
- `trackLinkClick(linkText, linkUrl, page?)` - Track link clicks
- `trackFormSubmit(formName, page?)` - Track form submissions
- `trackScroll(scrollDepth, page?)` - Track scroll depth engagement

### Event Types and Categories

The system provides standardized event categories and names:

```typescript
import { EVENT_CATEGORIES, EVENT_NAMES } from "@/lib/analytics";

// Use predefined categories
trackEvent({
  event_name: EVENT_NAMES.BUTTON_CLICK,
  event_category: EVENT_CATEGORIES.ENGAGEMENT,
  event_label: "Sign Up Button",
  custom_parameters: {
    page: "/homepage",
    button_position: "hero"
  }
});
```

## 🔒 Privacy and Consent

### Consent Management

The system automatically detects EEA/UK users and enforces consent requirements:

```typescript
import { isConsentRequired, getConsentState } from "@/lib/analytics/consent";

// Check if consent is required for current region
if (isConsentRequired()) {
  const consent = getConsentState();
  if (!consent.analytics) {
    // Analytics will be disabled until consent is granted
  }
}
```

### Consent Banner

The `ConsentBanner` component automatically appears for EEA/UK users:

- **Granular Controls**: Separate consent for analytics, advertising, and functional cookies
- **Persistent Storage**: Consent preferences saved in localStorage
- **Real-time Updates**: Analytics state updates immediately when consent changes

### Regional Detection

Automatic detection of EEA/UK users based on:
- Browser language settings
- Accept-Language headers
- Configurable country code lists

## 🛠️ Development Tools

### Development Dashboard

In development mode, a floating analytics dashboard provides:

- **Real-time Events**: Live event streaming and monitoring
- **Statistics**: Event counts and category breakdowns
- **Environment Info**: Runtime configuration and consent status
- **Event Inspection**: Detailed event data and context

### Console Analytics

Development environment uses rich console logging:

- **Emoji-based Categories**: Visual event identification
- **Context Information**: URL, user agent, and timestamp
- **Event Queuing**: Integration with development dashboard
- **Performance Metrics**: Event timing and delivery status

### Event Queue System

The event queue system solves race conditions:

```typescript
import { analyticsEventQueue } from "@/lib/analytics/event-queue";

// Get queue status
const status = analyticsEventQueue.getStatus();
console.log(`Queue: ${status.queueLength} events, ${status.listenerCount} listeners`);
```

## ⚙️ Configuration

### Environment Variables

```bash
# Runtime Environment
NEXT_PUBLIC_RUNTIME_ENV=local|preview|staging|prod

# Google Analytics (single var; leave unset in envs you don't want GA)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Analytics Configuration

The system automatically configures based on environment:

```typescript
import { ANALYTICS_CONFIG, RUNTIME } from "@/lib/analytics/config";

// Environment-specific settings
console.log(`Runtime: ${RUNTIME}`);
console.log(`Analytics enabled: ${ANALYTICS_CONFIG.enabled}`);
console.log(`Provider: ${ANALYTICS_CONFIG.provider}`);
console.log(`Web vitals sampling: ${ANALYTICS_CONFIG.sampling.webVitals}`);
```

### Sampling Configuration

Configurable sampling rates per environment:

- **Page Views**: 100% in all environments
- **Events**: 100% in all environments  
- **Web Vitals**: 10% in production, 100% elsewhere

## 🚨 Troubleshooting

### Common Issues

#### Analytics Not Working
1. Check environment variables are set correctly
2. Verify runtime environment detection
3. Check browser console for errors
4. Ensure consent is granted for EEA/UK users

#### Development Dashboard Not Visible
1. Ensure you're in development mode (`NODE_ENV=development`)
2. Check for floating analytics button in top-right corner
3. Verify no console errors in browser dev tools

#### Consent Banner Not Appearing
1. Check if user is in EEA/UK region
2. Verify consent storage in localStorage
3. Check browser language settings

### Debugging

#### Enable Debug Logging
```typescript
// Check current provider
const { useAnalyticsEnabled } = useAnalytics();
const isEnabled = useAnalyticsEnabled();

// Check consent status
import { getConsentState, isConsentRequired } from "@/lib/analytics/consent";
console.log("Consent required:", isConsentRequired());
console.log("Current consent:", getConsentState());
```

#### Event Queue Status
```typescript
import { analyticsEventQueue } from "@/lib/analytics/event-queue";

// Monitor queue status
setInterval(() => {
  const status = analyticsEventQueue.getStatus();
  console.log("Queue status:", status);
}, 5000);
```

## 📈 Best Practices

### Event Design
- Use consistent naming conventions
- Include relevant context in custom parameters
- Leverage predefined event categories and names
- Avoid tracking personally identifiable information

### Performance
- Analytics calls are non-blocking and asynchronous
- Events are processed in background with intelligent queuing
- No impact on page load performance or user experience

### Privacy
- Respect user consent preferences
- Use consent mode for Google Analytics
- Implement data minimization principles
- Follow GDPR and other privacy regulations

### Development
- Use development dashboard for real-time debugging
- Leverage console analytics for development insights
- Test consent flows in different regions
- Monitor event queue performance

## 🔗 Integration

### Next.js App Router
- Full compatibility with Next.js 13+ app directory
- Automatic page view tracking with route changes
- Server-side rendering safe with disabled provider

### React Components
- Context-based state management
- Hook-based API for easy integration
- Type-safe event tracking with TypeScript

### Web Vitals
- Automatic Core Web Vitals tracking
- Configurable sampling rates
- Performance monitoring integration

## 🚀 Future Enhancements

### Planned Features
- **Multi-provider Support**: Additional analytics backends (Mixpanel, Amplitude)
- **Advanced Consent**: Cookie consent management integration
- **A/B Testing**: Built-in experimentation framework
- **Data Export**: Analytics data export capabilities

### Scalability Improvements
- **Event Batching**: Intelligent event aggregation and batching
- **Offline Support**: Offline event queuing and sync
- **Performance Monitoring**: Advanced performance metrics and alerts
- **Custom Dashboards**: Configurable analytics dashboards

## 📚 Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Google Analytics Consent Mode](https://developers.google.com/tag-platform/security/guides/consent)
- [GDPR Compliance Guide](https://gdpr.eu/)
- [Next.js Analytics Integration](https://nextjs.org/docs/advanced-features/measuring-performance)
