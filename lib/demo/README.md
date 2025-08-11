# Demo Analytics System

A robust, maintainable, and performant analytics system for tracking demo performance and fallback events.

## 🚀 Features

### **Event Schema & Validation**
- **Structured Events**: Type-safe event objects with comprehensive metadata
- **Validation**: Runtime validation of event data integrity
- **Unique IDs**: Auto-generated event and session identifiers
- **Performance Metrics**: Load times, memory usage, and DOM size tracking

### **Centralized Event Logging**
- **Singleton Pattern**: Single source of truth for all analytics operations
- **Error Handling**: Graceful degradation when analytics fail
- **Async Operations**: Non-blocking event processing
- **Multiple Providers**: Support for console, GTM, and custom analytics

### **Performance Monitoring**
- **Real-time Metrics**: Track demo load performance in real-time
- **Memory Monitoring**: Monitor browser memory usage
- **Threshold Alerts**: Automatic warnings for slow loads and high memory
- **Performance Budgets**: Configurable performance targets

### **Data Management**
- **Local Storage**: Browser-based event storage (privacy-compliant)
- **Event Trimming**: Automatic cleanup of old events (keeps last 100)
- **Data Validation**: Automatic cleanup of corrupted data
- **Statistics**: Real-time analytics and insights

## 📊 Event Schema

```typescript
interface DemoEvent {
  id: string;                    // Unique event identifier
  slug: string;                  // Demo target identifier
  reason: FallbackReason;        // Why fallback occurred
  chosenMode: DemoMode;          // Final demo mode used
  timestamp: number;             // Event timestamp
  metadata?: Record<string, any>; // Additional context
  sessionId?: string;            // User session identifier
  userAgent?: string;            // Browser information
  performance?: {                 // Performance metrics
    loadTime?: number;           // Demo load time in ms
    memoryUsage?: number;        // Memory usage in bytes
  };
}
```

## 🔧 Usage

### **Core Event Logging**

```typescript
import { eventLogger } from "@/lib/demo/analytics";

// Log a demo fallback event
await eventLogger.logEvent({
  slug: "example-site",
  reason: "iframe-blocked",
  chosenMode: "default",
  metadata: { userAgent: navigator.userAgent }
});
```

### **Performance Monitoring**

```typescript
import { createPerformanceMonitor } from "@/lib/demo/performance";

const monitor = createPerformanceMonitor();
monitor.start();

// ... demo loading logic ...

const metrics = monitor.end();
console.log(`Demo loaded in ${metrics.loadTime}ms`);
```

### **Event Statistics**

```typescript
import { getEventStats } from "@/lib/demo/analytics";

const stats = getEventStats();
console.log(`Total events: ${stats.total}`);
console.log(`Most common reason: ${Object.keys(stats.byReason)[0]}`);
```

### **Direct Analytics Access**

```typescript
import { analytics } from "@/lib/demo/analytics";

// Track custom events
await analytics.trackDemoView("example-site", "iframe");
await analytics.trackDemoSuccess("example-site", "iframe", 2500);
```

## 🏗️ Architecture

### **EventLogger Class**
- **Singleton Pattern**: Ensures single instance across the app
- **Provider Management**: Manages multiple analytics providers
- **Error Isolation**: Analytics failures don't break the app
- **Performance Monitoring**: Built-in performance tracking

### **Analytics Providers**
- **ConsoleDemoAnalytics**: Development and debugging
- **GTMDemoAnalytics**: Google Tag Manager integration
- **CompositeDemoAnalytics**: Multi-provider orchestration

### **Performance Monitor**
- **High-Precision Timing**: Uses `performance.now()` for accuracy
- **Memory Tracking**: Monitors browser memory usage
- **DOM Analysis**: Tracks DOM size and complexity
- **Threshold Monitoring**: Automatic performance alerts

## 📈 Performance Metrics

### **Load Time Thresholds**
- **Fast**: < 3 seconds (green)
- **Acceptable**: 3-5 seconds (yellow)
- **Slow**: > 5 seconds (red, console warning)

