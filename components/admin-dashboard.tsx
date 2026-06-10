"use client"

import { useEffect, useMemo, useState, type ComponentType, type FormEvent, type ReactNode } from "react"
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
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type Auth,
  type User,
} from "firebase/auth"
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from "firebase/firestore"

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { db } from "@/lib/firebase"
import { cn } from "@/lib/utils"
import { mealOptions, type MealChoice, type RsvpRecord, type RsvpStatus } from "@/lib/rsvp-data"
import { wedding } from "@/lib/wedding-data"

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

type FirestoreRsvpDoc = {
  fullName?: string
  email?: string
  attendanceStatus?: string
  partySize?: number
  plusOneName?: string
  mealChoice?: string
  dietaryRestrictions?: string
  songRequest?: string
  notes?: string
  submittedAt?: Timestamp | Date | string | { seconds?: number; nanoseconds?: number } | null
}

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [firebaseAuth, setFirebaseAuth] = useState<Auth | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [loginError, setLoginError] = useState("")

  useEffect(() => {
    let isMounted = true
    let unsubscribe: () => void = () => {}

    async function loadAuth() {
      const { auth } = await import("@/lib/firebase")

      if (!isMounted) {
        return
      }

      setFirebaseAuth(auth)
      unsubscribe = onAuthStateChanged(auth, (nextUser) => {
        setUser(nextUser)
        setIsCheckingAuth(false)
      })
    }

    void loadAuth()

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  async function handleLogin(email: string, password: string) {
    if (!firebaseAuth) {
      setLoginError("Admin sign-in is still loading. Please try again.")
      return
    }

    setLoginError("")

    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
    } catch (error) {
      setLoginError(getLoginErrorMessage(error))
    }
  }

  async function handleLogout() {
    if (!firebaseAuth) {
      return
    }

    await signOut(firebaseAuth)
  }

  if (isCheckingAuth) {
    return <LoadingScreen />
  }

  if (!user) {
    return <LoginScreen error={loginError} onSubmit={handleLogin} />
  }

  return <Dashboard onLogout={handleLogout} userEmail={user.email} />
}

function LoginScreen({
  error,
  onSubmit,
}: {
  error: string
  onSubmit: (email: string, password: string) => Promise<void>
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(email, password)
    } finally {
      setIsSubmitting(false)
    }
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
                      Sign in to review the RSVP prototype dashboard, meal counts, and planning notes in one place.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <InfoChip icon={Users} label="Guests" value="Live Firestore RSVP feed" />
                  <InfoChip icon={Sparkles} label="Workflow" value="Search, review, and export current responses" />
                  <InfoChip icon={Clock3} label="Access" value="Firebase email/password login" />
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="mx-auto flex max-w-md flex-col gap-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--burgundy)]">Admin Sign In</p>
                  <h2 className="font-serif text-3xl text-[var(--navy)]">Admin dashboard login</h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Sign in with the private admin account to access the RSVP management dashboard.
                  </p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2.5">
                    <Label htmlFor="admin-email">Admin email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Enter your password"
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
                    <Button type="submit" className="flex-1" disabled={isSubmitting}>
                      {isSubmitting ? "Signing in..." : "Enter admin"}
                    </Button>
                  </div>
                </form>

                <p className="text-xs leading-5 text-muted-foreground">
                  The public site remains account-free. Only the private admin area requires sign-in.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}

