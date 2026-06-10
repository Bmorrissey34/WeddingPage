import { Clock, MapPin, Navigation, Shirt } from "lucide-react"

import { PageHeader } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { schedule } from "@/lib/wedding-data"

export const metadata = {
  title: "Schedule | A Savannah Wedding",
  description: "The full schedule for our wedding weekend in Savannah, Georgia.",
}

export default function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="The Weekend"
        title="Schedule of Events"
        description="We've planned a weekend of celebration. Here is everything you can look forward to."
      />

      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-8">
          {schedule.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.25em] text-[var(--sage-foreground)]/70">
                      {event.date}
                    </span>
                    <CardTitle className="font-serif text-2xl font-semibold sm:text-3xl">
                      {event.title}
                    </CardTitle>
                  </div>
                  {event.status === "tbd" ? (
                    <Badge variant="outline" className="border-[var(--sage)] text-foreground">
                      Coming Soon
                    </Badge>
                  ) : (
                    <Badge className="bg-[var(--accent)] text-[var(--navy)]">
                      Confirmed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <div className="grid gap-4 sm:grid-cols-3">
                  <Detail icon={Clock} label="Time" value={event.time} />
                  <Detail icon={MapPin} label="Location" value={event.location} />
                  <Detail icon={Shirt} label="Attire" value={event.attire} />
                </div>

                <Separator />

                <p className="text-pretty leading-relaxed text-muted-foreground">
                  {event.notes}
                </p>

                <div>
                  <Button
                    variant="outline"
                    disabled={event.status === "tbd"}
                    aria-disabled={event.status === "tbd"}
                  >
                    <Navigation data-icon="inline-start" />
                    {event.status === "tbd" ? "Directions Coming Soon" : "Get Directions"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
        <Icon className="size-4" />
      </span>
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  )
}
