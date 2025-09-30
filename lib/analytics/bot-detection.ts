// ============================================================================
// BOT DETECTION SYSTEM
// ============================================================================

export type BotDetectionResult = {
  isBot: boolean;
  confidence: number; // 0-100
  reasons: string[];
  botType?: 'crawler' | 'scraper' | 'spam' | 'automated' | 'suspicious';
};

export type BotDetectionConfig = {
  strictMode?: boolean;
  minConfidenceThreshold?: number;
  enableLogging?: boolean;
  whitelistUserAgents?: string[];
  blacklistUserAgents?: string[];
};

/**
 * Comprehensive bot detection system
 */
export class BotDetector {
  private config: Required<BotDetectionConfig>;

  constructor(config: BotDetectionConfig = {}) {
    this.config = {
      strictMode: config.strictMode ?? false,
      minConfidenceThreshold: config.minConfidenceThreshold ?? 70,
      enableLogging: config.enableLogging ?? true,
      whitelistUserAgents: config.whitelistUserAgents ?? [],
      blacklistUserAgents: config.blacklistUserAgents ?? [],
      ...config,
    };
  }

  /**
   * Detect if current visitor is likely a bot
   */
  detect(): BotDetectionResult {
    if (typeof window === 'undefined') {
      return { isBot: false, confidence: 0, reasons: ['server-side'] };
    }

    const detections: Array<{ isBot: boolean; confidence: number; reason: string }> = [];

    // 1. User Agent Analysis
    detections.push(this.detectByUserAgent());

    // 2. Browser Fingerprinting
    detections.push(this.detectByBrowserFeatures());

    // 3. Behavioral Analysis
    detections.push(this.detectByBehavior());

    // 4. Connection Analysis
    detections.push(this.detectByConnection());

    // 5. Automation Detection
    detections.push(this.detectAutomation());

    // Calculate final result
    const botScore = this.calculateBotScore(detections);
    const isBot = botScore >= this.config.minConfidenceThreshold;

    const result: BotDetectionResult = {
      isBot,
      confidence: botScore,
      reasons: detections.filter(d => d.isBot).map(d => d.reason),
    };

    // Determine bot type if detected as bot
    if (isBot) {
      result.botType = this.classifyBotType(detections);
    }

    // Log detection if enabled
    if (this.config.enableLogging && isBot) {
      console.warn('Bot detected:', result);
    }

    return result;
  }

  private detectByUserAgent(): { isBot: boolean; confidence: number; reason: string } {
    const userAgent = navigator.userAgent.toLowerCase();

    // Whitelist check first
    if (this.config.whitelistUserAgents.some(pattern =>
      userAgent.includes(pattern.toLowerCase())
    )) {
      return { isBot: false, confidence: 0, reason: 'whitelisted_user_agent' };
    }

    // Blacklist check
    if (this.config.blacklistUserAgents.some(pattern =>
      userAgent.includes(pattern.toLowerCase())
    )) {
      return { isBot: true, confidence: 95, reason: 'blacklisted_user_agent' };
    }

    // Known bot patterns
    const botPatterns = [
      // Crawlers and spiders
      { pattern: /bot|crawler|spider|crawling/i, confidence: 90, reason: 'crawler_user_agent' },
      { pattern: /googlebot|bingbot|yandexbot|duckduckbot|baiduspider/i, confidence: 95, reason: 'search_engine_bot' },
      { pattern: /facebookexternalhit|twitterbot|linkedinbot/i, confidence: 85, reason: 'social_media_bot' },
      { pattern: /slackbot|discordbot|telegrambot/i, confidence: 80, reason: 'messaging_bot' },

      // Scrapers and automated tools
      { pattern: /wget|curl|python-requests|go-http-client|java\/\d/i, confidence: 90, reason: 'automated_tool' },
      { pattern: /scrapy|beautifulsoup|selenium|phantomjs|puppeteer/i, confidence: 95, reason: 'scraping_tool' },

      // Monitoring and analytics
      { pattern: /uptime|monitoring|pingdom|newrelic|datadog/i, confidence: 85, reason: 'monitoring_bot' },
      { pattern: /ahrefsbot|semrushbot|majestic12|moz\.com/i, confidence: 90, reason: 'seo_analysis_bot' },

      // Suspicious patterns
      { pattern: /headless|phantom|selenium/i, confidence: 80, reason: 'headless_browser' },
      { pattern: /\+\+\+\+\+\+|test|scan/i, confidence: 70, reason: 'suspicious_pattern' },
    ];

    for (const { pattern, confidence, reason } of botPatterns) {
      if (pattern.test(userAgent)) {
        return { isBot: true, confidence, reason };
      }
    }

    return { isBot: false, confidence: 0, reason: 'normal_user_agent' };
  }

