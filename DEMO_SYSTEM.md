# Subsights Demo System

A sophisticated multi-level fallback demo system that provides the most realistic demo experience possible for each prospect, with comprehensive analytics and performance monitoring.

## Architecture Overview

The system automatically tries three levels of demo rendering in order:

1. **Proxy + Inject** (Best) - Fetches target HTML, injects widget, serves from our domain
2. **Direct Iframe** (Good) - Loads target in iframe with widget overlay
3. **Default Demo** (Fallback) - Branded demo page with integrated widget that always works

## Quick Start

### Adding a New Demo Target

Edit `lib/demo/config/targets.ts`:

```typescript
export const DEMO_TARGETS: DemoTarget[] = [
  { 
    slug: "new-prospect", 
    url: "https://prospect-site.com", 
    label: "Prospect Company",
    testMessage: "Hello, I have a question about your services",
    scriptTag: '<script src="https://widget.subsights.com/chatbot.js" data-workspace="YOUR_WORKSPACE_ID" data-api-key="YOUR_API_KEY"></script>'
  },
  // Optional advanced configuration:
  { 
    slug: "secure-prospect", 
    url: "https://secure-site.com", 
    label: "Secure Company",
    scriptTag: '<script src="https://widget.subsights.com/chatbot.js" data-workspace="YOUR_WORKSPACE_ID" data-api-key="YOUR_API_KEY"></script>',
    policy: "default",        // Skip proxy/iframe attempts
    allowIframe: false,             // Don't try iframe mode
    timeoutMs: 8000,               // Custom timeout
    maxHtmlBytes: 1_000_000        // Custom size limit
  },
];
```

**Required Fields:**
- `slug`: URL-friendly identifier (e.g., "acme-corp")
- `url`: Target website URL
- `label`: Display name for the prospect
- `testMessage`: Message to send during the demo walkthrough
- `scriptTag`: Full script tag from a chatbot embedding

**Optional Fields:**
- `policy`: Fallback behavior control
- `allowIframe`: Whether to attempt iframe mode
- `timeoutMs`: Custom request timeout
- `maxHtmlBytes`: Maximum HTML size limit

### Demo URLs

- `/demo/new-prospect` - Automatic fallback chain
- `/demo/new-prospect?force=proxy` - Force proxy mode (for testing)
- `/demo/new-prospect?force=iframe` - Force iframe mode
- `/demo/new-prospect?force=default` - Force default demo

### Fallback Policies

- `"auto"` (default) - Try proxy → iframe → default
- `"proxy"` - Force proxy mode
- `"iframe"` - Force iframe mode
- `"default"` - Force default demo mode

## Admin Interface

Visit `/admin` (default password: `subsights2025!`) to:

- **Demo Targets**: View and manage configured demo targets
- **Recent Events**: Monitor fallback events in real-time with detailed analytics
- **Quick Actions**: Test demo modes and clear analytics data
- **System Info**: View performance metrics and session information

**Enhanced Analytics Dashboard:**
- Total event counts and success rates
- Breakdown by fallback reason and demo mode
- Performance metrics (load times, memory usage)
- Real-time event monitoring
- Session tracking and user agent information

**⚠️ Local Data Only:** The admin interface shows events stored in your browser's local storage only. Each team member will see their own demo events on their device. This is intentional for MVP simplicity, privacy compliance, and zero backend complexity.

## Analytics & Performance Monitoring

### Event Tracking System

The system automatically tracks comprehensive demo performance data:

- **Fallback Events**: Detailed reasons and chosen modes
- **Performance Metrics**: Load times, memory usage, DOM size
- **User Sessions**: Unique session tracking across demo visits
- **Success Rates**: Per-target and per-mode success tracking

### Data Storage Approach

**Local Storage (Current MVP):**
- Events stored in browser's localStorage only
- Each user sees their own demo testing history
- Perfect for individual debugging and testing
- Zero backend complexity or privacy concerns
- Limited to ~100 recent events per browser

**External Analytics (Optional):**
- Google Analytics integration for aggregated metrics
- Console logging for server-side debugging
- No personal data collection

### Performance Monitoring

- **Real-time Metrics**: Track demo load performance in real-time
- **Memory Monitoring**: Monitor browser memory usage
- **Threshold Alerts**: Automatic warnings for slow loads and high memory
- **Performance Budgets**: Configurable performance targets

## Security Features

- **Allowlist Only**: Only configured targets in `DEMO_TARGETS` can be proxied
- **Size Limits**: HTML content capped at 2MB by default (configurable per target)
- **Timeout Protection**: Requests timeout after 6 seconds (configurable per target)
- **Header Stripping**: Removes conflicting CSP/frame headers during proxy injection
- **No Cookie Forwarding**: Target cookies are not passed through to maintain isolation
- **Script Injection Control**: Only the configured Subsights script tag is injected
- **Local Admin Only**: Admin interface is local browser storage only, no server-side access
- **Robot Exclusion**: Demo pages blocked from search indexing via `X-Robots-Tag: noindex, nofollow`

## System Architecture

### Core Components

- **EventLogger**: Singleton class for centralized event handling
- **PerformanceMonitor**: Real-time performance tracking
- **Analytics Providers**: Console, GTM, and composite analytics
- **Fallback System**: Intelligent fallback with detailed logging

## Development

### Testing Modes

Force specific modes for testing:

```bash
# Test proxy injection
curl "/api/demo/site/acme"

# Test iframe compatibility 
curl "/api/demo/probe?slug=acme"

# Force proxy error
curl "/api/demo/site/acme?force=error"
```

### Common Issues

**Proxy fails immediately**: Check target URL and network connectivity
**Iframe blocked**: Target has X-Frame-Options or CSP restrictions
**Widget not visible**: Check browser console for injection errors

### Environment Variables

Set these in production:

- `NODE_ENV=production` - Enables production optimizations

## Deployment

The system is designed for Netlify with:

- Security headers via `netlify.toml`
- Automatic HTTPS redirects

## Performance

- Widget loads asynchronously (no blocking)
- Proxy responses cached for repeated visits
- Iframe probes cached for 5 minutes
- Default demo renders instantly with integrated widget
- Performance monitoring with configurable thresholds

## Best Practices

1. Test new targets in all three modes before sharing
2. Use `force-default` for sites with known restrictions
3. Monitor admin interface for failure patterns and performance issues
4. Update timeouts based on target site performance
5. Keep demo target list focused on active prospects
6. Review analytics dashboard regularly for optimization opportunities

## Troubleshooting

### Demo Won't Load
1. Check admin interface for recent errors and performance metrics
2. Try forcing different modes: `?force=iframe` or `?force=default`
3. Verify target URL is accessible
4. Check browser network tab for failed requests

### Widget Not Appearing
1. **Proxy mode**: Check HTML injection in browser source
2. **Iframe mode**: Widget overlay should appear in demo shell
3. **Default mode**: Widget is now integrated into the branded page

### Performance Issues
1. Reduce `maxHtmlBytes` for large sites
2. Lower `timeoutMs` for slow sites
3. Use `allowIframe: false` to skip probe delay
4. Monitor admin dashboard for performance trends

### Analytics Issues
1. Check browser console for analytics errors
2. Verify localStorage is available and not full
3. Check admin interface for event statistics
4. Clear analytics data if needed via admin interface

## Security Considerations

- Never proxy unauthorized sites
- Regularly review and clean up old demo targets  
- Monitor for unusual traffic patterns
- Keep admin password secure and rotate regularly
- Consider IP allowlisting for admin interface in production
- Review analytics data for security insights

---

For questions or issues, check the admin interface logs or contact the development team.
