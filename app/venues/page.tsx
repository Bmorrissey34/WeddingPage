import Image from "next/image"
import { Car, MapPin, Bus } from "lucide-react"

import { PageHeader } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getGoogleMapsEmbedUrl, hasSpecificMapLocation } from "@/lib/map-links"
import { venues } from "@/lib/wedding-data"

export const metadata = {
  title: "Venues | A Savannah Wedding",
  description: "Details for the ceremony, reception, and welcome party venues.",
}

export default function VenuesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where to Gather"
        title="Our Venues"
        description="Both celebrations are held in the heart of Savannah's Historic District, just moments apart."
      />

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-12">
          {venues.map((venue, index) => (
            <Card key={venue.id} className="overflow-hidden p-0">
              {(() => {
                const mapsQuery = `${venue.name}, ${venue.address}`
                const hasMaps = !venue.comingSoon && hasSpecificMapLocation(venue.address)

                return (
                  <div className="grid md:grid-cols-2">
                    {/* Image / placeholder */}
                    <div className={index % 2 === 1 ? "md:order-2" : ""}>
                      {venue.image ? (
                        <div className="flex h-full flex-col bg-[rgba(255,252,247,0.92)]">
                          <div className="relative aspect-[5/4] w-full overflow-hidden md:h-full">
                            <Image
                              src={venue.image}
                              alt={venue.name}
                              fill
                              className="object-contain p-3 sm:p-4"
                            />
                          </div>
                          {venue.imageAttribution ? (
                            <p className="border-t border-border/60 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                              {venue.imageAttribution}
                            </p>
                          ) : null}
                        </div>
                      ) : (
                        <div className="flex aspect-[4/3] w-full items-center justify-center bg-[var(--navy)] md:h-full">
                          <div className="flex flex-col items-center gap-2 text-center text-[var(--navy-foreground)]">
                            <MapPin className="size-7 text-[var(--sage)]" />
                            <span className="text-sm uppercase tracking-[0.25em] text-[var(--sage)]">
                              {venue.comingSoon ? "Location Coming Soon" : "Photo Coming Soon"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <CardContent className="flex flex-col gap-5 p-6 sm:p-8">
                      <div className="flex flex-col gap-2">
                        <Badge
                          variant="outline"
                          className="w-fit border-[var(--sage)] text-foreground"
                        >
                          {venue.role}
                        </Badge>
                        <h2 className="font-serif text-3xl font-semibold text-foreground">
                          {venue.name}
                        </h2>
                        <p className="flex items-start gap-2 text-sm text-muted-foreground">
                          <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--sage)]" />
                          {venue.address}
                        </p>
                      </div>

                      <Separator />

                      <div className="flex flex-col gap-4">
                        <InfoRow
                          icon={Car}
                          label="Parking"
                          value={venue.parking}
                        />
                        <InfoRow
                          icon={Bus}
                          label="Getting There"
                          value={venue.transportation}
                        />
                      </div>

                      <div className="overflow-hidden rounded-lg border border-border bg-secondary">
                        {hasMaps ? (
                          <iframe
                            title={`${venue.name} map`}
                            src={getGoogleMapsEmbedUrl(mapsQuery)}
                            className="h-52 w-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        ) : (
                          <div className="flex h-52 items-center justify-center">
                            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                              <MapPin className="size-4" />
                              Map preview
                            </span>
                          </div>
                        )}
                      </div>

                    </CardContent>
                  </div>
                )
              })()}
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

function InfoRow({
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
      <div className="flex flex-col gap-0.5">
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <span className="text-sm leading-relaxed text-foreground">{value}</span>
      </div>
    </div>
  )
}
