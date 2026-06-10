import Link from "next/link"
import Image from "next/image"
import { CalendarHeart, ChevronDown, Church, GlassWater, MapPin, Plane } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Countdown } from "@/components/countdown"
import { SectionHeading } from "@/components/section-heading"
import { wedding } from "@/lib/wedding-data"

const previewCards = [
  {
    title: "The Ceremony",
    description: "Trinity Methodist Church, in the heart of the Historic District.",
    href: "/venues",
    icon: Church,
  },
  {
    title: "The Reception",
    description: "An evening of dinner and dancing at The DeSoto.",
    href: "/schedule",
    icon: GlassWater,
  },
  {
    title: "Travel & Stay",
    description: "Hotel blocks, transportation, and things to do in Savannah.",
    href: "/travel",
    icon: Plane,
  },
  {
    title: "Kindly Reply",
    description: `We hope you'll join us. Please respond by ${wedding.rsvpDeadline}.`,
    href: "/rsvp",
    icon: CalendarHeart,
  },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-savannah.png"
          alt="A historic Savannah street canopied by oak trees draped in Spanish moss"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--navy)]/70" />
        <div className="relative mx-auto max-w-3xl px-4 py-24 text-center text-[var(--navy-foreground)] sm:px-6">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--sage)] sm:text-sm">
            We&apos;re getting married
          </p>
          <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] text-balance sm:text-7xl">
            {wedding.brideFirst}
            <span className="mx-3 text-[var(--sage)]">&amp;</span>
            {wedding.groomFirst}
          </h1>
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-4 text-sm tracking-[0.2em] text-[var(--navy-foreground)]/90 sm:text-base">
            <span className="h-px flex-1 bg-[var(--navy-foreground)]/30" />
            <span className="whitespace-nowrap">{wedding.dateShort}</span>
            <span className="h-px flex-1 bg-[var(--navy-foreground)]/30" />
          </div>
          <p className="mt-4 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.25em] text-[var(--navy-foreground)]/80">
            <MapPin className="size-4 text-[var(--sage)]" />
            {wedding.city}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              render={<Link href="/rsvp" />}
              nativeButton={false}
              size="lg"
              className="w-full bg-[var(--navy-foreground)] text-[var(--navy)] hover:bg-[var(--navy-foreground)]/90 sm:w-auto"
            >
              RSVP
            </Button>
            <Button
              render={<Link href="/schedule" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="w-full border-[var(--navy-foreground)]/40 bg-transparent text-[var(--navy-foreground)] hover:bg-[var(--navy-foreground)]/10 hover:text-[var(--navy-foreground)] sm:w-auto"
            >
              View Schedule
            </Button>
            <Button
              render={<Link href="/travel" />}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="w-full border-[var(--navy-foreground)]/40 bg-transparent text-[var(--navy-foreground)] hover:bg-[var(--navy-foreground)]/10 hover:text-[var(--navy-foreground)] sm:w-auto"
            >
              Travel Info
            </Button>
          </div>
        </div>
        <a
          href="#welcome"
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[var(--navy-foreground)]/78 transition-colors hover:text-[var(--navy-foreground)]"
        >
          <span className="text-[0.68rem] uppercase tracking-[0.28em]">Scroll for more</span>
          <ChevronDown className="size-5" />
        </a>
      </section>

      {/* Welcome message */}
      <section id="welcome" className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <SectionHeading
          eyebrow="Welcome"
          title="We are honored to celebrate with you"
        />
        <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
          After years of building a life together, {wedding.brideFirst} and{" "}
          {wedding.groomFirst}{" "} invite you to share in the joy of their wedding in
          the city that holds their hearts. We have gathered everything you&apos;ll
          need here, from the weekend schedule to travel notes, so you can
          celebrate with ease. Thank you for being part of our story.
        </p>
      </section>

      {/* Countdown */}
      <section className="bg-[var(--navy)] py-20 text-[var(--navy-foreground)]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--sage)]">
              Counting down to
            </span>
            <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
              {wedding.dateLong}
            </h2>
          </div>
          <Countdown />
        </div>
      </section>

      {/* Preview cards */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="The Details"
          title="Everything you need to know"
          description="A glimpse of the weekend ahead. Explore each section for the full details."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {previewCards.map((card) => (
            <Link key={card.title} href={card.href} className="group">
              <Card className="h-full transition-all group-hover:-translate-y-1 group-hover:border-[var(--sage)] group-hover:shadow-md">
                <CardContent className="flex h-full flex-col items-center gap-4 px-6 py-8 text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
                    <card.icon className="size-6" />
                  </span>
                  <h3 className="font-serif text-xl font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                  <span className="mt-auto pt-2 text-xs font-medium uppercase tracking-[0.2em] text-[color-mix(in_oklch,var(--burgundy),transparent_5%)] group-hover:underline">
                    Learn more
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
