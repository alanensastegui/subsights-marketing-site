'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  hoverToPlay?: boolean;
  restartOnAutoPause?: boolean;
  autoplayThreshold?: number;
}

export default function VideoPlayer({
  onEnded,
  onLoadStart,
  onPlay,
  onPause,
  onTimeUpdate,
  hoverToPlay = false,
  restartOnAutoPause = false,
  autoplayThreshold = 0.2,
  muted,
  ...videoProps
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadedSource, setLoadedSource] = useState<VideoPlayerProps['src']>();
  const [playError, setPlayError] = useState(false);
  const manualPlayPending = useRef<VideoPlayerProps['src'] | null>(null);
  const playAttempt = useRef(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wasAutoPausedRef = useRef(false);
  const hasBeenSeenRef = useRef(false);
  const wasManuallyPausedRef = useRef(false);

  // Treat autoPlay as intent, not a native prop; do not forward it to <video>
  const { autoPlay: shouldAutoPlay, src, ...restVideoProps } = videoProps;
  const hasLoaded = !!src && loadedSource === src;
  useEffect(() => {
    wasManuallyPausedRef.current = false;
    setIsPlaying(false);
    setPlayError(false);
    return () => {
      playAttempt.current += 1;
    };
  }, [src]);

  const playVideo = useCallback(
    (manual = false) => {
      setPlayError(false);
      if (!hasLoaded) {
        manualPlayPending.current = manual ? (src ?? null) : null;
        setLoadedSource(src);
        return;
      }
      const attempt = ++playAttempt.current;
      const failed = () => {
        if (attempt !== playAttempt.current) return;
        wasManuallyPausedRef.current = true;
        setIsPlaying(false);
        if (manual) setPlayError(true);
      };
      try {
        videoRef.current?.play().catch(failed);
      } catch {
        failed();
      }
    },
    [hasLoaded, src]
  );

  useEffect(() => {
    if (hasLoaded && manualPlayPending.current === src) {
      manualPlayPending.current = null;
      playVideo(true);
    }
  }, [hasLoaded, src, playVideo]);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      wasManuallyPausedRef.current = true;
    } else {
      wasManuallyPausedRef.current = false;
      playVideo(true);
    }
  };

  const handlePlay = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setIsPlaying(true);
    wasManuallyPausedRef.current = false;
    onPlay?.(event);
  };

  const handlePause = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    setIsPlaying(false);
    onPause?.(event);
  };

  const handleEnded = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    onEnded?.(event);
  };

  const handleLoadStart = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    setProgress(0);
    wasManuallyPausedRef.current = false;
    onLoadStart?.(event);
  };

  const handleTimeUpdate = (
    event: React.SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
    onTimeUpdate?.(event);
  };

  const handleMouseEnter = () => {
    if (hoverToPlay && videoRef.current) {
      playVideo(true);
    }
  };

  const handleMouseLeave = () => {
    if (hoverToPlay && videoRef.current) {
      manualPlayPending.current = null;
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to beginning
    }
  };

  // Intersection Observer for viewport-based auto-pause/resume
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible =
            entry.isIntersecting &&
            entry.intersectionRatio >= autoplayThreshold;
          const reduceMotion = window.matchMedia?.(
            '(prefers-reduced-motion: reduce)'
          ).matches;

          if (videoRef.current) {
            if (!isVisible && isPlaying && hasBeenSeenRef.current) {
              // Video went out of view and is playing - auto-pause
              videoRef.current.pause();
              wasAutoPausedRef.current = true;
              // Restart from beginning if restartOnAutoPause is enabled
              if (restartOnAutoPause) {
                videoRef.current.currentTime = 0;
              }
            } else if (isVisible && wasAutoPausedRef.current && !isPlaying) {
              // Video came back into view and was auto-paused - resume
              if (!reduceMotion) playVideo();
              wasAutoPausedRef.current = false;
            } else if (
              isVisible &&
              !isPlaying &&
              shouldAutoPlay &&
              !wasManuallyPausedRef.current
            ) {
              // Only auto-play if the video wasn't manually paused
              if (!reduceMotion) playVideo();
            }
          }

          if (isVisible) {
            hasBeenSeenRef.current = true;
          }
        });
      },
      {
        threshold: autoplayThreshold,
        rootMargin: '0px',
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [
    isPlaying,
    hasLoaded,
    shouldAutoPlay,
    restartOnAutoPause,
    autoplayThreshold,
    playVideo,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        {...restVideoProps}
        src={hasLoaded ? src : undefined}
        preload={restVideoProps.preload ?? 'none'}
        muted={muted ?? (shouldAutoPlay ? true : undefined)}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadStart={handleLoadStart}
      />

      {/* Sleek Pause/Play Button with Progress Ring */}
      {playError && (
        <p
          role="status"
          className="absolute top-2 left-2 right-2 rounded bg-background/90 p-2 text-sm"
        >
          Video couldn&apos;t play. Try play again.
        </p>
      )}
      <button
        type="button"
        onClick={togglePlayPause}
        className="absolute bottom-2 left-2 z-20 opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        <div className="relative">
          {/* Progress Ring */}
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48" fill="none">
            {/* Background circle */}
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="2"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="rgba(255, 255, 255, 0.8)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 20}`}
              strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
              className="transition-all duration-100 ease-linear"
            />
          </svg>

          {/* Button */}
          <div className="absolute inset-0 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 hover:border-white/20 transition-all duration-200 ease-in-out hover:scale-105 top-1 left-1">
            {isPlaying ? (
              // Pause icon
              <svg
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              // Play icon
              <svg
                className="w-4 h-4 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}
