// ============================================================================
// ANALYTICS EVENT QUEUE
// ============================================================================

/**
 * Global event queue that buffers analytics events until listeners are ready
 * Solves race conditions between analytics providers and dashboard listeners
 */
export class AnalyticsEventQueue {
  private queue: Array<{ type: string, data: any, timestamp: string, eventCount: number }> = [];
  private listeners: Set<(event: any) => void> = new Set();
  private isReady = false;
  private eventCount = 0;

  /**
   * Buffer events until ready
   */
  enqueue(type: string, data: any): void {
    this.eventCount++;
    const timestamp = new Date().toLocaleTimeString();

    if (this.isReady) {
      this.dispatch(type, data, timestamp, this.eventCount);
    } else {
      this.queue.push({ type, data, timestamp, eventCount: this.eventCount });
    }
  }

  /**
   * Mark as ready and flush queue
   */
  ready(): void {
    this.isReady = true;
    this.queue.forEach(({ type, data, timestamp, eventCount }) => {
      this.dispatch(type, data, timestamp, eventCount);
    });
    this.queue = [];
  }

  /**
   * Add event listener
   */
  addListener(listener: (event: any) => void): void {
    this.listeners.add(listener);
  }

  /**
   * Remove event listener
   */
  removeListener(listener: (event: any) => void): void {
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

  private dispatch(type: string, data: any, timestamp: string, eventCount: number): void {
    const eventDetail = { type, data, timestamp, eventCount };
    this.listeners.forEach(listener => listener(eventDetail));
  }
}

// Global instance
export const analyticsEventQueue = new AnalyticsEventQueue();
