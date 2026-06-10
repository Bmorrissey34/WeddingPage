"use client"

import { useState } from "react"
import { Check, CalendarHeart, PartyPopper, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { mealOptions, type Meal } from "@/lib/rsvp-data"
import { wedding } from "@/lib/wedding-data"

type Attendance = "attending" | "declined" | ""

type FormState = {
  name: string
  email: string
  attendance: Attendance
  bringingGuest: boolean
  guestName: string
  meal: Meal | ""
  guestMeal: Meal | ""
  dietary: string
  song: string
  notes: string
}

const initialState: FormState = {
  name: "",
  email: "",
  attendance: "",
  bringingGuest: false,
  guestName: "",
  meal: "",
  guestMeal: "",
  dietary: "",
  song: "",
  notes: "",
}

export function RsvpForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function validateStep0() {
    const next: Record<string, string> = {}
    if (!form.name.trim()) next.name = "Please enter your name."
    if (!form.email.trim()) {
      next.email = "Please enter your email."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address."
    }
    if (!form.attendance) next.attendance = "Please let us know if you can make it."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function validateStep1() {
    const next: Record<string, string> = {}
    if (!form.meal) next.meal = "Please choose a meal."
    if (form.bringingGuest) {
      if (!form.guestName.trim()) next.guestName = "Please enter your guest's name."
      if (!form.guestMeal) next.guestMeal = "Please choose a meal for your guest."
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleNext() {
    if (step === 0) {
      if (!validateStep0()) return
      // If declining, skip the meal step and go straight to the note step.
      if (form.attendance === "declined") {
        setStep(2)
        return
      }
    }
    if (step === 1 && !validateStep1()) return
    setStep((s) => Math.min(s + 1, 2))
  }

  function handleBack() {
    if (step === 2 && form.attendance === "declined") {
      setStep(0)
      return
    }
    setStep((s) => Math.max(s - 1, 0))
  }

  function handleSubmit() {
    // Mock submission - in a real app this would POST to a backend.
    console.log("[v0] RSVP submitted:", form)
    setSubmitted(true)
  }

  if (submitted) {
    return <RsvpSuccess attending={form.attendance === "attending"} name={form.name} />
  }

  const steps =
    form.attendance === "declined"
      ? ["Your Details", "A Note"]
      : ["Your Details", "Meal & Guest", "A Note"]
  const displayStep = step === 2 && form.attendance === "declined" ? 1 : step

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        {/* Stepper */}
        <ol className="mb-8 flex items-center justify-center gap-2">
          {steps.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border text-sm font-medium transition-colors",
                  i <= displayStep
                    ? "border-[var(--navy)] bg-[var(--navy)] text-[var(--navy-foreground)]"
                    : "border-border text-muted-foreground"
                )}
              >
                {i < displayStep ? <Check className="size-4" /> : i + 1}
              </span>
              <span
                className={cn(
                  "hidden text-sm sm:inline",
                  i <= displayStep ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
              {i < steps.length - 1 ? (
                <span className="mx-1 h-px w-6 bg-border sm:w-10" />
              ) : null}
            </li>
          ))}
        </ol>

        {/* Step 0: details */}
        {step === 0 ? (
          <div className="flex flex-col gap-5">
            <Field label="Full Name" htmlFor="name" error={errors.name}>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your full name"
                aria-invalid={!!errors.name}
              />
            </Field>
            <Field label="Email" htmlFor="email" error={errors.email}>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
              />
            </Field>
            <Field label="Will you be joining us?" error={errors.attendance}>
              <div className="grid gap-3 sm:grid-cols-2">
                <ChoiceCard
                  selected={form.attendance === "attending"}
                  onClick={() => update("attendance", "attending")}
                  icon={PartyPopper}
                  title="Joyfully Accept"
                />
                <ChoiceCard
                  selected={form.attendance === "declined"}
                  onClick={() => update("attendance", "declined")}
                  icon={Heart}
                  title="Regretfully Decline"
                />
              </div>
            </Field>
          </div>
        ) : null}

        {/* Step 1: meal & guest */}
        {step === 1 ? (
          <div className="flex flex-col gap-6">
            <Field label="Your Meal Selection" error={errors.meal}>
              <MealPicker
                value={form.meal}
                onChange={(m) => update("meal", m)}
              />
            </Field>

            <div className="flex items-center justify-between rounded-lg border border-border p-4">
              <div>
                <p className="font-medium text-foreground">Bringing a guest?</p>
                <p className="text-sm text-muted-foreground">
                  Let us know if you&apos;ll have a plus-one.
                </p>
              </div>
              <Button
                type="button"
                variant={form.bringingGuest ? "default" : "outline"}
                onClick={() => update("bringingGuest", !form.bringingGuest)}
                className={cn(
                  form.bringingGuest &&
                    "bg-[var(--navy)] text-[var(--navy-foreground)] hover:bg-[var(--navy)]/90"
                )}
              >
                {form.bringingGuest ? "Yes" : "No"}
              </Button>
            </div>

            {form.bringingGuest ? (
              <div className="flex flex-col gap-5 rounded-lg border border-dashed border-border p-4">
                <Field label="Guest's Name" htmlFor="guestName" error={errors.guestName}>
                  <Input
                    id="guestName"
                    value={form.guestName}
                    onChange={(e) => update("guestName", e.target.value)}
                    placeholder="Your guest's name"
                    aria-invalid={!!errors.guestName}
                  />
                </Field>
                <Field label="Guest's Meal Selection" error={errors.guestMeal}>
                  <MealPicker
                    value={form.guestMeal}
                    onChange={(m) => update("guestMeal", m)}
                  />
                </Field>
              </div>
            ) : null}

            <Field label="Dietary Restrictions (optional)" htmlFor="dietary">
              <Input
                id="dietary"
                value={form.dietary}
                onChange={(e) => update("dietary", e.target.value)}
                placeholder="Allergies, preferences, etc."
              />
            </Field>
          </div>
        ) : null}

        {/* Step 2: note */}
        {step === 2 ? (
          <div className="flex flex-col gap-5">
            {form.attendance === "attending" ? (
              <Field label="Song Request (optional)" htmlFor="song">
                <Input
                  id="song"
                  value={form.song}
                  onChange={(e) => update("song", e.target.value)}
                  placeholder="A song to get you on the dance floor"
                />
              </Field>
            ) : null}
            <Field label="A Note for the Couple (optional)" htmlFor="notes">
              <Textarea
                id="notes"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Share your well-wishes..."
                rows={4}
              />
            </Field>
          </div>
        ) : null}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={handleBack}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="bg-[var(--navy)] text-[var(--navy-foreground)] hover:bg-[var(--navy)]/90"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              className="bg-[var(--navy)] text-[var(--navy-foreground)] hover:bg-[var(--navy)]/90"
            >
              <CalendarHeart data-icon="inline-start" />
              Submit RSVP
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string
  htmlFor?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function ChoiceCard({
  selected,
  onClick,
  icon: Icon,
  title,
}: {
  selected: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  title: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "flex items-center gap-3 rounded-lg border p-4 text-left transition-all",
        selected
          ? "border-[var(--navy)] bg-[var(--accent)]"
          : "border-border hover:border-[var(--sage)]"
      )}
    >
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          selected
            ? "bg-[var(--navy)] text-[var(--navy-foreground)]"
            : "bg-secondary text-foreground"
        )}
      >
        <Icon className="size-5" />
      </span>
      <span className="font-serif text-lg font-medium text-foreground">
        {title}
      </span>
    </button>
  )
}

