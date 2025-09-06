"use client";

import Image from "next/image";

interface YoutubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

export function YoutubeEmbed({ videoId, title, className = "" }: YoutubeEmbedProps) {
  return (
    <div className={`relative group ${className}`}>
      {/* Video Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl ring-1 ring-white/20 shadow-2xl bg-background/20 backdrop-blur-2xl">
        {/* Video Thumbnail/Poster */}
        <div data-thumbnail={videoId} className="absolute inset-0 flex items-center justify-center">
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            className="object-cover opacity-90"
          />
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-background/30" />
        </div>

        {/* Custom Play Button */}
        <button
          onClick={() => {
            const iframe = document.querySelector(`iframe[data-video-id="${videoId}"]`) as HTMLIFrameElement;
            if (iframe) {
              iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&autoplay=1&controls=1&loop=0&mute=0`;
              iframe.style.display = 'block';
              // Hide the play button and thumbnail
              const playButton = document.querySelector(`[data-play-button="${videoId}"]`) as HTMLElement;
              const thumbnail = document.querySelector(`[data-thumbnail="${videoId}"]`) as HTMLElement;
              if (playButton) playButton.style.display = 'none';
              if (thumbnail) thumbnail.style.display = 'none';
            }
          }}
          data-play-button={videoId}
          className="absolute inset-0 flex items-center justify-center group/play transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            {/* Outer ring */}
            <div className="w-24 h-24 rounded-full bg-primary/20 backdrop-blur-sm border-2 border-primary/30 flex items-center justify-center group-hover/play:bg-primary/30 group-hover/play:border-primary/50 transition-all duration-300">
              {/* Inner play button */}
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover/play:shadow-xl transition-all duration-300">
                <div className="w-0 h-0 border-l-[20px] border-l-foreground border-y-[12px] border-y-transparent ml-1" />
              </div>
            </div>

            {/* Ripple effect - single pulse */}
            <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover/play:opacity-100 group-hover/play:animate-[ping_1s_ease-out_1]" />
          </div>
        </button>

        {/* Video iframe (hidden initially) */}
        <iframe
          data-video-id={videoId}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full rounded-2xl hidden"
        />

        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
      </div>

      {/* Bottom accent line */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-muted-foreground to-primary rounded-full opacity-60" />
    </div>
  );
}
