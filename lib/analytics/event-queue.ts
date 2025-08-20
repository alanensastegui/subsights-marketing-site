// ============================================================================
// ANALYTICS EVENT QUEUE
// ============================================================================

// Event queue item type
type EventQueueItem = {
  type: string;
  data: Record<string, unknown>;
  timestamp: string;
  eventCount: number;
};

/**
 * Global event queue that buffers analytics events until listeners are ready
 * Solves race conditions between analytics providers and dashboard listeners
 */
export class AnalyticsEventQueue {
  private queue: Array<EventQueueItem> = [];
  private listeners: Set<(event: EventQueueItem) => void> = new Set();
  private isReady = false;
  private eventCount = 0;

  /**
   * Buffer events until ready
   */
  enqueue(type: string, data: Record<string, unknown>): void {
    this.eventCount++;
    const timestamp = new Date().toLocaleTimeString();
    const eventItem: EventQueueItem = { type, data, timestamp, eventCount: this.eventCount };

    if (this.isReady) {
      this.dispatch(eventItem);
    } else {
      this.queue.push(eventItem);
    }
  }

  /**
   * Mark as ready and flush queue
   */
  ready(): void {
    this.isReady = true;
    this.queue.forEach((eventItem) => {
      this.dispatch(eventItem);
    });
    this.queue = [];
  }

  /**
   * Add event listener
   */
  addListener(listener: (event: EventQueueItem) => void): void {
    this.listeners.add(listener);
  }

  /**
   * Remove event listener
   */
  removeListener(listener: (event: EventQueueItem) => void): void {
    this.listeners.delete(listener);
  }

  /**
   * Get current queue status
   */
  getStatus(): { isReady: boolean; queueLength: number; listenerCount: number } {
    return {
      isReady: this.isReady,
      queueLength: this.queue.length,
      listenerCount: this.listeners.size,
    };
  }

  /**
   * Clear all queued events
   */
  clear(): void {
    this.queue = [];
  }

  private dispatch(eventItem: EventQueueItem): void {
    this.listeners.forEach(listener => listener(eventItem));
  }
}

// Global instance
export const analyticsEventQueue = new AnalyticsEventQueue();
