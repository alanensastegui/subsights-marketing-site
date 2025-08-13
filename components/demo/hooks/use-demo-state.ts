import { useState, useRef, useEffect, useCallback } from "react";
import type { DemoMode } from "@/lib/demo/config";

interface UseDemoStateReturn {
    mode: DemoMode;
    isLoading: boolean;
    showWelcomeOverlay: boolean;
    settledRef: React.RefObject<boolean>;
    setMode: (mode: DemoMode) => void;
    setIsLoading: (loading: boolean) => void;
    markSuccess: (successMode: DemoMode) => void;
    setShowWelcomeOverlay: (show: boolean) => void;
}

// Initial state constants
const INITIAL_STATE = {
    mode: "default" as DemoMode,
    isLoading: true,
    showWelcomeOverlay: false,
    settled: false,
};

export function useDemoState(slug: string): UseDemoStateReturn {
    const [mode, setMode] = useState<DemoMode>(INITIAL_STATE.mode);
    const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
    const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(INITIAL_STATE.showWelcomeOverlay);
    const settledRef = useRef(INITIAL_STATE.settled);

    // Reset all state to initial values
    const resetState = useCallback(() => {
        setMode(INITIAL_STATE.mode);
        setIsLoading(INITIAL_STATE.isLoading);
        setShowWelcomeOverlay(INITIAL_STATE.showWelcomeOverlay);
        settledRef.current = INITIAL_STATE.settled;
    }, []);

    // Reset state when component mounts or slug changes
    useEffect(() => {
        resetState();
    }, [slug, resetState]);

    // Cleanup on unmount
    useEffect(() => {
        return resetState;
    }, [resetState]);

    const markSuccess = useCallback((successMode: DemoMode) => {
        if (settledRef.current) return;

        settledRef.current = true;
        setIsLoading(false);
        setShowWelcomeOverlay(true); // Show welcome overlay after loading completes
        setMode(successMode);
    }, []);

    return {
        mode,
        isLoading,
        showWelcomeOverlay,
        settledRef,
        setMode,
        setIsLoading,
        markSuccess,
        setShowWelcomeOverlay,
    };
}
