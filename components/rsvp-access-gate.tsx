"use client"

import { useEffect, useState, type ReactNode } from "react"
import { LockKeyhole } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const RSVP_PASSWORD = "Morgan&Brendan2026"
const RSVP_ACCESS_KEY = "wedding-rsvp-access"

export function RsvpAccessGate({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)

  useEffect(() => {
    if (pathname?.startsWith("/admin")) {
      setIsUnlocked(true)
      setIsCheckingAccess(false)
      return
    }

    const hasAccess = window.sessionStorage.getItem(RSVP_ACCESS_KEY) === "granted"
    setIsUnlocked(hasAccess)
    setIsCheckingAccess(false)
  }, [pathname])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (password === RSVP_PASSWORD) {
      window.sessionStorage.setItem(RSVP_ACCESS_KEY, "granted")
      setIsUnlocked(true)
      setError("")
      setPassword("")
      return
    }

    setError("That password was not recognized. Please use the password included with your invitation.")
  }

  return (
    <div className="relative">
      <div
        aria-hidden={!isUnlocked}
        className={!isUnlocked && !isCheckingAccess ? "pointer-events-none select-none blur-md" : ""}
      >
        {children}
      </div>

      {!isUnlocked ? (
        <div className="fixed inset-0 z-40 flex items-start justify-center bg-[rgba(19,31,43,0.34)] px-4 py-6 backdrop-blur-[2px] sm:px-6 sm:py-8">
          <Card className="w-full max-w-md border-[rgba(34,49,63,0.1)] bg-[rgba(255,252,247,0.92)] shadow-[0_24px_60px_rgba(61,42,32,0.16)]">
            <CardContent className="px-6 py-8 sm:px-8 sm:py-10">
              <div className="mx-auto max-w-md space-y-6 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
                  <LockKeyhole className="size-6" />
                </span>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--burgundy)]">
                    Private Site Access
                  </p>
                  <h2 className="font-serif text-3xl text-[var(--navy)]">Enter Your Wedding Password</h2>
                  <p className="text-pretty leading-relaxed text-muted-foreground">
                    {isCheckingAccess
                      ? "Preparing the wedding site..."
                      : "Please use the password included with your invitation to continue to the wedding website."}
                  </p>
                </div>

                {!isCheckingAccess ? (
                  <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <label htmlFor="rsvp-password" className="text-sm font-medium text-foreground">
                        Wedding Password
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
                      Enter Website
                    </Button>
                  </form>
                ) : null}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  )
}
