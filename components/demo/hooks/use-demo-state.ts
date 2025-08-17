import { useState, useRef, useEffect, useCallback } from "react";
import type { DemoMode } from "@/lib/demo/config";

/**
 * Demo state management hook with chatbot visibility control.
 * 
 * Features:
 * - Manages demo loading, welcome overlay, and walkthrough states
 * - Automatically hides Subsights chatbot during welcome sequence
 * - Uses MutationObserver to detect when chatbot appears in DOM
 * - Restores original chatbot visibility after welcome completion
 * - Handles cleanup and error cases gracefully
 */
interface UseDemoStateReturn {
    mode: DemoMode;
    isLoading: boolean;
    showWelcomeOverlay: boolean;
    showWalkthrough: boolean;
    settledRef: React.RefObject<boolean>;
    setMode: (mode: DemoMode) => void;
    setIsLoading: (loading: boolean) => void;
    markSuccess: (successMode: DemoMode) => void;
    setShowWelcomeOverlay: (show: boolean) => void;
    setShowWalkthrough: (show: boolean) => void;
}

// Initial state constants
const INITIAL_STATE = {
    mode: "default" as DemoMode,
    isLoading: true,
    showWelcomeOverlay: false,
    showWalkthrough: false,
    settled: false,
};

export function useDemoState(slug: string): UseDemoStateReturn {
    const [mode, setMode] = useState<DemoMode>(INITIAL_STATE.mode);
    const [isLoading, setIsLoading] = useState(INITIAL_STATE.isLoading);
    const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(INITIAL_STATE.showWelcomeOverlay);
    const [showWalkthrough, setShowWalkthrough] = useState(INITIAL_STATE.showWalkthrough);
    const settledRef = useRef(INITIAL_STATE.settled);

    // Store original chatbot visibility to restore later
    const originalChatbotVisibility = useRef<string | null>(null);
    const chatbotContainerRef = useRef<HTMLElement | null>(null);

    // Reset all state to initial values
    const resetState = useCallback(() => {
        setMode(INITIAL_STATE.mode);
        setIsLoading(INITIAL_STATE.isLoading);
        setShowWelcomeOverlay(INITIAL_STATE.showWelcomeOverlay);
        setShowWalkthrough(INITIAL_STATE.showWalkthrough);
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

    // Chatbot visibility management
    // Hacky way to hide the chatbot during the welcome sequence.
    // This only matters if the default mode is used on page load.
    useEffect(() => {
        let mutationObserver: MutationObserver | null = null;
        let chatbotElement: HTMLElement | null = null;

        const hideChatbot = () => {
            if (chatbotElement && originalChatbotVisibility.current === null) {
                try {
                    // Store original visibility
                    const computedStyle = window.getComputedStyle(chatbotElement);
                    originalChatbotVisibility.current = computedStyle.visibility;

                    // Hide the chatbot
                    chatbotElement.style.visibility = 'hidden';
                    console.log('[Demo] Chatbot hidden during welcome sequence');
                } catch (error) {
                    console.warn('[Demo] Failed to hide chatbot:', error);
                }
            }
        };

        const showChatbot = () => {
            if (chatbotElement && originalChatbotVisibility.current !== null) {
                try {
                    // Restore original visibility
                    chatbotElement.style.visibility = originalChatbotVisibility.current;
                    originalChatbotVisibility.current = null;
                    console.log('[Demo] Chatbot visibility restored');
                } catch (error) {
                    console.warn('[Demo] Failed to restore chatbot visibility:', error);
                }
            }
        };

        const findAndManageChatbot = () => {
            // Look for the chatbot container with multiple selectors for better coverage
            chatbotElement = document.querySelector('.subsights-chatbot-app-container') as HTMLElement ||
                document.querySelector('#subsights-chatbot') as HTMLElement ||
                document.querySelector('[class*="subsights-chatbot"]') as HTMLElement ||
                document.querySelector('[id*="subsights-chatbot"]') as HTMLElement;

            if (chatbotElement) {
                chatbotContainerRef.current = chatbotElement;

                // If welcome overlay is showing, hide the chatbot
                if (showWelcomeOverlay) {
                    hideChatbot();
                }

                // Stop observing once we found the chatbot
                if (mutationObserver) {
                    mutationObserver.disconnect();
                    mutationObserver = null;
                }
            }
        };

        // Set up mutation observer to watch for chatbot appearance
        if (typeof window !== 'undefined') {
            console.log('[Demo] Setting up chatbot visibility observer');

            mutationObserver = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    if (mutation.type === 'childList') {
                        for (const node of mutation.addedNodes) {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                const element = node as Element;

                                // Check if the added element is the chatbot or contains it
                                const isChatbot = element.classList?.contains('subsights-chatbot-app-container') ||
                                    element.id === 'subsights-chatbot' ||
                                    element.querySelector('.subsights-chatbot-app-container') ||
                                    element.querySelector('#subsights-chatbot') ||
                                    element.querySelector('[class*="subsights-chatbot"]') ||
                                    element.querySelector('[id*="subsights-chatbot"]');

                                if (isChatbot) {
                                    console.log('[Demo] Chatbot detected in DOM, managing visibility');
                                    findAndManageChatbot();
                                    break;
                                }
                            }
                        }
                    }
                }
            });

            // Start observing
            mutationObserver.observe(document.body, {
                childList: true,
                subtree: true
            });

            // Also check if chatbot is already present
            findAndManageChatbot();
        }

        // Cleanup function
        return () => {
            if (mutationObserver) {
                mutationObserver.disconnect();
            }
            // Restore chatbot visibility on cleanup
            showChatbot();
        };
    }, [showWelcomeOverlay]);

    // Handle welcome completion - show chatbot
    useEffect(() => {
        if (!showWelcomeOverlay && chatbotContainerRef.current && originalChatbotVisibility.current !== null) {
            try {
                const chatbotElement = chatbotContainerRef.current;
                chatbotElement.style.visibility = originalChatbotVisibility.current;
                originalChatbotVisibility.current = null;
                console.log('[Demo] Chatbot visibility restored after welcome completion');
            } catch (error) {
                console.warn('[Demo] Failed to restore chatbot visibility after welcome completion:', error);
                // Reset the reference if there was an error
                originalChatbotVisibility.current = null;
            }
        }
    }, [showWelcomeOverlay]);

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
        showWalkthrough,
        settledRef,
        setMode,
        setIsLoading,
        markSuccess,
        setShowWelcomeOverlay,
        setShowWalkthrough,
    };
}
