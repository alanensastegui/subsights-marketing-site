"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Settings, Shield } from "lucide-react";
import {
  getConsentState,
  saveConsentState,
  isConsentRequired,
  getConsentBannerConfig,
  type ConsentState
} from "@/lib/analytics/consent";
import { useAnalytics } from "@/lib/analytics/context";

// ============================================================================
// CONSENT BANNER
// ============================================================================

export function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    analytics: false,
    advertising: false,
    functional: false,
    timestamp: Date.now(),
  });
  const { updateConsent: updateAnalyticsConsent } = useAnalytics();
  const config = getConsentBannerConfig();

  useEffect(() => {
    // Only show banner if consent is required for this region
    if (isConsentRequired()) {
      const currentConsent = getConsentState();
      const hasConsent = currentConsent.analytics || currentConsent.advertising || currentConsent.functional;

      if (!hasConsent) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent: ConsentState = {
      analytics: true,
      advertising: true,
      functional: true,
      timestamp: Date.now(),
    };

    setConsent(newConsent);
    saveConsentState(newConsent);
    updateAnalyticsConsent(true);
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    const newConsent: ConsentState = {
      analytics: false,
      advertising: false,
      functional: false,
      timestamp: Date.now(),
    };

    setConsent(newConsent);
    saveConsentState(newConsent);
    updateAnalyticsConsent(false);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    saveConsentState(consent);
    updateAnalyticsConsent(consent.analytics);
    setIsVisible(false);
  };

  const handleCategoryChange = (category: keyof ConsentState, value: boolean) => {
    setConsent(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="max-w-6xl mx-auto p-4">
        {!isExpanded ? (
          // Compact banner
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-medium text-sm">{config.title}</h3>
                <p className="text-xs text-muted-foreground">{config.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(true)}
              >
                <Settings className="h-4 w-4 mr-1" />
                {config.customize}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptEssential}
              >
                {config.acceptEssential}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
              >
                {config.acceptAll}
              </Button>
            </div>
          </div>
        ) : (
          // Expanded banner with detailed options
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  {config.title}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">{config.description}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Analytics Consent */}
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  id="analytics"
                  checked={consent.analytics}
                  onCheckedChange={(checked) =>
                    handleCategoryChange("analytics", checked as boolean)
                  }
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <label htmlFor="analytics" className="font-medium text-sm cursor-pointer">
                      {config.categories.analytics.title}
                    </label>
                    <Badge variant="secondary" className="text-xs">
                      Recommended
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {config.categories.analytics.description}
                  </p>
                </div>
              </div>

              {/* Advertising Consent */}
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  id="advertising"
                  checked={consent.advertising}
                  onCheckedChange={(checked) =>
                    handleCategoryChange("advertising", checked as boolean)
                  }
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <label htmlFor="advertising" className="font-medium text-sm cursor-pointer">
                      {config.categories.advertising.title}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {config.categories.advertising.description}
                  </p>
                </div>
              </div>

              {/* Functional Consent */}
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <Checkbox
                  id="functional"
                  checked={consent.functional}
                  onCheckedChange={(checked) =>
                    handleCategoryChange("functional", checked as boolean)
                  }
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <label htmlFor="functional" className="font-medium text-sm cursor-pointer">
                      {config.categories.functional.title}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {config.categories.functional.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={handleAcceptEssential}
                >
                  {config.acceptEssential}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsExpanded(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSavePreferences}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