function LoadingScreen() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(107,87,73,0.12),_transparent_36%),linear-gradient(180deg,_#f8f4ed_0%,_#f2e9dc_100%)] px-4 py-8 text-[var(--navy)] sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <Card className="w-full max-w-xl border-[rgba(34,49,63,0.12)] bg-[rgba(255,252,247,0.84)] shadow-[0_30px_80px_rgba(61,42,32,0.12)] backdrop-blur">
          <CardContent className="flex flex-col items-center gap-4 px-8 py-14 text-center">
            <ShieldCheck className="size-10 text-[var(--sage)]" />
            <div className="space-y-2">
              <h1 className="font-serif text-3xl text-[var(--navy)]">Checking admin access</h1>
              <p className="text-sm leading-6 text-muted-foreground">
                Verifying your session before loading the dashboard.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function Dashboard({
  onLogout,
  userEmail,
}: {
  onLogout: () => Promise<void>
  userEmail: string | null
}) {
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([])
  const [isLoadingRsvps, setIsLoadingRsvps] = useState(true)
  const [rsvpError, setRsvpError] = useState("")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [dietaryFilter, setDietaryFilter] = useState<DietaryFilter>("all")
  const [plusOneFilter, setPlusOneFilter] = useState<PlusOneFilter>("all")
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [deleteCandidate, setDeleteCandidate] = useState<RsvpRecord | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState("")

  useEffect(() => {
    setIsLoadingRsvps(true)
    setRsvpError("")

    const rsvpsQuery = query(collection(db, "rsvps"))

    const unsubscribe = onSnapshot(
      rsvpsQuery,
      (snapshot) => {
        const nextRsvps = snapshot.docs
          .map((doc) => mapFirestoreRsvp(doc.id, doc.data() as FirestoreRsvpDoc))
          .sort((left, right) => compareSubmittedAt(right.submittedAt, left.submittedAt))

        setRsvps(nextRsvps)
        setIsLoadingRsvps(false)
      },
      (error) => {
        console.error("Failed to load RSVP data:", error)
        setRsvpError("We couldn't load RSVP responses from Firestore right now. Please refresh and try again.")
        setIsLoadingRsvps(false)
      },
    )

    return unsubscribe
  }, [])

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

  async function handleDelete(id: string) {
    setIsDeleting(true)
    setDeleteError("")

    try {
      await deleteDoc(doc(db, "rsvps", id))
      setDeleteCandidate(null)
      if (selectedId === id) {
        setSelectedId(null)
      }
    } catch (error) {
      console.error("Failed to delete RSVP:", error)
      setDeleteError("We couldn't delete this RSVP right now. Please try again in a moment.")
    } finally {
      setIsDeleting(false)
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
                <Badge className="rounded-full bg-[var(--sage)] text-white hover:bg-[var(--sage)]">Live Firestore</Badge>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                Track attendance, review guest responses, and export the current Firestore RSVP list for planning review.
              </p>
              {userEmail ? (
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--burgundy)]">
                  Signed in as {userEmail}
                </p>
              ) : null}
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

        {rsvpError ? (
          <Alert className="border-[rgba(128,63,56,0.2)] bg-[rgba(128,63,56,0.08)] text-[var(--burgundy)]">
            <AlertTitle>Unable to load RSVPs</AlertTitle>
            <AlertDescription>{rsvpError}</AlertDescription>
          </Alert>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard icon={Users} label="Total RSVPs" value={rsvps.length} accent="text-[var(--navy)]" />
          <SummaryCard icon={UserCheck} label="Attending" value={counts.attending} accent="text-[var(--sage)]" />
          <SummaryCard icon={UserX} label="Declined" value={counts.declined} accent="text-[var(--burgundy)]" />
          <SummaryCard icon={Sparkles} label="Plus ones" value={counts.plusOnes} accent="text-[var(--accent-foreground)]" />
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
          <Card className="border-[rgba(34,49,63,0.12)] bg-[rgba(255,252,247,0.82)]">
            <CardHeader className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <CardTitle className="font-serif text-2xl text-[var(--navy)]">Guest list</CardTitle>
                  <CardDescription>Search, filter, and review RSVP records synced from Firestore.</CardDescription>
                </div>
                <Badge variant="outline" className="rounded-full border-[rgba(34,49,63,0.15)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {isLoadingRsvps ? "Loading..." : `${filteredRsvps.length} visible`}
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
              {isLoadingRsvps ? (
                <LoadingPanel />
              ) : filteredRsvps.length ? (
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
                              <Button variant="ghost" size="icon" onClick={() => setSelectedId(record.id)} aria-label={`View ${record.name}`}>
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
                <CardDescription>Current scope notes for the wedding planning team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p>
                  This phase reads live RSVP submissions from Firestore in real time while keeping admin auth private.
                </p>
                <Separator />
                <ul className="space-y-2">
                  <li>The details modal is available for review, but editing is intentionally not connected yet.</li>
                  <li>The delete confirmation remains in place, but deletion is disabled until write actions are wired safely.</li>
                  <li>CSV export downloads the currently loaded Firestore data in the browser.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <RsvpDetailsDialog
        record={selectedRecord}
        onClose={() => setSelectedId(null)}
        onSaved={() => setSelectedId(null)}
      />

      <Dialog open={Boolean(deleteCandidate)} onOpenChange={(open) => !open && !isDeleting && setDeleteCandidate(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete RSVP</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this RSVP from Firestore? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteCandidate ? (
            <div className="rounded-2xl border border-[rgba(34,49,63,0.08)] bg-[rgba(255,252,247,0.66)] p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{deleteCandidate.name}</p>
              <p>{deleteCandidate.email}</p>
            </div>
          ) : null}
          {deleteError ? (
            <p className="rounded-2xl border border-[rgba(128,63,56,0.18)] bg-[rgba(128,63,56,0.08)] px-4 py-3 text-sm text-[var(--burgundy)]">
              {deleteError}
            </p>
          ) : null}
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteCandidate(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteCandidate && handleDelete(deleteCandidate.id)}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}

function getLoginErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    switch (error.code) {
      case "auth/invalid-email":
        return "Please enter a valid email address."
      case "auth/user-disabled":
        return "This admin account has been disabled."
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "That email or password was not recognized."
      case "auth/too-many-requests":
        return "Too many sign-in attempts. Please wait a moment and try again."
      default:
        return "We couldn't sign you in right now. Please try again."
    }
  }

  return "We couldn't sign you in right now. Please try again."
}

function RsvpDetailsDialog({
  record,
  onClose,
  onSaved,
}: {
  record: RsvpRecord | null
  onClose: () => void
  onSaved: () => void
}) {
  const [form, setForm] = useState<RsvpRecord | null>(record)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const [saveSuccess, setSaveSuccess] = useState("")

  useEffect(() => {
    setForm(record ? { ...record } : null)
    setIsSaving(false)
    setSaveError("")
    setSaveSuccess("")
  }, [record])

  if (!record || !form) {
    return null
  }

  function updateField<K extends keyof RsvpRecord>(key: K, value: RsvpRecord[K]) {
    setForm((current) => (current ? { ...current, [key]: value } : current))
    setSaveError("")
    setSaveSuccess("")
  }

  function normalizeFormForSave(current: RsvpRecord) {
    const isAttending = current.attendanceStatus === "attending"
    const normalizedPartySize = isAttending ? Math.min(2, Math.max(1, current.partySize || 1)) : 0

    return {
      fullName: current.name.trim(),
      email: current.email.trim(),
      attendanceStatus: current.attendanceStatus,
      partySize: normalizedPartySize,
      plusOneName: isAttending && normalizedPartySize > 1 ? current.plusOneName.trim() : "",
      mealChoice: isAttending ? current.mealChoice : "",
      dietaryRestrictions: isAttending ? current.dietaryRestrictions.trim() : "",
      songRequest: isAttending ? current.songRequest.trim() : "",
      notes: current.notes.trim(),
    }
  }

  async function handleSave() {
    const currentForm = form

    if (!currentForm) {
      return
    }

    const normalized = normalizeFormForSave(currentForm)

    if (!normalized.fullName) {
      setSaveError("Please enter the guest's name before saving.")
      return
    }

    if (!normalized.email) {
      setSaveError("Please enter an email address before saving.")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email)) {
      setSaveError("Please enter a valid email address before saving.")
      return
    }

    if (normalized.attendanceStatus === "attending" && !normalized.mealChoice) {
      setSaveError("Please choose a meal option for attending guests.")
      return
    }

    if (normalized.attendanceStatus === "attending" && normalized.partySize > 1 && !normalized.plusOneName) {
      setSaveError("Please add the plus-one name for a party of two.")
      return
    }

    setIsSaving(true)
    setSaveError("")
    setSaveSuccess("")

    try {
      await updateDoc(doc(db, "rsvps", currentForm.id), {
        ...normalized,
        updatedAt: serverTimestamp(),
      })

      setForm((current) =>
        current
          ? {
              ...current,
              name: normalized.fullName,
              email: normalized.email,
              attendanceStatus: normalized.attendanceStatus,
              partySize: normalized.partySize,
              plusOneName: normalized.plusOneName,
              mealChoice: normalized.mealChoice,
              dietaryRestrictions: normalized.dietaryRestrictions,
              songRequest: normalized.songRequest,
              notes: normalized.notes,
            }
          : current,
      )
      setSaveSuccess("RSVP updated successfully.")
      window.setTimeout(() => {
        onSaved()
      }, 700)
    } catch (error) {
      console.error("Failed to update RSVP:", error)
      setSaveError("We couldn't save these RSVP changes right now. Please try again in a moment.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={Boolean(record)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-[var(--navy)]">Edit RSVP</DialogTitle>
          <DialogDescription>Update this guest's Firestore RSVP details and save the changes live.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2 sm:grid-cols-2">
          <Field label="Guest name">
            <Input value={form.name} onChange={(event) => updateField("name", event.target.value)} disabled={isSaving} />
          </Field>
          <Field label="Email address">
            <Input value={form.email} onChange={(event) => updateField("email", event.target.value)} disabled={isSaving} />
          </Field>
          <Field label="Attendance status">
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={form.attendanceStatus}
              onChange={(event) => updateField("attendanceStatus", event.target.value as RsvpStatus)}
              disabled={isSaving}
            >
              <option value="attending">Attending</option>
              <option value="pending">Pending</option>
              <option value="declined">Declined</option>
            </select>
          </Field>
          <Field label="Party size">
            <Input
              type="number"
              min={0}
              max={2}
              value={form.partySize}
              onChange={(event) => updateField("partySize", Number(event.target.value || 0))}
              disabled={isSaving}
            />
          </Field>
          <Field label="Plus one name">
            <Input
              value={form.plusOneName}
              onChange={(event) => updateField("plusOneName", event.target.value)}
              disabled={isSaving}
            />
          </Field>
          <Field label="Meal choice">
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              value={form.mealChoice}
              onChange={(event) => updateField("mealChoice", event.target.value as MealChoice)}
              disabled={isSaving}
            >
              <option value="">No selection</option>
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
              disabled={isSaving}
            />
          </Field>
          <Field label="Song request" className="sm:col-span-2">
            <Input
              value={form.songRequest}
              onChange={(event) => updateField("songRequest", event.target.value)}
              disabled={isSaving}
            />
          </Field>
          <Field label="Notes" className="sm:col-span-2">
            <Textarea
              value={form.notes}
              onChange={(event) => updateField("notes", event.target.value)}
              rows={4}
              disabled={isSaving}
            />
          </Field>
          <Field label="Firestore document ID" className="sm:col-span-2">
            <Input value={form.id} disabled />
          </Field>
        </div>

        {saveError ? (
          <p className="rounded-2xl border border-[rgba(128,63,56,0.18)] bg-[rgba(128,63,56,0.08)] px-4 py-3 text-sm text-[var(--burgundy)]">
            {saveError}
          </p>
        ) : null}
        {saveSuccess ? (
          <p className="rounded-2xl border border-[rgba(88,117,102,0.22)] bg-[rgba(88,117,102,0.1)] px-4 py-3 text-sm text-[var(--sage)]">
            {saveSuccess}
          </p>
        ) : null}

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function mapFirestoreRsvp(id: string, data: FirestoreRsvpDoc): RsvpRecord {
  const attendanceStatus = toRsvpStatus(data.attendanceStatus)
  const mealChoice = toMealChoice(data.mealChoice)
  const partySize = typeof data.partySize === "number" ? data.partySize : attendanceStatus === "attending" ? 1 : 0

  return {
    id,
    name: typeof data.fullName === "string" ? data.fullName : "Unnamed Guest",
    email: typeof data.email === "string" ? data.email : "",
    attendanceStatus,
    partySize,
    plusOneName: typeof data.plusOneName === "string" ? data.plusOneName : "",
    mealChoice,
    dietaryRestrictions: typeof data.dietaryRestrictions === "string" ? data.dietaryRestrictions : "",
    songRequest: typeof data.songRequest === "string" ? data.songRequest : "",
    notes: typeof data.notes === "string" ? data.notes : "",
    submittedAt: formatSubmittedAt(data.submittedAt),
  }
}

function toRsvpStatus(value: string | undefined): RsvpStatus {
  if (value === "attending" || value === "declined" || value === "pending") {
    return value
  }

  return "pending"
}

function toMealChoice(value: string | undefined): MealChoice {
  if (value === "Beef" || value === "Chicken" || value === "Fish" || value === "Vegetarian") {
    return value
  }

  return ""
}

function formatSubmittedAt(value: FirestoreRsvpDoc["submittedAt"]) {
  if (!value) {
    return ""
  }

  if (typeof value === "string") {
    return value
  }

  if (value instanceof Date) {
    return formatDate(value)
  }

  if ("toDate" in value && typeof value.toDate === "function") {
    return formatDate(value.toDate())
  }

  if ("seconds" in value && typeof value.seconds === "number") {
    return formatDate(new Date(value.seconds * 1000))
  }

  return ""
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function compareSubmittedAt(left: string, right: string) {
  const leftTime = Date.parse(left)
  const rightTime = Date.parse(right)

  if (Number.isNaN(leftTime) && Number.isNaN(rightTime)) {
    return 0
  }

  if (Number.isNaN(leftTime)) {
    return -1
  }

  if (Number.isNaN(rightTime)) {
    return 1
  }

  return leftTime - rightTime
}

function LoadingPanel() {
  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center rounded-3xl border border-dashed border-[rgba(34,49,63,0.14)] bg-[rgba(255,252,247,0.66)] px-6 py-10 text-center">
      <Clock3 className="size-10 text-[var(--sage)]" />
      <h3 className="mt-4 font-serif text-2xl text-[var(--navy)]">Loading RSVPs</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        Pulling the latest guest responses from Firestore.
      </p>
    </div>
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
