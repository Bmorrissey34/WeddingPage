"use client"

import { useMemo, useState, type ComponentType, type FormEvent, type ReactNode } from "react"
import {
  Clock3,
  Download,
  LogOut,
  Mail,
  PencilLine,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserCheck,
  UserX,
  Users,
  UtensilsCrossed,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { mockRsvps, mealOptions, type MealChoice, type RsvpRecord, type RsvpStatus } from "@/lib/rsvp-data"
import { wedding } from "@/lib/wedding-data"

const LOGIN_PASSWORD = "savannah2026"

type StatusFilter = "all" | RsvpStatus
type DietaryFilter = "all" | "with" | "none"
type PlusOneFilter = "all" | "yes" | "no"

const statusLabels: Record<RsvpStatus, string> = {
  attending: "Attending",
  declined: "Declined",
  pending: "Pending",
}

const statusBadgeVariant: Record<RsvpStatus, "default" | "outline" | "secondary"> = {
  attending: "default",
  declined: "outline",
  pending: "secondary",
}

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginError, setLoginError] = useState("")

  if (!isAuthenticated) {
    return <LoginScreen error={loginError} onSubmit={(password) => {
      if (password === LOGIN_PASSWORD) {
        setLoginError("")
        setIsAuthenticated(true)
      } else {
        setLoginError("That password does not match the demo admin access.")
      }
    }} />
  }

  return <Dashboard onLogout={() => setIsAuthenticated(false)} />
}