### **Memory Usage Thresholds**
- **Normal**: < 50MB
- **High**: > 50MB (console warning)
- **Critical**: > 100MB (console error)

### **DOM Size Thresholds**
- **Optimal**: < 1000 nodes
- **Large**: 1000-2000 nodes
- **Excessive**: > 2000 nodes

## 🛡️ Error Handling

### **Graceful Degradation**
- Analytics failures don't break demo functionality
- Automatic fallback to console logging
- Corrupted data is automatically cleaned up
- Invalid events are filtered out

### **Data Validation**
- Runtime type checking of all events
- Automatic cleanup of corrupted localStorage
- Validation of event schema integrity
- Session ID generation and management

## 🔒 Privacy & Security

### **Local Storage Only**
- No server-side data collection
- Each user maintains their own event history
- No cross-user tracking or analytics
- GDPR and privacy compliant

### **Data Retention**
- Maximum 100 events per browser
- Automatic cleanup of old events
- No persistent user identification
- Session-based tracking only

## 🚀 Best Practices

### **Event Naming**
- Use descriptive event names
- Include relevant metadata
- Avoid sensitive information
- Consistent naming conventions

### **Performance Monitoring**
- Start monitoring early in the process
- End monitoring when operation completes
- Set appropriate thresholds
- Monitor memory usage in long-running demos

### **Error Handling**
- Always wrap analytics calls in try-catch
- Use async/await for better error handling
- Log errors for debugging
- Don't let analytics failures break core functionality

## 🔧 Configuration

### **Performance Budgets**
```typescript
import { getPerformanceBudget } from "@/lib/demo/performance";

const budget = getPerformanceBudget();
// demoLoadTime: 3000ms
// memoryUsage: 50MB
// domSize: 1000 nodes
```

### **Custom Analytics Providers**
```typescript
class CustomAnalytics implements DemoAnalytics {
  async trackFallback(event: DemoEvent): Promise<void> {
    // Custom tracking logic
  }
}

const customLogger = new EventLogger();
customLogger.addProvider(new CustomAnalytics());
```

## 📊 Admin Dashboard

The admin dashboard provides:
- **Real-time Statistics**: Event counts and trends
- **Performance Insights**: Load times and memory usage
- **Fallback Analysis**: Reason distribution and patterns
- **Session Tracking**: User session identification
- **Data Management**: Event clearing and export

## 🚀 Future Enhancements

### **Planned Features**
- **Real-time Streaming**: WebSocket-based live updates
- **Advanced Analytics**: Machine learning insights
- **Custom Dashboards**: Configurable admin views
- **Export Functionality**: Data export in multiple formats
- **API Integration**: REST API for external tools

### **Performance Improvements**
- **Event Batching**: Batch multiple events for efficiency
- **Compression**: Compress event data in storage
- **Indexing**: Fast event search and filtering
- **Caching**: Intelligent event caching strategies

## 🐛 Troubleshooting

### **Common Issues**

**Events Not Appearing**
- Check browser console for errors
- Verify localStorage is enabled
- Check event validation logic

**Performance Warnings**
- Review demo loading logic
- Check for memory leaks
- Optimize DOM operations

**Analytics Failures**
- Verify GTM configuration
- Check network connectivity
- Review provider implementations

### **Debug Mode**
```typescript
// Enable debug logging
localStorage.setItem("demo_analytics_debug", "true");

// Check event storage
console.log(localStorage.getItem("subsights_demo_events"));
```

## 📚 API Reference

### **Core Exports**

```typescript
// Main instances
export const eventLogger: EventLogger;
export const analytics: CompositeDemoAnalytics;

// Utility functions
export function getDemoEvents(): DemoEvent[];
export function clearDemoEvents(): void;
export function getEventStats(): EventStats;
export function createDemoEvent(...): Partial<DemoEvent>;

// Types
export interface DemoEvent;
export type FallbackReason;
export class EventLogger;
export interface DemoAnalytics;
```

### **Module Files**
- `analytics.ts` - Core analytics functionality
- `performance.ts` - Performance monitoring utilities
- `fallback.ts` - Fallback event handling
