import type { Metadata } from "next"
import { PageHeader } from "@/components/section-heading"
import { RsvpForm } from "@/components/rsvp-form"
import { wedding } from "@/lib/wedding-data"

export const metadata: Metadata = {
  title: "RSVP",
  description: `Kindly respond to ${wedding.brideFull} and ${wedding.groomFull}'s wedding by ${wedding.rsvpDeadline}.`,
}

export default function RsvpPage() {
  return (
    <>
      <PageHeader
        eyebrow="Will You Join Us"
        title="RSVP"
        description={`Kindly respond on or before ${wedding.rsvpDeadline}. We can't wait to celebrate with you.`}
      />
      <section className="mx-auto w-full max-w-2xl px-4 pb-20 sm:px-6">
        <RsvpForm />
      </section>
    </>
  )
}
