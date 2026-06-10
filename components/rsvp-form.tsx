"use client"

import { useState } from "react"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { Check, CalendarHeart, PartyPopper, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { db } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import { mealOptions, type Meal } from "@/lib/rsvp-data"
import { wedding } from "@/lib/wedding-data"

type AttendanceStatus = "attending" | "declined" | ""
type PartySize = 1 | 2 | ""

type FormState = {
  fullName: string
  email: string
  attendanceStatus: AttendanceStatus
  partySize: PartySize
  plusOneName: string
  mealChoice: Meal | ""
  dietaryRestrictions: string
  songRequest: string
  notes: string
}

const initialState: FormState = {
  fullName: "",
  email: "",
  attendanceStatus: "",
  partySize: "",
  plusOneName: "",
  mealChoice: "",
  dietaryRestrictions: "",
  songRequest: "",
  notes: "",
}

export function RsvpForm() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  function handleAttendanceChange(value: Exclude<AttendanceStatus, "">) {
    setSubmitError("")
    setErrors((prev) => {
      const next = { ...prev }
      delete next.attendanceStatus
      delete next.partySize
      delete next.plusOneName
      delete next.mealChoice
      return next
    })

    setForm((prev) => ({
      ...prev,
      attendanceStatus: value,
      partySize: value === "attending" ? prev.partySize : "",
      plusOneName: value === "attending" ? prev.plusOneName : "",
      mealChoice: value === "attending" ? prev.mealChoice : "",
      dietaryRestrictions: value === "attending" ? prev.dietaryRestrictions : "",
      songRequest: value === "attending" ? prev.songRequest : "",
    }))
  }

  function handlePartySizeChange(value: PartySize) {
    setSubmitError("")
    setErrors((prev) => {
      const next = { ...prev }
      delete next.partySize
      delete next.plusOneName
      return next
    })

    setForm((prev) => ({
      ...prev,
      partySize: value,
      plusOneName: value === 2 ? prev.plusOneName : "",
    }))
  }

  function validateStep0() {
    const next: Record<string, string> = {}
    if (!form.fullName.trim()) next.fullName = "Please enter your name."
    if (!form.email.trim()) {
      next.email = "Please enter your email."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Please enter a valid email address."
    }
    if (!form.attendanceStatus) next.attendanceStatus = "Please let us know if you can make it."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function validateStep1() {
    const next: Record<string, string> = {}
    if (form.attendanceStatus !== "attending") {
      setErrors(next)
      return true
    }

    if (!form.partySize) next.partySize = "Please choose your party size."
    if (!form.mealChoice) next.mealChoice = "Please choose a meal."
    if (form.partySize === 2 && !form.plusOneName.trim()) {
      next.plusOneName = "Please enter your guest's name."
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleNext() {
    if (step === 0) {
      if (!validateStep0()) return
      // If declining, skip the meal step and go straight to the note step.
      if (form.attendanceStatus === "declined") {
        setStep(2)
        return
      }
    }
    if (step === 1 && !validateStep1()) return
    setStep((s) => Math.min(s + 1, 2))
  }

  function handleBack() {
    if (step === 2 && form.attendanceStatus === "declined") {
      setStep(0)
      return
    }
    setStep((s) => Math.max(s - 1, 0))
  }

  async function handleSubmit() {
    if (isSubmitting) return

    const detailsValid = validateStep0()
    const attendanceValid = form.attendanceStatus === "declined" || validateStep1()

    if (!detailsValid || !attendanceValid) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      const isAttending = form.attendanceStatus === "attending"
      const partySize = isAttending ? Number(form.partySize) : 0

      await addDoc(collection(db, "rsvps"), {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        attendanceStatus: form.attendanceStatus,
        partySize,
        plusOneName: partySize > 1 ? form.plusOneName.trim() : "",
        mealChoice: isAttending ? form.mealChoice : "",
        dietaryRestrictions: isAttending ? form.dietaryRestrictions.trim() : "",
        songRequest: isAttending ? form.songRequest.trim() : "",
        notes: form.notes.trim(),
        submittedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      setSubmitted(true)
    } catch (error) {
      console.error("Failed to submit RSVP:", error)
      setSubmitError("Something went wrong while sending your RSVP. Please try again in a moment.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return <RsvpSuccess attending={form.attendanceStatus === "attending"} name={form.fullName} />
  }

  const steps =
    form.attendanceStatus === "declined"
      ? ["Your Details", "A Note"]
      : ["Your Details", "Meal & Guest", "A Note"]
  const displayStep = step === 2 && form.attendanceStatus === "declined" ? 1 : step
  const isAttending = form.attendanceStatus === "attending"
  const needsPlusOne = isAttending && form.partySize === 2

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
            <Field label="Full Name" htmlFor="fullName" error={errors.fullName}>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="Your full name"
                aria-invalid={!!errors.fullName}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </Field>
            <Field label="Will you be joining us?" error={errors.attendanceStatus}>
              <div className="grid gap-3 sm:grid-cols-2">
                <ChoiceCard
                  selected={form.attendanceStatus === "attending"}
                  onClick={() => handleAttendanceChange("attending")}
                  icon={PartyPopper}
                  title="Joyfully Accept"
                  disabled={isSubmitting}
                />
                <ChoiceCard
                  selected={form.attendanceStatus === "declined"}
                  onClick={() => handleAttendanceChange("declined")}
                  icon={Heart}
                  title="Regretfully Decline"
                  disabled={isSubmitting}
                />
              </div>
            </Field>
          </div>
        ) : null}

        {/* Step 1: meal & guest */}
        {step === 1 ? (
          <div className="flex flex-col gap-6">
            <Field label="Party Size" error={errors.partySize}>
              <RadioGroup
                value={form.partySize ? String(form.partySize) : ""}
                onValueChange={(value) => handlePartySizeChange(Number(value) as PartySize)}
                className="grid gap-3 sm:grid-cols-2"
              >
                {[
                  { value: "1", label: "Just Me", description: "I will be attending solo." },
                  { value: "2", label: "Plus One", description: "I will be attending with a guest." },
                ].map((option) => (
                  <Label
                    key={option.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                      form.partySize === Number(option.value)
                        ? "border-[var(--navy)] bg-[var(--accent)]"
                        : "border-border hover:border-[var(--sage)]"
                    )}
                  >
                    <RadioGroupItem value={option.value} disabled={isSubmitting} />
                    <span className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-foreground">{option.label}</span>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            </Field>

            <Field label="Your Meal Selection" error={errors.mealChoice}>
              <MealPicker
                value={form.mealChoice}
                onChange={(m) => update("mealChoice", m)}
                disabled={isSubmitting}
              />
            </Field>

            {needsPlusOne ? (
              <div className="flex flex-col gap-5 rounded-lg border border-dashed border-border p-4">
                <Field label="Guest's Name" htmlFor="plusOneName" error={errors.plusOneName}>
                  <Input
                    id="plusOneName"
                    value={form.plusOneName}
                    onChange={(e) => update("plusOneName", e.target.value)}
                    placeholder="Your guest's name"
                    aria-invalid={!!errors.plusOneName}
                    disabled={isSubmitting}
                  />
                </Field>
              </div>
            ) : null}

            <Field label="Dietary Restrictions (optional)" htmlFor="dietaryRestrictions">
              <Input
                id="dietaryRestrictions"
                value={form.dietaryRestrictions}
                onChange={(e) => update("dietaryRestrictions", e.target.value)}
                placeholder="Allergies, preferences, etc."
                disabled={isSubmitting}
              />
            </Field>
          </div>
        ) : null}

        {/* Step 2: note */}
        {step === 2 ? (
          <div className="flex flex-col gap-5">
            {form.attendanceStatus === "attending" ? (
              <Field label="Song Request (optional)" htmlFor="songRequest">
                <Input
                  id="songRequest"
                  value={form.songRequest}
                  onChange={(e) => update("songRequest", e.target.value)}
                  placeholder="A song to get you on the dance floor"
                  disabled={isSubmitting}
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
                disabled={isSubmitting}
              />
            </Field>
            {submitError ? (
              <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {submitError}
              </p>
            ) : null}
          </div>
        ) : null}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button type="button" variant="ghost" onClick={handleBack} disabled={isSubmitting}>
              Back
            </Button>
          ) : (
            <span />
          )}
          {step < 2 ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="bg-[var(--navy)] text-[var(--navy-foreground)] hover:bg-[var(--navy)]/90"
            >
              Continue
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-[var(--navy)] text-[var(--navy-foreground)] hover:bg-[var(--navy)]/90"
            >
              <CalendarHeart data-icon="inline-start" />
              {isSubmitting ? "Submitting..." : "Submit RSVP"}
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
  disabled,
}: {
  selected: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string }>
  title: string
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "flex items-center gap-3 rounded-lg border p-4 text-left transition-all disabled:cursor-not-allowed disabled:opacity-70",
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
  disabled,
}: {
  value: Meal | ""
  onChange: (meal: Meal) => void
  disabled?: boolean
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
          <RadioGroupItem value={meal} disabled={disabled} />
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
