"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingShareButton() {
  const [shareStatus, setShareStatus] = useState<'idle' | 'sharing' | 'copied' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);

  const shareUrl = "https://www.subsights.com/demo/phoenix-2025";

  // Animate in after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    setShareStatus('sharing');

    try {
      // Try Web Share API first (mobile-friendly)
      if (navigator.share) {
        await navigator.share({
          title: 'Subsights Demo - Phoenix 2025',
          text: 'Check this out to help you get around the conference and Phoenix!',
          url: shareUrl,
        });
        setShareStatus('idle');
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2000);
      }
    } catch (error) {
      // Check if it's a user cancellation (AbortError) or actual error
      if (error instanceof Error && error.name === 'AbortError') {
        // User cancelled the share - just return to idle state
        setShareStatus('idle');
      } else {
        // Actual error occurred
        console.error('Share failed:', error);
        setShareStatus('error');
        setTimeout(() => setShareStatus('idle'), 2000);
      }
    }
  };

  const getShareButtonText = () => {
    switch (shareStatus) {
      case 'sharing': return 'Sharing...';
      case 'copied': return 'Copied!';
      case 'error': return 'Error';
      default: return 'Share';
    }
  };

  const getShareButtonVariant = () => {
    switch (shareStatus) {
      case 'copied': return 'default';
      case 'error': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.6
          }}
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
            <motion.div
              whileHover={{
                scale: 1.05,
                rotate: -1
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
            >
              <Button
                onClick={handleShare}
                variant={getShareButtonVariant()}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 min-w-[140px] justify-center backdrop-blur-sm"
                disabled={shareStatus === 'sharing'}
              >
                {shareStatus === 'sharing' ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : shareStatus === 'copied' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : shareStatus === 'error' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                )}
                <span className="text-base">{getShareButtonText()}</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
