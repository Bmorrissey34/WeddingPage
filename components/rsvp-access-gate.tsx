"use client"

import { useEffect, useState, type ReactNode } from "react"
import { LockKeyhole } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const RSVP_PASSWORD = "Morgan&Brendan2026"
const RSVP_ACCESS_KEY = "wedding-rsvp-access"

export function RsvpAccessGate({ children }: { children: ReactNode }) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)

  useEffect(() => {
    const hasAccess = window.sessionStorage.getItem(RSVP_ACCESS_KEY) === "granted"
    setIsUnlocked(hasAccess)
    setIsCheckingAccess(false)
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (password === RSVP_PASSWORD) {
      window.sessionStorage.setItem(RSVP_ACCESS_KEY, "granted")
      setIsUnlocked(true)
      setError("")
      setPassword("")
      return
    }

    setError("That password wasn’t recognized. Please use the password included with your RSVP.")
  }

  if (isCheckingAccess) {
    return (
      <Card className="border-[rgba(34,49,63,0.1)] bg-[rgba(255,252,247,0.88)] shadow-[0_18px_48px_rgba(61,42,32,0.08)]">
        <CardContent className="px-6 py-12 text-center sm:px-8">
          <p className="text-sm leading-relaxed text-muted-foreground">Preparing your RSVP...</p>
        </CardContent>
      </Card>
    )
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <Card className="border-[rgba(34,49,63,0.1)] bg-[rgba(255,252,247,0.9)] shadow-[0_18px_48px_rgba(61,42,32,0.08)]">
      <CardContent className="px-6 py-8 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-md space-y-6 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
            <LockKeyhole className="size-6" />
          </span>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--burgundy)]">
              Private RSVP Access
            </p>
            <h2 className="font-serif text-3xl text-[var(--navy)]">Enter Your RSVP Password</h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">
              Please use the password included with your RSVP to continue to the response form.
            </p>
          </div>

          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="rsvp-password"
                className="text-sm font-medium text-foreground"
              >
                RSVP Password
              </label>
              <Input
                id="rsvp-password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setError("")
                }}
                placeholder="Enter password"
                aria-invalid={Boolean(error)}
              />
            </div>

            {error ? (
              <p
                className="rounded-lg border border-[rgba(128,63,56,0.18)] bg-[rgba(128,63,56,0.08)] px-4 py-3 text-sm text-[var(--burgundy)]"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <Button
              type="submit"
              className="w-full bg-[var(--navy)] text-[var(--navy-foreground)] hover:bg-[var(--navy)]/90"
            >
              Continue To RSVP
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
