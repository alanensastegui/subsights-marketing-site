"use client";

import React from "react";
import { useBotDetection } from "../context";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Bot Detection Status Component
 * Shows current bot detection status and details
 */
export function BotDetectionStatus() {
  const botDetection = useBotDetection();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-red-500";
    if (confidence >= 60) return "bg-yellow-500";
    if (confidence >= 40) return "bg-blue-500";
    return "bg-green-500";
  };

  const getBotTypeIcon = (type?: string) => {
    switch (type) {
      case 'crawler': return '🕷️';
      case 'scraper': return '🤖';
      case 'spam': return '🚫';
      case 'automated': return '⚙️';
      case 'suspicious': return '⚠️';
      default: return '❓';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          Bot Detection Status
          {botDetection.isBot && (
            <Badge variant="destructive" className="text-xs">
              BOT DETECTED
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Bot Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <div className="flex items-center gap-2">
            {botDetection.isBot ? (
              <>
                <span className="text-red-600 font-medium">Bot</span>
                {botDetection.botType && (
                  <span className="text-lg">
                    {getBotTypeIcon(botDetection.botType)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-green-600 font-medium">Human</span>
            )}
          </div>
        </div>

        {/* Confidence Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Confidence:</span>
            <span className="text-sm font-medium">{botDetection.confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getConfidenceColor(botDetection.confidence)}`}
              style={{ width: `${botDetection.confidence}%` }}
            />
          </div>
        </div>

        {/* Detection Reasons */}
        {botDetection.reasons.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Detection Reasons:</span>
            <div className="flex flex-wrap gap-1">
              {botDetection.reasons.map((reason, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {reason.replace(/_/g, ' ')}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Bot Type */}
        {botDetection.botType && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Type:</span>
            <Badge variant="secondary" className="text-xs">
              {botDetection.botType.charAt(0).toUpperCase() + botDetection.botType.slice(1)}
            </Badge>
          </div>
        )}

        {/* Additional Info */}
        <div className="pt-2 border-t text-xs text-muted-foreground">
          Bot detection helps filter automated traffic from your analytics data
        </div>
      </CardContent>
    </Card>
  );
}
