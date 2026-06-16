"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react"

import type { GalleryPhoto } from "@/lib/wedding-data"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

type GalleryLightboxProps = {
  photos: GalleryPhoto[]
}

export function GalleryLightbox({ photos }: GalleryLightboxProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const activePhoto = photos[activeIndex]
  const totalPhotos = photos.length

  const featuredPattern = useMemo(
    () => new Set([0, 5, 10, 17, 23]),
    []
  )

  function openPhoto(index: number) {
    setActiveIndex(index)
    setOpen(true)
  }

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + totalPhotos) % totalPhotos)
  }, [totalPhotos])

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % totalPhotos)
  }, [totalPhotos])

  useEffect(() => {
    if (!open) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        showPrevious()
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        showNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open, showNext, showPrevious])

  if (!activePhoto) {
    return null
  }

  return (
    <>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => openPhoto(index)}
            className="group relative mb-4 block w-full overflow-hidden rounded-md border border-[var(--sage)]/25 bg-[var(--card)] text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-[var(--burgundy)]/45 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--burgundy)] focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            <span
              className={cn(
                "relative block w-full",
                featuredPattern.has(index) ? "aspect-[4/5]" : "aspect-[3/4]"
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-[var(--navy)]/0 transition duration-300 group-hover:bg-[var(--navy)]/18" />
              <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[var(--navy)] opacity-0 shadow-sm transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-4" aria-hidden="true" />
              </span>
            </span>
            <span className="sr-only">Open photo {index + 1} of {totalPhotos}</span>
          </button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="h-svh w-screen max-w-none overflow-hidden rounded-none border-0 bg-transparent p-4 text-white ring-0 sm:max-w-none sm:p-8"
        >
          <DialogTitle className="sr-only">Morgan and Brendan engagement gallery</DialogTitle>
          <DialogDescription className="sr-only">
            Use the previous and next controls to browse the engagement photos.
          </DialogDescription>

          <div className="absolute inset-0 overflow-hidden">
            <img
              key={`${activePhoto.id}-background`}
              src={activePhoto.src}
              alt=""
              className="h-full w-full scale-110 object-cover opacity-45 blur-2xl"
            />
            <div className="absolute inset-0 bg-black/48" />
          </div>

          <div className="relative flex h-full min-h-0 items-center justify-center">
            <div className="relative flex max-h-full max-w-full items-center justify-center">
              <img
                key={activePhoto.id}
                src={activePhoto.src}
                alt={activePhoto.alt}
                className="h-auto max-h-[calc(100svh-2rem)] w-auto max-w-[calc(100vw-2rem)] object-contain shadow-2xl sm:max-h-[calc(100svh-4rem)] sm:max-w-[calc(100vw-4rem)]"
              />

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-black/38 text-white shadow-lg backdrop-blur-md transition hover:bg-black/58 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                aria-label="Close gallery"
              >
                <X className="size-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/38 text-white shadow-lg backdrop-blur-md transition hover:bg-black/58 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:left-5"
                aria-label="Previous photo"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={showNext}
                className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/38 text-white shadow-lg backdrop-blur-md transition hover:bg-black/58 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:right-5"
                aria-label="Next photo"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/38 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white shadow-lg backdrop-blur-md sm:bottom-5">
                {activeIndex + 1} / {totalPhotos}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
