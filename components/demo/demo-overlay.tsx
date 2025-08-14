"use client";

import { useState, useEffect } from "react";
import { Animate } from "@/components/ui/animate";
import { motion } from "framer-motion";

interface DemoOverlayProps {
  isLoading: boolean;
  onWelcomeComplete: () => void;
}

type OverlayPhase = 'loading' | 'transitioning' | 'welcome' | 'exiting';

// Animation timing constants
const TIMING = {
  TRANSITION_DELAY: 300,
  WELCOME_DISPLAY: 3000,
  EXIT_DELAY: 300,
  ANIMATION_DURATION: 0.3,
} as const;

// Welcome content
const WELCOME_COPY = {
  title: "Welcome to Your Subsights Demo",
  description: "Get ready to explore AI-powered customer service that qualifies leads, provides expert answers, and drives revenue 24/7",
} as const;

export function DemoOverlay({ isLoading, onWelcomeComplete }: DemoOverlayProps) {
  const [phase, setPhase] = useState<OverlayPhase>('loading');

  // Transition from loading to welcome when demo finishes loading
  useEffect(() => {
    if (!isLoading && phase === 'loading') {
      setPhase('transitioning');
      setTimeout(() => setPhase('welcome'), TIMING.TRANSITION_DELAY);
    }
  }, [isLoading, phase]);

  // Show welcome, then exit
  useEffect(() => {
    if (phase === 'welcome') {
      setTimeout(() => {
        setPhase('exiting');
        setTimeout(() => {
          onWelcomeComplete();
        }, 300);
      }, TIMING.WELCOME_DISPLAY);
    }
  }, [phase, onWelcomeComplete]);

  const LoadingContent = () => (
    <Animate name="scaleIn" trigger="onLoad" duration={400}>
      <div className="text-center space-y-6 max-w-lg">
        {/* Enhanced Spinner */}
        <div className="relative">
          <div className="animate-spin h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto" />
          <div className="absolute inset-0 animate-pulse">
            <div className="h-12 w-12 border-4 border-primary/30 border-t-transparent rounded-full mx-auto" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <p className="text-xl font-semibold text-foreground">Loading your Subsights Demo</p>
          <p className="text-sm text-muted-foreground">Preparing your personalized experience...</p>
        </div>
      </div>
    </Animate>
  );

  const WelcomeContent = ({ phase }: { phase: OverlayPhase }) => {
    const baseContent = (
      <div className="text-center space-y-4 max-w-lg">
        <h1 className="text-3xl font-bold text-foreground">{WELCOME_COPY.title}</h1>
        <p className="text-lg text-muted-foreground">{WELCOME_COPY.description}</p>
      </div>
    );

    switch (phase) {
      case 'transitioning':
        return <div className="opacity-0">{baseContent}</div>;

      case 'welcome':
        return (
          <Animate name="bounceIn" trigger="onLoad" duration={500}>
            {baseContent}
          </Animate>
        );

      case 'exiting':
        return (
          <Animate name="bounceOut" trigger="onLoad" duration={300}>
            {baseContent}
          </Animate>
        );

      default:
        return null;
    }
  };

  // Animation state values
  const getOverlayOpacity = () => {
    switch (phase) {
      case 'loading': return 1;
      case 'transitioning': return 0.95;
      case 'welcome': return 0.95;
      case 'exiting': return 0;
      default: return 1;
    }
  };

  const getContentState = () => {
    switch (phase) {
      case 'loading': return { opacity: 1, scale: 1 };
      case 'transitioning': return { opacity: 0, scale: 0.95 };
      case 'welcome': return { opacity: 1, scale: 1 };
      case 'exiting': return { opacity: 0, scale: 0.95 };
      default: return { opacity: 1, scale: 1 };
    }
  };

  return (
    <motion.div
      className="absolute inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: getOverlayOpacity() }}
      transition={{ duration: TIMING.ANIMATION_DURATION }}
      aria-busy={phase === 'loading'}
      role="status"
      aria-live="polite"
      data-testid="demo-overlay"
    >
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={getContentState()}
        transition={{ duration: TIMING.ANIMATION_DURATION }}
      >
        {phase === 'loading' ? (
          <LoadingContent />
        ) : (
          <WelcomeContent phase={phase} />
        )}
      </motion.div>
    </motion.div>
  );
}
