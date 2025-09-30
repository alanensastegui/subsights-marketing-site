// ============================================================================
// BOT TRAFFIC FILTERING UTILITIES
// ============================================================================

import type { BotDetectionResult } from "./bot-detection";

/**
 * Configuration for bot traffic filtering
 */
export interface BotFilterConfig {
  /** Exclude bots with confidence above this threshold */
  minConfidenceThreshold?: number;
  /** Bot types to exclude (if not specified, excludes all detected bots) */
  excludeBotTypes?: string[];
  /** Whether to exclude all detected bots regardless of type */
  excludeAllBots?: boolean;
}

/**
 * Filter analytics events based on bot detection results
 */
export function filterBotTraffic<T extends { bot_detected?: boolean; bot_confidence?: number; bot_type?: string }>(
  events: T[],
  config: BotFilterConfig = {}
): T[] {
  const {
    minConfidenceThreshold = 70,
    excludeBotTypes = [],
    excludeAllBots = true,
  } = config;

  return events.filter(event => {
    // If no bot detection data, include the event
    if (event.bot_detected === undefined || event.bot_confidence === undefined) {
      return true;
    }

    // If not detected as bot, include the event
    if (!event.bot_detected) {
      return true;
    }

    // If confidence is below threshold, include the event
    if (event.bot_confidence < minConfidenceThreshold) {
      return true;
    }

    // If excluding all bots, filter out this event
    if (excludeAllBots) {
      return false;
    }

    // If specific bot types to exclude are specified
    if (excludeBotTypes.length > 0 && event.bot_type) {
      return !excludeBotTypes.includes(event.bot_type);
    }

    return true;
  });
}

/**
 * Calculate bot traffic percentage in a dataset
 */
export function calculateBotTrafficPercentage<T extends { bot_detected?: boolean; bot_confidence?: number }>(
  events: T[],
  minConfidenceThreshold: number = 70
): number {
  if (events.length === 0) return 0;

  const botEvents = events.filter(event =>
    event.bot_detected === true &&
    (event.bot_confidence || 0) >= minConfidenceThreshold
  );

  return (botEvents.length / events.length) * 100;
}

/**
 * Get bot traffic summary statistics
 */
export function getBotTrafficSummary<T extends { bot_detected?: boolean; bot_confidence?: number; bot_type?: string }>(
  events: T[],
  minConfidenceThreshold: number = 70
) {
  const totalEvents = events.length;
  const botEvents = events.filter(event =>
    event.bot_detected === true &&
    (event.bot_confidence || 0) >= minConfidenceThreshold
  );

  const botPercentage = totalEvents > 0 ? (botEvents.length / totalEvents) * 100 : 0;

  // Group bots by type
  const botTypes: Record<string, number> = {};
  botEvents.forEach(event => {
    const type = event.bot_type || 'unknown';
    botTypes[type] = (botTypes[type] || 0) + 1;
  });

  return {
    totalEvents,
    botEvents: botEvents.length,
    humanEvents: totalEvents - botEvents.length,
    botPercentage,
    botBreakdown: botTypes,
  };
}

/**
 * Create a filter function for real-time bot filtering
 */
export function createBotFilter(config: BotFilterConfig = {}) {
  return <T extends { bot_detected?: boolean; bot_confidence?: number; bot_type?: string }>(events: T[]): T[] => {
    return filterBotTraffic(events, config);
  };
}

/**
 * Check if an event should be included based on bot detection
 */
export function shouldIncludeEvent(event: {
  bot_detected?: boolean;
  bot_confidence?: number;
  bot_type?: string;
}, config: BotFilterConfig = {}): boolean {
  const filtered = filterBotTraffic([event], config);
  return filtered.length > 0;
}
