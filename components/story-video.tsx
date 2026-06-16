"use client"

import Image from "next/image"
import { Volume2, VolumeX } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type StoryVideoProps = {
  src: string
  poster: string
  title: string
}

export function StoryVideo({ src, poster, title }: StoryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPoster, setShowPoster] = useState(true)
  const [hasEnded, setHasEnded] = useState(false)
  const [volume, setVolume] = useState(0.1)
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    video.volume = volume
  }, [volume])

  const startPlayback = async () => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (hasEnded) {
      video.currentTime = 0
    }

    setShowPoster(false)
    setHasEnded(false)
    await video.play()
    setIsPlaying(true)
  }

  const togglePlayback = async () => {
    const video = videoRef.current

    if (!video) {
      return
    }

    if (video.paused) {
      await startPlayback()
      return
    }

    video.pause()
    setIsPlaying(false)
  }

  const handleVolumeChange = (nextVolume: number) => {
    const video = videoRef.current

    setVolume(nextVolume)

    if (video) {
      video.volume = nextVolume
    }
  }

  const toggleVolumeControl = () => {
    setShowVolumeControl((current) => !current)
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-secondary/30">
      <video
        ref={videoRef}
        poster={poster}
        preload="metadata"
        playsInline
        onLoadedMetadata={() => {
          const video = videoRef.current

          if (video) {
            video.volume = volume
          }
        }}
        className="aspect-[4/3] w-full object-cover"
        onPlay={() => {
          setIsPlaying(true)
          setShowPoster(false)
          setHasEnded(false)
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          const video = videoRef.current

          if (video) {
            video.currentTime = 0
          }

          setIsPlaying(false)
          setShowPoster(true)
          setHasEnded(true)
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {showPoster ? (
        <div className="absolute inset-0">
          <Image src={poster} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/10" />

          {hasEnded ? (
            <button
              type="button"
              aria-label={`Replay ${title} video`}
              onClick={startPlayback}
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-sm font-medium text-[var(--navy)] shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                aria-hidden
                className="flex size-5 items-center justify-center rounded-full border border-current"
              >
                <span className="ml-0.5 block h-0 w-0 border-y-[4px] border-y-transparent border-l-[7px] border-l-current" />
              </span>
              Replay
            </button>
          ) : (
            <button
              type="button"
              aria-label={`Play ${title} video`}
              onClick={startPlayback}
              className="absolute inset-0 flex items-center justify-center transition hover:bg-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="flex size-18 items-center justify-center rounded-full border border-white/60 bg-white/88 text-[var(--navy)] shadow-lg transition duration-300 hover:scale-105">
                <span
                  aria-hidden
                  className="ml-1 block h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-current"
                />
              </span>
            </button>
          )}
        </div>
      ) : (
        <>
          <button
            type="button"
            aria-label={isPlaying ? `Pause ${title} video` : `Play ${title} video`}
            onClick={togglePlayback}
            className="absolute inset-0 flex items-center justify-center bg-black/10 transition hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span
              className={`flex size-18 items-center justify-center rounded-full border border-white/60 bg-white/88 text-[var(--navy)] shadow-lg transition duration-300 ${
                isPlaying ? "scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100" : ""
              }`}
            >
              {isPlaying ? (
                <span className="flex gap-1.5">
                  <span className="h-5 w-1.5 rounded-full bg-current" />
                  <span className="h-5 w-1.5 rounded-full bg-current" />
                </span>
              ) : (
                <span
                  aria-hidden
                  className="ml-1 block h-0 w-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-current"
                />
              )}
            </span>
          </button>

          <div
            className="absolute bottom-4 right-4 z-10 flex items-center gap-2"
            onClick={(event) => event.stopPropagation()}
            onPointerDown={(event) => event.stopPropagation()}
          >
            {showVolumeControl ? (
              <div className="rounded-full border border-white/50 bg-white/88 px-3 py-2 shadow-lg backdrop-blur">
                <label className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--navy)]">
                  Volume
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(event) => handleVolumeChange(Number(event.target.value))}
                    className="h-1.5 w-24 accent-[var(--burgundy)]"
                    aria-label={`${title} volume`}
                  />
                </label>
              </div>
            ) : null}

            <button
              type="button"
              aria-label={showVolumeControl ? `Hide ${title} volume control` : `Show ${title} volume control`}
              aria-expanded={showVolumeControl}
              onClick={toggleVolumeControl}
              className="flex size-11 items-center justify-center rounded-full border border-white/60 bg-white/88 text-[var(--navy)] shadow-lg transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {volume === 0 ? <VolumeX className="size-4.5" /> : <Volume2 className="size-4.5" />}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
