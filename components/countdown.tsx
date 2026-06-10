"use client"

import * as React from "react"

import { wedding } from "@/lib/wedding-data"

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const target = React.useMemo(
    () => new Date(wedding.dateISO).getTime(),
    []
  )
  const [time, setTime] = React.useState<TimeLeft | null>(null)

  React.useEffect(() => {
    setTime(getTimeLeft(target))
    const interval = setInterval(() => setTime(getTimeLeft(target)), 1000)
    return () => clearInterval(interval)
  }, [target])

  const units: { label: string; value: number | null }[] = [
    { label: "Days", value: time?.days ?? null },
    { label: "Hours", value: time?.hours ?? null },
    { label: "Minutes", value: time?.minutes ?? null },
    { label: "Seconds", value: time?.seconds ?? null },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center rounded-lg border border-[var(--sidebar-border)] bg-[var(--sidebar-accent)] px-4 py-6"
        >
          <span className="font-serif text-4xl font-semibold tabular-nums text-[var(--navy-foreground)] sm:text-5xl">
            {unit.value === null ? "--" : String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-2 text-xs uppercase tracking-[0.25em] text-[var(--sage)]">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