  private detectByBrowserFeatures(): { isBot: boolean; confidence: number; reason: string } {
    const features = {
      hasNotifications: 'Notification' in window,
      hasServiceWorker: 'serviceWorker' in navigator,
      hasWebRTC: 'RTCPeerConnection' in window,
      hasLocalStorage: 'localStorage' in window,
      hasSessionStorage: 'sessionStorage' in window,
      hasIndexedDB: 'indexedDB' in window,
      hasWebGL: this.hasWebGL(),
      hasAudioContext: 'AudioContext' in window || 'webkitAudioContext' in window,
      hasMediaDevices: 'mediaDevices' in navigator,
      hasPermissions: 'permissions' in navigator,
      hasPlugins: 'plugins' in navigator && navigator.plugins.length > 0,
      hasUserMedia: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    };

    // Count missing "human" features
    const missingHumanFeatures = Object.values(features).filter(f => !f).length;
    const totalFeatures = Object.keys(features).length;

    // Bots often lack human-centric browser features
    const missingRatio = missingHumanFeatures / totalFeatures;

    if (missingRatio > 0.6) {
      return {
        isBot: true,
        confidence: Math.min(85, 60 + (missingRatio * 40)),
        reason: 'missing_browser_features'
      };
    }

    return { isBot: false, confidence: 0, reason: 'normal_browser_features' };
  }

  private detectByBehavior(): { isBot: boolean; confidence: number; reason: string } {
    const behaviors = {
      // Check for rapid interactions (bots often click very fast)
      rapidClicks: this.detectRapidClicks(),

      // Check for programmatic navigation (bots often don't scroll naturally)
      unnaturalScroll: this.detectUnnaturalScroll(),

      // Check for missing mouse movements (bots often don't move mouse)
      noMouseMovement: this.detectNoMouseMovement(),

      // Check for consistent timing (bots often have perfect timing)
      perfectTiming: this.detectPerfectTiming(),

      // Check for form filling patterns
      suspiciousFormFilling: this.detectSuspiciousFormFilling(),
    };

    const botBehaviors = Object.values(behaviors).filter(b => b.isBot);
    const avgConfidence = botBehaviors.length > 0
      ? botBehaviors.reduce((sum, b) => sum + b.confidence, 0) / botBehaviors.length
      : 0;

    if (botBehaviors.length >= 2) {
      return {
        isBot: true,
        confidence: Math.min(90, avgConfidence),
        reason: 'multiple_suspicious_behaviors'
      };
    } else if (botBehaviors.length === 1) {
      return botBehaviors[0];
    }

    return { isBot: false, confidence: 0, reason: 'normal_behavior' };
  }

  private detectByConnection(): { isBot: boolean; confidence: number; reason: string } {
    // Check for suspicious connection patterns
    const connection = (navigator as any).connection;
    const suspiciousConnections = [];

    if (connection) {
      // Very slow connections might be bots on poor networks
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        suspiciousConnections.push('slow_connection');
      }

      // Bots sometimes use datacenter IPs (though this is hard to detect client-side)
      if (connection.saveData) {
        suspiciousConnections.push('save_data_mode');
      }
    }

    // Check for suspicious headers (if accessible)
    try {
      // This is a basic check - in reality you'd need server-side detection for most headers
      const suspiciousHeaders = this.detectSuspiciousHeaders();
      suspiciousConnections.push(...suspiciousHeaders);
    } catch (e) {
      // Headers not accessible
    }

    if (suspiciousConnections.length >= 2) {
      return {
        isBot: true,
        confidence: 60,
        reason: 'suspicious_connection_patterns'
      };
    }

