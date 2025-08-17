"use client";

import { useState, useEffect } from "react";
import { Animate } from "@/components/ui/animate";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import SpacePortal, { type SpacePortalPhase } from "./demo-space-portal";

interface DemoOverlayProps {
  isLoading: boolean;
  onWelcomeComplete: () => void;
  slug: string;
}

type OverlayPhase = 'loading' | 'transitioning' | 'welcome' | 'preparing' | 'exiting';

// Animation timing constants
const TIMING = {
  TRANSITION_DELAY: 300,
  WELCOME_DISPLAY: 3000,
  PREPARING_DISPLAY: 2500, // Time to show "Prepare for launch..."
  EXIT_DELAY: 300,
  ANIMATION_DURATION: 0.3,
} as const;

// Welcome content
const WELCOME_COPY = {
  title: "Welcome to Your Subsights Demo",
  description: "Get ready to explore AI-powered customer service",
} as const;

export function DemoOverlay({ isLoading, onWelcomeComplete, slug }: DemoOverlayProps) {
  const [phase, setPhase] = useState<OverlayPhase>('loading');
  const [portalPhase, setPortalPhase] = useState<SpacePortalPhase>('idle');
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  // Check if user has seen welcome before
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const welcomeSeen = localStorage.getItem(`${slug}DemoWelcomeSeen`) === 'true';
      setHasSeenWelcome(welcomeSeen);
    }
  }, [slug]);

  // Transition from loading to welcome when demo finishes loading
  useEffect(() => {
    if (!isLoading && phase === 'loading') {
      setPhase('transitioning');
      setTimeout(() => {
        setPhase('welcome');
        setPortalPhase('idle'); // Portal shows idle effect during welcome
      }, TIMING.TRANSITION_DELAY);
    }
  }, [isLoading, phase]);

  // Show welcome, then prepare, then exit
  useEffect(() => {
    if (phase === 'welcome') {
      // Mark that user has seen the welcome
      if (typeof window !== 'undefined') {
        localStorage.setItem(`${slug}DemoWelcomeSeen`, 'true');
      }

      setTimeout(() => {
        setPhase('preparing');
        setPortalPhase('preparing');
        setTimeout(() => {
          setPhase('exiting');
          setPortalPhase('jumping');
          setTimeout(() => {
            setPortalPhase('cooldown');
            setTimeout(() => {
              onWelcomeComplete();
            }, 600); // Cooldown duration
          }, 2000); // Jump duration
        }, TIMING.PREPARING_DISPLAY);
      }, TIMING.WELCOME_DISPLAY);
    }
  }, [phase, onWelcomeComplete, slug]);

  const handleSkip = () => {
    // Add a small delay to make the skip feel more intentional
    setTimeout(() => {
      onWelcomeComplete();
    }, 100);
  };

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
        <motion.h1
          className="text-3xl font-bold text-foreground"
          animate={{
            textShadow: [
              "0 0 5px var(--primary)",
              "0 0 15px var(--primary)",
              "0 0 5px var(--primary)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {WELCOME_COPY.title}
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground"
          animate={{
            opacity: [1, 0.8, 1],
            textShadow: [
              "0 0 2px var(--muted-foreground)",
              "0 0 8px var(--muted-foreground)",
              "0 0 2px var(--muted-foreground)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {WELCOME_COPY.description}
        </motion.p>
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

      case 'preparing':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="text-center space-y-4 max-w-lg">
              <motion.h1
                className="text-3xl font-bold text-foreground"
                animate={{
                  textShadow: [
                    "0 0 5px var(--primary)",
                    "0 0 15px var(--primary)"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                Prepare for Launch
              </motion.h1>
              <motion.p
                className="text-lg text-muted-foreground"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Initiating space-time transition sequence
              </motion.p>
            </div>
          </motion.div>
        );

      case 'exiting':
        return (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            {/* No text content - just let the portal effect be the focus */}
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Animation state values
  const getOverlayOpacity = () => {
    switch (phase) {
      case 'loading': return 1;
      case 'transitioning': return 1;
      case 'welcome': return 1;
      case 'preparing': return 1;
      case 'exiting': return 1; // Keep overlay visible during portal effect
      default: return 1;
    }
  };

  const getContentState = () => {
    switch (phase) {
      case 'loading': return { opacity: 1, scale: 1 };
      case 'transitioning': return { opacity: 0, scale: 0.95 };
      case 'welcome': return { opacity: 1, scale: 1 };
      case 'preparing': return { opacity: 1, scale: 1 };
      case 'exiting': return { opacity: 1, scale: 1 }; // Keep content visible for portal effect
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
      {/* Space Portal Effect - Always present, different phases for different overlay states */}
      <SpacePortal
        phase={portalPhase}
        intensity="full"
        onJumpEnd={() => {
          // Portal jump animation completed
        }}
      />

      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={getContentState()}
        transition={{ duration: TIMING.ANIMATION_DURATION }}
        className="relative z-10"
      >
        {phase === 'loading' ? (
          <LoadingContent />
        ) : (
          <WelcomeContent phase={phase} />
        )}
      </motion.div>

      {/* Skip Button - Only show if user has seen welcome before and not in loading/transitioning phases */}
      {hasSeenWelcome && phase !== 'loading' && phase !== 'transitioning' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 4px 20px rgba(0, 0, 0, 0.1)",
                "0 8px 30px rgba(0, 0, 0, 0.15)",
                "0 4px 20px rgba(0, 0, 0, 0.1)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleSkip}
              className="bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background/90 text-muted-foreground hover:text-foreground transition-all duration-200 shadow-lg hover:shadow-xl px-6 py-2 rounded-full border-2 hover:border-primary/30 hover:bg-primary/5"
              aria-label="Skip welcome sequence and go directly to demo"
            >
              <span className="text-sm font-medium">Skip to Demo</span>
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
