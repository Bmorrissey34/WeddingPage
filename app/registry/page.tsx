import { Gift, ExternalLink, Heart } from "lucide-react"

import { PageHeader } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { registries } from "@/lib/wedding-data"

export const metadata = {
  title: "Registry | A Savannah Wedding",
  description: "Registry details for Morgan and Brendan's wedding celebration.",
}

export default function RegistryPage() {
  return (
    <>
      <PageHeader
        eyebrow="With Gratitude"
        title="The Registry"
        description="Your presence at our wedding is the greatest gift of all. For friends and family who have asked, we have shared our registry below."
      />

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {registries.map((registry) => (
            <Card key={registry.id} className="flex flex-col">
              <CardHeader>
                <span className="flex size-12 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
                  {registry.id === "honeymoon" ? (
                    <Heart className="size-5" />
                  ) : (
                    <Gift className="size-5" />
                  )}
                </span>
                <CardTitle className="mt-3 font-serif text-2xl">
                  {registry.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-5">
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  {registry.description}
                </p>
                {registry.url ? (
                  <Button
                    variant="outline"
                    className="mt-auto w-full"
                    render={
                      <a
                        href={registry.url}
                        target="_blank"
                        rel="noreferrer"
                      />
                    }
                    nativeButton={false}
                  >
                    View Registry
                    <ExternalLink data-icon="inline-end" />
                  </Button>
                ) : (
                  <Button variant="outline" className="mt-auto w-full" disabled>
                    Details to Come
                    <ExternalLink data-icon="inline-end" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-border bg-secondary/60 p-8 text-center">
          <p className="mx-auto max-w-xl text-pretty leading-relaxed text-muted-foreground">
            We are endlessly grateful for your love and support as we begin this
            new chapter. Thank you for being part of our celebration.
          </p>
        </div>
      </section>
    </>
  )
}