    return { isBot: false, confidence: 0, reason: 'normal_connection' };
  }

  private detectAutomation(): { isBot: boolean; confidence: number; reason: string } {
    // Check for automation frameworks
    const automationSigns = [];

    // Check for common automation properties
    if ((window as any).__webdriver_evaluate) automationSigns.push('webdriver_evaluate');
    if ((window as any).__selenium_evaluate) automationSigns.push('selenium_evaluate');
    if ((window as any).__webdriver_script_function) automationSigns.push('webdriver_script');
    if ((window as any).__webdriver_script_func) automationSigns.push('webdriver_script_func');
    if ((window as any).__fxdriver_evaluate) automationSigns.push('firefox_driver');
    if ((window as any).__driver_unwrapped) automationSigns.push('driver_unwrapped');
    if ((window as any).__webdriver_unwrapped) automationSigns.push('webdriver_unwrapped');
    if ((window as any).__fxdriver_unwrapped) automationSigns.push('firefox_driver_unwrapped');
    if ((window as any).__driver_evaluate) automationSigns.push('driver_evaluate');
    if ((window as any).__selenium_unwrapped) automationSigns.push('selenium_unwrapped');
    if ((window as any).__fxdriver_script_function) automationSigns.push('firefox_driver_script');

    // Check for Chrome DevTools Protocol
    if ((window as any).chrome && (window as any).chrome.runtime && (window as any).chrome.runtime.onConnect) {
      automationSigns.push('chrome_runtime_api');
    }

    // Check for headless browser properties
    if (navigator.webdriver) automationSigns.push('navigator_webdriver');

    if (automationSigns.length >= 3) {
      return {
        isBot: true,
        confidence: 95,
        reason: 'automation_framework_detected'
      };
    } else if (automationSigns.length >= 1) {
      return {
        isBot: true,
        confidence: 80,
        reason: 'possible_automation'
      };
    }

    return { isBot: false, confidence: 0, reason: 'no_automation_detected' };
  }

  private calculateBotScore(detections: Array<{ isBot: boolean; confidence: number; reason: string }>): number {
    const botDetections = detections.filter(d => d.isBot);
    if (botDetections.length === 0) return 0;

    // Weighted average based on detection method reliability
    const weights = {
      'crawler_user_agent': 0.3,
      'search_engine_bot': 0.3,
      'automation_framework_detected': 0.25,
      'multiple_suspicious_behaviors': 0.2,
      'scraping_tool': 0.15,
      'missing_browser_features': 0.1,
    };

    let weightedSum = 0;
    let totalWeight = 0;

    for (const detection of botDetections) {
      const weight = weights[detection.reason as keyof typeof weights] || 0.05;
      weightedSum += detection.confidence * weight;
      totalWeight += weight;
    }

    return totalWeight > 0 ? Math.min(100, weightedSum / totalWeight) : 0;
  }

  private classifyBotType(detections: Array<{ isBot: boolean; confidence: number; reason: string }>): BotDetectionResult['botType'] {
    const reasons = detections.filter(d => d.isBot).map(d => d.reason);

    if (reasons.some(r => r.includes('crawler') || r.includes('search_engine'))) {
      return 'crawler';
    }
    if (reasons.some(r => r.includes('scraping') || r.includes('automation'))) {
      return 'scraper';
    }
    if (reasons.some(r => r.includes('spam') || r.includes('suspicious'))) {
      return 'spam';
    }
    if (reasons.some(r => r.includes('monitoring'))) {
      return 'automated';
    }

    return 'suspicious';
  }

  // Helper methods for behavioral detection
  private detectRapidClicks(): { isBot: boolean; confidence: number; reason: string } {
    // This would need to be implemented with event tracking
    // For now, return normal
    return { isBot: false, confidence: 0, reason: 'normal_click_timing' };
  }

  private detectUnnaturalScroll(): { isBot: boolean; confidence: number; reason: string } {
    // Implementation would track scroll patterns
    return { isBot: false, confidence: 0, reason: 'normal_scroll_behavior' };
  }

  private detectNoMouseMovement(): { isBot: boolean; confidence: number; reason: string } {
    // Implementation would track mouse movement
    return { isBot: false, confidence: 0, reason: 'normal_mouse_behavior' };
  }

  private detectPerfectTiming(): { isBot: boolean; confidence: number; reason: string } {
    // Implementation would track timing patterns
    return { isBot: false, confidence: 0, reason: 'normal_timing' };
  }

  private detectSuspiciousFormFilling(): { isBot: boolean; confidence: number; reason: string } {
    // Implementation would track form interaction patterns
    return { isBot: false, confidence: 0, reason: 'normal_form_behavior' };
  }

  private hasWebGL(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }

  private detectSuspiciousHeaders(): string[] {
    // Basic implementation - in reality you'd need server-side detection
    return [];
  }
}

/**
 * Global bot detector instance
 */
export const botDetector = new BotDetector();

/**
 * Quick bot detection check
 */
export function isLikelyBot(): boolean {
  return botDetector.detect().isBot;
}

/**
 * Get detailed bot detection result
 */
export function getBotDetectionResult(): BotDetectionResult {
  return botDetector.detect();
}
