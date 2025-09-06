"use client";

import { useState, useRef } from "react";

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  hoverToPlay?: boolean;
}

export default function VideoPlayer({
  onEnded,
  onLoadStart,
  onPlay,
  onPause,
  onTimeUpdate,
  hoverToPlay = false,
  ...videoProps
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(videoProps.autoPlay ?? false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePlay = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setIsPlaying(true);
    onPlay?.(event);
  };

  const handlePause = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setIsPlaying(false);
    onPause?.(event);
  };

  const handleEnded = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    onEnded?.(event);
  };

  const handleLoadStart = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    setProgress(0);
    setIsPlaying(true);
    onLoadStart?.(event);
  };

  const handleTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
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
      console.log("Playing video");
      videoRef.current.play().catch(() => {
        // Silently handle autoplay restrictions
      });
    }
  };

  const handleMouseLeave = () => {
    if (hoverToPlay && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to beginning
    }
  };

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        {...videoProps}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onLoadStart={handleLoadStart}
      />

      {/* Sleek Pause/Play Button with Progress Ring */}
      <button
        onClick={togglePlayPause}
        className="absolute bottom-2 left-2 z-20 opacity-60 hover:opacity-100 transition-all duration-300 ease-in-out"
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        <div className="relative">
          {/* Progress Ring */}
          <svg
            className="w-12 h-12 -rotate-90"
            viewBox="0 0 48 48"
            fill="none"
          >
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
