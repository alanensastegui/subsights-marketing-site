import { useState, useRef, useEffect } from "react";
import type { DemoMode } from "@/lib/demo/config";

interface UseDemoStateReturn {
    mode: DemoMode;
    isLoading: boolean;
    settledRef: React.RefObject<boolean>;
    setMode: (mode: DemoMode) => void;
    setIsLoading: (loading: boolean) => void;
    markSuccess: (successMode: DemoMode) => void;
}

export function useDemoState(slug: string): UseDemoStateReturn {
    const [mode, setMode] = useState<DemoMode>("default");
    const [isLoading, setIsLoading] = useState(true);
    const settledRef = useRef(false);

    // Reset all state when component mounts or slug changes
    useEffect(() => {
        // Reset to loading state every time component mounts or slug changes
        setMode("default");
        setIsLoading(true);
        settledRef.current = false;
    }, [slug]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Reset all state on unmount
            setIsLoading(false);
            setMode("default");
            settledRef.current = false;
        };
    }, []);

    const markSuccess = (successMode: DemoMode) => {
        if (settledRef.current) return;
        settledRef.current = true;
        setIsLoading(false);
        setMode(successMode);
    };

    return {
        mode,
        isLoading,
        settledRef,
        setMode,
        setIsLoading,
        markSuccess,
    };
}
