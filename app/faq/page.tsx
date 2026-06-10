import Link from "next/link"

import { PageHeader } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { faqs } from "@/lib/wedding-data"

export const metadata = {
  title: "FAQ | A Savannah Wedding",
  description: "Answers to common questions about our wedding weekend.",
}

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Good to Know"
        title="Frequently Asked Questions"
        description="We've gathered answers to the questions we hear most. If you can't find what you're looking for, please reach out."
      />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <Accordion className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="rounded-lg border border-border bg-card px-5"
            >
              <AccordionTrigger className="text-left font-serif text-lg font-semibold text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 rounded-lg border border-border bg-secondary/60 p-8 text-center">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Still have questions?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground">
            We&apos;re happy to help. In the meantime, don&apos;t forget to let us
            know you&apos;re coming.
          </p>
          <Button
            render={<Link href="/rsvp" />}
            nativeButton={false}
            className="mt-6 bg-[var(--navy)] text-[var(--navy-foreground)] hover:bg-[var(--navy)]/90"
          >
            RSVP Now
          </Button>
        </div>
      </section>
    </>
  )
}
