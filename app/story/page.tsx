import Image from "next/image"

import { PageHeader } from "@/components/section-heading"
import { StoryVideo } from "@/components/story-video"
import { cn } from "@/lib/utils"
import { storyMoments, wedding } from "@/lib/wedding-data"

export const metadata = {
  title: "Our Story | A Savannah Wedding",
  description: "The story of how Morgan and Brendan found their way to forever.",
}

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="How We Came to Be"
        description="A few of the moments that brought Brendan and Morgan from a chance meeting to a Savannah wedding weekend."
      />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="relative">
          {/* Center line (desktop) */}
          <span
            aria-hidden
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block"
          />

          <div className="flex flex-col gap-16">
            {storyMoments.map((moment, index) => {
              const flip = index % 2 === 1
              return (
                <div
                  key={moment.id}
                  className="relative grid items-center gap-6 md:grid-cols-2 md:gap-12"
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--sage)] ring-4 ring-background md:block"
                  />

                  {/* Text */}
                  <div
                    className={cn(
                      "flex flex-col gap-3",
                      flip ? "md:order-2 md:pl-12" : "md:pr-12 md:text-right md:items-end"
                    )}
                  >
                    <span className="font-serif text-2xl text-[color-mix(in_oklch,var(--burgundy),transparent_5%)]">
                      {moment.year}
                    </span>
                    <h2 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">
                      {moment.title}
                    </h2>
                    <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
                      {moment.body}
                    </p>
                  </div>

                  {/* Media */}
                  <div className={cn(flip ? "md:order-1 md:pr-12" : "md:pl-12")}>
                    {moment.video && moment.image ? (
                      <StoryVideo
                        src={moment.video}
                        poster={moment.image}
                        title={`${moment.title} - ${wedding.brideFirst} and ${wedding.groomFirst}`}
                      />
                    ) : moment.image ? (
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border">
                        <Image
                          src={moment.image}
                          alt={`${moment.title} - ${wedding.brideFirst} and ${wedding.groomFirst}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-dashed border-border bg-secondary text-center">
                        <span className="px-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                          Photo coming soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
