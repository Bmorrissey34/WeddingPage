import Image from "next/image"
import { Plane, Car, Bus, Hotel, Copy } from "lucide-react"

import { PageHeader, SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { hotels, thingsToDo } from "@/lib/wedding-data"

export const metadata = {
  title: "Travel | A Savannah Wedding",
  description: "Hotels, airport details, transportation, and things to do in Savannah.",
}

const categories = ["See", "Eat", "Drink"] as const

export default function TravelPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plan Your Visit"
        title="Travel & Accommodations"
        description="Whether you're traveling near or far, here is everything you need for a seamless stay in Savannah."
      />

      {/* Hotels */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Where to Stay"
          title="Hotel Blocks"
          description="We've reserved rooms at the following hotels. Mention the booking code when reserving to receive our group rate."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="flex flex-col">
              <CardHeader>
                <span className="flex size-11 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
                  <Hotel className="size-5" />
                </span>
                <CardTitle className="mt-3 font-serif text-xl">
                  {hotel.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{hotel.distance}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {hotel.note}
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <p className="font-serif text-lg text-foreground">{hotel.rate}</p>
                  <div className="flex items-center justify-between rounded-md border border-dashed border-border bg-secondary px-3 py-2">
                    <span className="font-mono text-xs tracking-wide text-foreground">
                      {hotel.code}
                    </span>
                    <Copy className="size-3.5 text-muted-foreground" />
                  </div>
                  <Button variant="outline" className="w-full">
                    Book a Room
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Getting Around */}
      <section className="bg-secondary/60 py-20">
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
                body="Savannah/Hilton Head International Airport (SAV) is approximately 20 minutes from the Historic District. For more flight options, Jacksonville International (JAX) is about two hours south and Charleston International (CHS) is about two hours north."
              />
              <LogisticsItem
                value="transport"
                icon={Bus}
                title="Transportation"
                body="A shuttle will run between the ceremony and reception venues. Rideshare services operate throughout Savannah, and the downtown area is wonderfully walkable. We recommend planning ahead on the evening of the wedding."
              />
              <LogisticsItem
                value="parking"
                icon={Car}
                title="Parking"
                body="Valet and garage parking are available at The DeSoto. Public parking garages and metered street parking surround the Historic District. Garages are generally the easiest option on weekends."
              />
            </Accordion>
          </div>
        </div>
      </section>

      {/* Things to do */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
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
              className="object-cover"
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
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
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
