"use client"

import { FormEvent, useState } from "react"
import { Copy, Hotel } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getAppleMapsUrl, getGoogleMapsUrl } from "@/lib/map-links"
import type { Hotel as HotelBlock } from "@/lib/wedding-data"

type HotelBlockGateProps = {
  hotelBlock: HotelBlock
}

const hotelBlockPassword = process.env.NEXT_PUBLIC_HOTEL_BLOCK_PASSWORD?.trim()

const travelLinkClassName =
  "inline-flex text-sm font-serif tracking-[0.02em] text-[var(--navy)] underline decoration-[rgba(34,49,63,0.28)] underline-offset-4 transition-colors hover:text-[var(--burgundy)]"

export function HotelBlockGate({ hotelBlock }: HotelBlockGateProps) {
  const [password, setPassword] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [error, setError] = useState("")
  const hotelBlockMapsQuery = `${hotelBlock.name}, Savannah, GA`

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (hotelBlockPassword && password.trim() === hotelBlockPassword) {
      setIsUnlocked(true)
      setError("")
      return
    }

    setError("That password did not match. Please check your invitation and try again.")
  }

  return (
    <Card className="mx-auto flex max-w-2xl flex-col">
      <CardHeader>
        <span className="flex size-11 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
          <Hotel className="size-5" />
        </span>
        <CardTitle className="mt-3 font-serif text-2xl">{hotelBlock.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{hotelBlock.distance}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{hotelBlock.note}</p>
        {hotelBlock.phone ? (
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-base text-muted-foreground sm:text-lg">
            <span className="font-serif tracking-[0.02em] text-foreground">Phone:</span>
            <span className="font-serif tracking-[0.02em] text-foreground">{hotelBlock.phone}</span>
          </p>
        ) : null}

        {isUnlocked ? (
          <div className="mt-auto flex flex-col gap-3">
            <p className="font-serif text-lg text-foreground">{hotelBlock.rate}</p>
            <div className="flex items-center justify-between rounded-md border border-dashed border-border bg-secondary px-3 py-2">
              <span className="font-mono text-xs tracking-wide text-foreground">{hotelBlock.code}</span>
              <Copy className="size-3.5 text-muted-foreground" />
            </div>
            <Button
              variant="outline"
              className="w-full"
              render={<a href={hotelBlock.url} target="_blank" rel="noreferrer" />}
              nativeButton={false}
            >
              Book a Room
            </Button>
          </div>
        ) : (
          <form
            className="mt-auto rounded-lg border border-[rgba(34,49,63,0.12)] bg-[rgba(255,252,247,0.86)] p-4"
            onSubmit={handleSubmit}
          >
            <p className="text-sm leading-relaxed text-muted-foreground">
              Hotel block details are reserved for invited guests. Please enter the password from your invitation to
              view booking information.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="hotel-block-password">
                Hotel block password
              </label>
              <Input
                id="hotel-block-password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Invitation password"
                aria-invalid={error ? true : undefined}
              />
              <Button type="submit" className="bg-[var(--navy)] px-4 text-white hover:bg-[var(--burgundy)]">
                Unlock Hotel Block
              </Button>
            </div>
            {error ? <p className="mt-3 text-sm text-[var(--burgundy)]">{error}</p> : null}
          </form>
        )}

        <div className="flex flex-wrap gap-3 text-sm">
          <a
            href={getGoogleMapsUrl(hotelBlockMapsQuery)}
            target="_blank"
            rel="noreferrer"
            className={travelLinkClassName}
          >
            Google Maps
          </a>
          <a
            href={getAppleMapsUrl(hotelBlockMapsQuery)}
            target="_blank"
            rel="noreferrer"
            className={travelLinkClassName}
          >
            Apple Maps
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