function LoginScreen({
  error,
  onSubmit,
}: {
  error: string
  onSubmit: (password: string) => void
}) {
  const [password, setPassword] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(password)
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(107,87,73,0.12),_transparent_36%),linear-gradient(180deg,_#f8f4ed_0%,_#f2e9dc_100%)] px-4 py-8 text-[var(--navy)] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <Card className="w-full overflow-hidden border-[rgba(34,49,63,0.12)] bg-[rgba(255,252,247,0.84)] shadow-[0_30px_80px_rgba(61,42,32,0.12)] backdrop-blur">
          <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative overflow-hidden bg-[linear-gradient(160deg,_#24384b_0%,_#4a6375_55%,_#6b7f71_100%)] p-8 text-[var(--navy-foreground)] sm:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),_transparent_30%)]" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div className="space-y-5">
                  <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.2)] bg-white/10 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[var(--ivory)]/90">
                    <ShieldCheck className="size-3.5" />
                    Private admin access
                  </span>
                  <div className="space-y-4">
                    <h1 className="font-serif text-4xl leading-tight sm:text-5xl">Wedding Admin</h1>
                    <p className="max-w-md text-sm leading-6 text-[var(--ivory)]/82 sm:text-base">
                      Demo login for managing RSVP mock data, reviewing meal counts, and testing the editorial dashboard layout.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <InfoChip icon={Users} label="Guests" value={`${mockRsvps.length} RSVPs in the prototype`} />
                  <InfoChip icon={Sparkles} label="Workflow" value="Edit, remove, export, and filter locally" />
                  <InfoChip icon={Clock3} label="Access" value="Password-only mock gate" />
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="mx-auto flex max-w-md flex-col gap-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--burgundy)]">Admin Sign In</p>
                  <h2 className="font-serif text-3xl text-[var(--navy)]">Mock dashboard login</h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    This is a frontend-only prototype. No real authentication or backend is involved.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2.5">
                    <Label htmlFor="admin-password">Admin password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter the demo password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>

                  {error ? (
                    <p className="rounded-2xl border border-[rgba(128,63,56,0.18)] bg-[rgba(128,63,56,0.08)] px-4 py-3 text-sm text-[var(--burgundy)]">
                      {error}
                    </p>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button type="submit" className="flex-1">
                      Enter admin
                    </Button>
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setPassword("savannah2026") }>
                      Fill demo password
                    </Button>
                  </div>
                </form>

                <p className="text-xs leading-5 text-muted-foreground">
                  Tip: the live site remains public. This admin screen is a design mock only and shares no state with any production service.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [rsvps, setRsvps] = useState<RsvpRecord[]>(() => mockRsvps)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all")
  const [plusOneFilter, setPlusOneFilter] = useState<PlusOneFilter>("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [deleteCandidate, setDeleteCandidate] = useState<RsvpRecord | null>(null)

  const filteredRsvps = useMemo(() => {
    const query = search.trim().toLowerCase()

    return rsvps.filter((record) => {
      const matchesSearch =
        !query ||
        [record.name, record.email, record.plusOneName, record.songRequest, record.notes]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query))

      const matchesStatus = statusFilter === "all" || record.attendanceStatus === statusFilter
      const matchesDietary =
        dietaryFilter === "all" ||
        (dietaryFilter === "with" ? Boolean(record.dietaryRestrictions) : !record.dietaryRestrictions)
      const matchesPlusOne =
        plusOneFilter === "all" ||
        (plusOneFilter === "yes" ? Boolean(record.plusOneName) : !record.plusOneName)

      return matchesSearch && matchesStatus && matchesDietary && matchesPlusOne
    })
  }, [dietaryFilter, plusOneFilter, rsvps, search, statusFilter])

  const selectedRecord = useMemo(
    () => rsvps.find((record) => record.id === selectedId) ?? null,
    [rsvps, selectedId],
  )

  const counts = useMemo(() => {
    const attending = rsvps.filter((record) => record.attendanceStatus === "attending").length
    const declined = rsvps.filter((record) => record.attendanceStatus === "declined").length
    const pending = rsvps.filter((record) => record.attendanceStatus === "pending").length
    const plusOnes = rsvps.filter((record) => Boolean(record.plusOneName)).length
    return { attending, declined, pending, plusOnes }
  }, [rsvps])

  const mealCounts = useMemo(() => {
    return mealOptions.map((meal) => ({
      meal,
      count: rsvps.filter((record) => record.mealChoice === meal).length,
    }))
  }, [rsvps])

  function handleSave(updated: RsvpRecord) {
    setRsvps((current) => current.map((record) => (record.id === updated.id ? updated : record)))
    setSelectedId(updated.id)
  }

  function handleDelete(id: string) {
    setRsvps((current) => current.filter((record) => record.id !== id))
    setDeleteCandidate(null)
    if (selectedId === id) {
      setSelectedId(null)
    }
  }

  function handleExport() {
    const headers = [
      "Name",
      "Email",
      "Status",
      "Party Size",
      "Plus One",
      "Meal Choice",
      "Dietary Restrictions",
      "Song Request",
      "Notes",
      "Submitted At",
    ]

    const rows = rsvps.map((record) => [
      record.name,
      record.email,
      statusLabels[record.attendanceStatus],
      String(record.partySize),
      record.plusOneName || "",
      record.mealChoice,
      record.dietaryRestrictions || "",
      record.songRequest || "",
      record.notes || "",
      record.submittedAt,
    ])

    const csv = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "wedding-rsvps.csv"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(107,87,73,0.12),_transparent_28%),linear-gradient(180deg,_#f8f4ed_0%,_#efe3d1_100%)] px-4 py-6 text-[var(--navy)] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col gap-6">
        <Card className="overflow-hidden border-[rgba(34,49,63,0.12)] bg-[rgba(255,252,247,0.82)] shadow-[0_22px_70px_rgba(61,42,32,0.1)] backdrop-blur">
          <CardContent className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--burgundy)]">Private dashboard</p>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-serif text-3xl text-[var(--navy)] sm:text-4xl">RSVP Management</h1>
                <Badge className="rounded-full bg-[var(--sage)] text-white hover:bg-[var(--sage)]">Demo mode</Badge>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Track attendance, revise guest details, and export the local RSVP mock data set for planning review.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 size-4" />
                Export CSV
              </Button>
              <Button variant="ghost" onClick={onLogout}>
                <LogOut className="mr-2 size-4" />
                Sign out
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard icon={Users} label="Total RSVPs" value={rsvps.length} accent="text-[var(--navy)]" />
          <SummaryCard icon={UserCheck} label="Attending" value={counts.attending} accent="text-[var(--sage)]" />
          <SummaryCard icon={UserX} label="Declined" value={counts.declined} accent="text-[var(--burgundy)]" />
          <SummaryCard icon={Sparkles} label="Plus ones" value={counts.plusOnes} accent="text-[var(--gold)]" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
          <Card className="border-[rgba(34,49,63,0.12)] bg-[rgba(255,252,247,0.82)]">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle className="font-serif text-2xl text-[var(--navy)]">Guest list</CardTitle>
                  <CardDescription>Search, filter, and edit RSVP records directly in the browser.</CardDescription>
                </div>
                <Badge variant="outline" className="rounded-full border-[rgba(34,49,63,0.15)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {filteredRsvps.length} visible
                </Badge>
              </div>

              <div className="grid gap-3 lg:grid-cols-[1.2fr_repeat(3,minmax(0,1fr))]">
                <div className="relative lg:col-span-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Search guests, emails, notes..."
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </div>
                <FilterSelect label="Status" value={statusFilter} onChange={(value) => setStatusFilter(value as StatusFilter)}>
                  <option value="all">All statuses</option>
                  <option value="attending">Attending</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                </FilterSelect>
                <FilterSelect label="Dietary" value={dietaryFilter} onChange={(value) => setDietaryFilter(value as DietaryFilter)}>
                  <option value="all">All guests</option>
                  <option value="with">With restrictions</option>
                  <option value="none">None noted</option>
                </FilterSelect>
                <FilterSelect label="Plus one" value={plusOneFilter} onChange={(value) => setPlusOneFilter(value as PlusOneFilter)}>
                  <option value="all">Any party size</option>
                  <option value="yes">With plus one</option>
                  <option value="no">Without plus one</option>
                </FilterSelect>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {filteredRsvps.length ? (
                <div className="overflow-hidden rounded-2xl border border-[rgba(34,49,63,0.08)]">
                  <Table>
                    <TableHeader className="bg-[rgba(34,49,63,0.04)]">
                      <TableRow>
                        <TableHead>Guest</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Party</TableHead>
                        <TableHead>Meal</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRsvps.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium text-foreground">{record.name}</p>
                              <p className="text-sm text-muted-foreground">{record.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={statusBadgeVariant[record.attendanceStatus]}>{statusLabels[record.attendanceStatus]}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {record.partySize}
                            {record.plusOneName ? ` · ${record.plusOneName}` : ""}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{record.mealChoice}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{record.submittedAt}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => setSelectedId(record.id)} aria-label={`Edit ${record.name}`}>
                                <PencilLine className="size-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => setDeleteCandidate(record)} aria-label={`Delete ${record.name}`}>
                                <Trash2 className="size-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <EmptyState />
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="border-[rgba(34,49,63,0.12)] bg-[rgba(255,252,247,0.82)]">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-[var(--navy)]">Meal summary</CardTitle>
                <CardDescription>Quick read on dinner preferences for the event team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mealCounts.map(({ meal, count }) => (
                  <MealSummaryCard key={meal} meal={meal} count={count} total={rsvps.length} />
                ))}
              </CardContent>
            </Card>

            <Card className="border-[rgba(34,49,63,0.12)] bg-[rgba(255,252,247,0.82)]">
              <CardHeader>
                <CardTitle className="font-serif text-2xl text-[var(--navy)]">Dashboard notes</CardTitle>
                <CardDescription>Prototype reminders for the wedding planning team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>
                  All edits stay in local browser state. Refreshing the page restores the seeded RSVP list.
                </p>
                <Separator />
                <ul className="space-y-2">
                  <li>Use the modal to update RSVP details or add planning notes.</li>
                  <li>Delete confirmations remove the selected row from the mock table only.</li>
                  <li>CSV export downloads the current local data set without any server call.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <RsvpDetailsDialog
        record={selectedRecord}
        onClose={() => setSelectedId(null)}
        onSave={handleSave}
      />

      <Dialog open={Boolean(deleteCandidate)} onOpenChange={(open) => !open && setDeleteCandidate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete RSVP</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this RSVP? This will only affect the local demo data.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteCandidate(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => deleteCandidate && handleDelete(deleteCandidate.id)}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function RsvpDetailsDialog({
  record,
  onClose,
  onSave,
}: {
  record: RsvpRecord | null
  onClose: () => void
  onSave: (record: RsvpRecord) => void
}) {
  const [form, setForm] = useState<RsvpRecord | null>(record)

  useMemo(() => {
    setForm(record ? { ...record } : null)
  }, [record])

  if (!record || !form) {
    return null
  }

  function updateField<K extends keyof RsvpRecord>(key: K, value: RsvpRecord[K]) {
    setForm((current) => (current ? { ...current, [key]: value } : current))
  }

  return (
    <Dialog open={Boolean(record)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-[var(--navy)]">Edit RSVP</DialogTitle>
          <DialogDescription>Adjust guest details in the local prototype and save the updated mock record.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2 sm:grid-cols-2">
          <Field label="Guest name">
            <Input value={form.name} onChange={(event) => updateField("name", event.target.value)} />
          </Field>
          <Field label="Email address">
            <Input value={form.email} onChange={(event) => updateField("email", event.target.value)} />
          </Field>
          <Field label="Attendance status">
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={form.attendanceStatus}
              onChange={(event) => updateField("attendanceStatus", event.target.value as RsvpStatus)}
            >
              <option value="attending">Attending</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
            </select>
          </Field>
          <Field label="Party size">
            <Input
              type="number"
              min={1}
              value={form.partySize}
              onChange={(event) => updateField("partySize", Number(event.target.value || 0))}
            />
          </Field>
          <Field label="Plus one name">
            <Input value={form.plusOneName} onChange={(event) => updateField("plusOneName", event.target.value)} />
          </Field>
          <Field label="Meal choice">
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={form.mealChoice}
              onChange={(event) => updateField("mealChoice", event.target.value as MealChoice)}
            >
              {mealOptions.map((meal) => (
                <option key={meal} value={meal}>
                  {meal}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Dietary restrictions" className="sm:col-span-2">
            <Input
              value={form.dietaryRestrictions}
              onChange={(event) => updateField("dietaryRestrictions", event.target.value)}
              placeholder="Any allergies or dietary notes"
            />
          </Field>
          <Field label="Song request" className="sm:col-span-2">
            <Input value={form.songRequest} onChange={(event) => updateField("songRequest", event.target.value)} />
          </Field>
          <Field label="Notes" className="sm:col-span-2">
            <Textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              rows={4}
            />
          </Field>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(form)}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: number
  accent: string
}) {
  return (
    <Card className="border-[rgba(34,49,63,0.12)] bg-[rgba(255,252,247,0.82)]">
      <CardContent className="flex items-center justify-between gap-4 p-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="font-serif text-3xl tabular-nums text-[var(--navy)]">{value}</p>
        </div>
        <Icon className={cn("size-6", accent)} />
      </CardContent>
    </Card>
  )
}

function MealSummaryCard({ meal, count, total }: { meal: string; count: number; total: number }) {
  const ratio = total ? Math.round((count / total) * 100) : 0

  return (
    <div className="rounded-2xl border border-[rgba(34,49,63,0.08)] bg-white/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-medium text-foreground">{meal}</p>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Meal selection</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-serif text-[var(--navy)]">{count}</p>
          <p className="text-xs text-muted-foreground">{ratio}% of RSVPs</p>
        </div>
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  children: ReactNode
}) {
  return (
    <label className="space-y-2 text-sm">
      <span className="font-medium text-foreground">{label}</span>
      <select
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
    </label>
  )
}

function EmptyState() {
  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center rounded-3xl border border-dashed border-[rgba(34,49,63,0.14)] bg-[rgba(255,252,247,0.66)] px-6 py-10 text-center">
      <Users className="size-10 text-[var(--sage)]" />
      <h3 className="mt-4 font-serif text-2xl text-[var(--navy)]">No RSVPs match these filters</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Clear the search or change the filters to bring guests back into view.
      </p>
    </div>
  )
}

function Field({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={cn("space-y-2", className)}>
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--burgundy)]">{label}</span>
      {children}
    </label>
  )
}

function InfoChip({
  icon: Icon,
  label,
  value,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl border border-[rgba(248,244,237,0.14)] bg-[rgba(248,244,237,0.08)] p-3">
      <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.22em] text-[var(--sage)]">
        <Icon className="size-4" />
        {label}
      </div>
      <p className="mt-2 text-sm text-[var(--navy-foreground)]/88">{value}</p>
    </div>
  )
}
