import type { Metadata } from "next"
import { PageHeader } from "@/components/section-heading"
import { RsvpAccessGate } from "@/components/rsvp-access-gate"
import { RsvpForm } from "@/components/rsvp-form"
import { rsvpHelpItems, wedding } from "@/lib/wedding-data"

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
      <RsvpAccessGate>
        <section className="mx-auto w-full max-w-2xl px-4 pb-20 sm:px-6">
          <RsvpForm />
          <div className="mt-8 rounded-[2rem] border border-[rgba(34,49,63,0.1)] bg-[linear-gradient(180deg,rgba(255,252,247,0.96)_0%,rgba(242,233,220,0.82)_100%)] p-6 shadow-[0_20px_50px_rgba(61,42,32,0.08)] sm:p-8">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--burgundy)]">
                RSVP Help
              </p>
              <h2 className="font-serif text-3xl text-[var(--navy)]">A gracious note for any changes</h2>
              <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                If anything about your reply changes, please do not worry. We would be delighted to help update your
                plans and make certain every detail is in order.
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {rsvpHelpItems.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[rgba(34,49,63,0.08)] bg-white/70 p-5"
                >
                  <h3 className="font-serif text-xl text-[var(--navy)]">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[rgba(88,117,102,0.22)] bg-[rgba(88,117,102,0.08)] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--sage)]">Contact</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Need to change your RSVP? Please reach out to Brendan or Morgan directly, and we&apos;ll be happy to
                update it for you. The same goes for correcting an email address, adjusting a guest name, or revising a
                meal selection. If you need any dietary accommodations beyond the listed beef or chicken options, please
                contact us directly as well. If you are bringing kids, please include their meal choices in the RSVP
                note field.
              </p>
            </div>
          </div>
        </section>
      </RsvpAccessGate>
    </>
  )
}
