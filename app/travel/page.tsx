import Image from "next/image"
import { Plane, Car, Bus } from "lucide-react"

import { HotelBlockGate } from "@/components/hotel-block-gate"
import { PageHeader, SectionHeading } from "@/components/section-heading"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAppleMapsUrl, getGoogleMapsUrl } from "@/lib/map-links"
import { hotelBlock, thingsToDo } from "@/lib/wedding-data"

export const metadata = {
  title: "Travel | A Savannah Wedding",
  description: "Hotel block, airport details, transportation, and things to do in Savannah.",
}

const categories = ["See", "Eat", "Drink"] as const
const travelLinkClassName =
  "inline-flex text-sm font-serif tracking-[0.02em] text-[var(--navy)] underline decoration-[rgba(34,49,63,0.28)] underline-offset-4 transition-colors hover:text-[var(--burgundy)]"

export default function TravelPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plan Your Visit"
        title="Travel & Accommodations"
        description="Whether you're traveling near or far, here is everything you need for a seamless stay at The DeSoto in Savannah."
      />

      {/* Getting Around */}
      <section id="travel-logistics" className="bg-secondary/60 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Getting Around"
            title="Travel Logistics"
          />
          <div className="mt-12">
            <Accordion className="flex flex-col gap-3">
              <LogisticsItem
                value="airport"
                icon={Plane}
                title="Airport Information"
                body="Savannah/Hilton Head International Airport (SAV) is approximately 20 minutes from the Historic District. For additional flight options, Jacksonville International (JAX) is about two hours south, Charleston International (CHS) is about two hours north, and Hartsfield–Jackson Atlanta International Airport (ATL) is approximately 3.5–4 hours west by car and offers one of the largest selections of domestic and international flights."
              />
              <LogisticsItem
                value="transport"
                icon={Bus}
                title="Transportation"
                body="A trolley will run between The DeSoto and Trinity Methodist Church to and from the ceremony. Rideshare services operate throughout Savannah, and the downtown area is wonderfully walkable. We recommend planning ahead on the evening of the wedding."
              />
              <LogisticsItem
                value="parking"
                icon={Car}
                title="Parking"
                body="Only valet is available at The DeSoto. Public parking garages and metered street parking surround the Historic District. Garages are generally the easiest option on weekends."
              />
            </Accordion>
          </div>
        </div>
      </section>

      {/* Hotel */}
      <section id="hotel-blocks" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Where to Stay"
          title="The DeSoto"
          description="Our only room block will be at The DeSoto. Invited guests can unlock the booking information with the password from their invitation."
        />
        <div className="mt-12">
          <HotelBlockGate hotelBlock={hotelBlock} />
        </div>
      </section>

      {/* Things to do */}
      <section id="things-to-do" className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Make a Weekend of It"
          title="Things to Do in Savannah"
          description="Our favorite places to explore, dine, and unwind while you're in town."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
            <Image
              src="/images/savannah-square.png"
              alt="A historic Savannah square with a fountain and oak trees"
              fill
              loading="eager"
              className="object-cover object-center"
            />
          </div>

          <Tabs defaultValue="See" className="w-full">
            <TabsList className="w-full">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="flex-1">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-4 flex flex-col gap-3">
                {thingsToDo
                  .filter((t) => t.category === cat)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm">
                        <a
                          href={getGoogleMapsUrl(`${item.name}, Savannah, GA`)}
                          target="_blank"
                          rel="noreferrer"
                          className={travelLinkClassName}
                        >
                          Google Maps
                        </a>
                        <a
                          href={getAppleMapsUrl(`${item.name}, Savannah, GA`)}
                          target="_blank"
                          rel="noreferrer"
                          className={travelLinkClassName}
                        >
                          Apple Maps
                        </a>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  )
}

function LogisticsItem({
  value,
  icon: Icon,
  title,
  body,
}: {
  value: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  body: string
}) {
  return (
    <AccordionItem
      value={value}
      className="rounded-lg border border-border bg-card px-4"
    >
      <AccordionTrigger className="text-left">
        <span className="flex items-center gap-3 font-serif text-lg font-semibold text-foreground">
          <Icon className="size-5 text-[var(--sage)]" />
          {title}
        </span>
      </AccordionTrigger>
      <AccordionContent className="leading-relaxed text-muted-foreground">
        {body}
      </AccordionContent>
    </AccordionItem>
  )
}
