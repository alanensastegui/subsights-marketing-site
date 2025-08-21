"use client";

import Script from "next/script";

declare global {
  interface Window {
    trackingFunctions?: {
      onLoad: (opts: { appId: string }) => void;
    };
  }
}

type ApolloTrackerProps = {
  appId?: string;
};

const APOLLO_TRACKER_SRC = "https://assets.apollo.io/micro/website-tracker/tracker.iife.js";

export function ApolloTracker({ appId }: ApolloTrackerProps) {
  if (!appId) return null;
  return (
    <Script
      id="apollo-tracker"
      src={`${APOLLO_TRACKER_SRC}?nocache=${Math.random().toString(36).substring(7)}`}
      strategy="afterInteractive"
      onLoad={() => {
        window.trackingFunctions!.onLoad({ appId });
      }}
    />
  );
}

export default ApolloTracker;