function MealPicker({
  value,
  onChange,
}: {
  value: Meal | ""
  onChange: (meal: Meal) => void
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(v) => onChange(v as Meal)}
      className="grid gap-3 sm:grid-cols-2"
    >
      {mealOptions.map((meal) => (
        <Label
          key={meal}
          className={cn(
            "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
            value === meal
              ? "border-[var(--navy)] bg-[var(--accent)]"
              : "border-border hover:border-[var(--sage)]"
          )}
        >
          <RadioGroupItem value={meal} />
          <span className="text-sm font-medium text-foreground">{meal}</span>
        </Label>
      ))}
    </RadioGroup>
  )
}

function RsvpSuccess({ attending, name }: { attending: boolean; name: string }) {
  return (
    <Card className="text-center">
      <CardContent className="flex flex-col items-center gap-4 px-6 py-14 sm:px-10">
        <span className="flex size-16 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--navy)]">
          {attending ? (
            <PartyPopper className="size-8" />
          ) : (
            <Heart className="size-8" />
          )}
        </span>
        <h2 className="font-serif text-3xl font-semibold text-foreground">
          {attending ? "We can't wait to celebrate!" : "We'll miss you dearly"}
        </h2>
        <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
          {attending
            ? `Thank you, ${name || "friend"}. Your RSVP has been received. We are so glad you'll be joining us in ${wedding.city}.`
            : `Thank you for letting us know, ${name || "friend"}. You'll be missed, and we appreciate your warm wishes.`}
        </p>
        <p className="mt-2 font-serif text-xl text-[color-mix(in_oklch,var(--burgundy),transparent_5%)]">
          {wedding.monogram}
        </p>
      </CardContent>
    </Card>
  )
}
