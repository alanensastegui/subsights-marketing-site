'use client';

import { motion, Variants, Transition } from 'framer-motion';
import * as React from 'react';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type AnimName = 'fadeIn' | 'slideUp' | 'zoomIn' | 'parallax' | 'typewriter' | 'scrollReveal' | 'counter';
export type Trigger = 'onLoad' | 'onVisible' | 'onScroll';

interface AnimationProps {
    name: AnimName;
    trigger?: Trigger;
    durationMs?: number;
    className?: string;
    children?: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
    delay?: number;
    disabled?: boolean;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const createVariants = (name: AnimName, duration: number, delay: number = 0): Variants => {
    const baseTransition: Transition = { duration: duration / 1000, delay: delay / 1000 };

    switch (name) {
        case 'fadeIn':
            return {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: baseTransition }
            };

        case 'slideUp':
            return {
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: baseTransition }
            };

        case 'zoomIn':
            return {
                hidden: { opacity: 0, scale: 0.95 },
                visible: { opacity: 1, scale: 1, transition: baseTransition }
            };

        case 'parallax':
            return {
                hidden: { y: 0 },
                visible: { y: 0, transition: baseTransition }
            };

        case 'typewriter':
            return {
                hidden: { width: 0 },
                visible: {
                    width: '100%',
                    transition: {
                        ...baseTransition,
                        duration: (duration / 1000) * 2 // Typewriter effect takes longer
                    }
                }
            };

        case 'scrollReveal':
            return {
                hidden: { opacity: 0, y: 50, rotateX: 15 },
                visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { ...baseTransition, type: 'spring', stiffness: 100 }
                }
            };

        case 'counter':
            return {
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { ...baseTransition, type: 'spring', bounce: 0.4 }
                }
            };

        default:
            return {
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: baseTransition }
            };
    }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function A({
    name,
    trigger = 'onVisible',
    durationMs = 700,
    className,
    children,
    threshold = 0.2,
    rootMargin = '0px',
    delay = 0,
    disabled = false
}: AnimationProps) {
    // Early return if disabled
    if (disabled) {
        return <>{children}</>;
    }

    // Create animation variants
    const variants = createVariants(name, durationMs, delay);

    // Handle different triggers
    if (trigger === 'onLoad') {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    if (trigger === 'onVisible') {
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                    amount: threshold,
                    margin: rootMargin,
                    once: true // Only animate once
                }}
                variants={variants}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    if (trigger === 'onScroll' && name === 'parallax') {
        return (
            <motion.div
                style={{ y: 0 }}
                whileInView={{ y: [-20, 20] }}
                transition={{
                    duration: durationMs / 1000,
                    type: 'spring',
                    stiffness: 50
                }}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    // Fallback for unsupported combinations
    return (
        <div className={className}>
            {children}
        </div>
    );
}

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

// Utility function to check if animations are supported
export const isAnimationSupported = (): boolean => {
    if (typeof window === 'undefined') return false;

    // Check for Framer Motion support
    try {
        return typeof motion !== 'undefined';
    } catch {
        return false;
    }
};

// Utility function to disable animations globally (for accessibility)
export const disableAnimationsGlobally = (): void => {
    if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--a-disabled', 'true');
    }
};

// Utility function to enable animations globally
export const enableAnimationsGlobally = (): void => {
    if (typeof document !== 'undefined') {
        document.documentElement.style.removeProperty('--a-disabled');
    }
};
