// Mock RSVP records for the admin dashboard.
// Replace with real database queries when wiring up a backend.

export type RsvpStatus = "attending" | "declined" | "pending"
export type AttendanceStatus = RsvpStatus
export type MealChoice = "Beef" | "Chicken" | "Fish" | "Vegetarian" | ""
export type Meal = MealChoice

export type RsvpRecord = {
  id: string
  name: string
  email: string
  attendanceStatus: RsvpStatus
  partySize: number
  plusOneName: string
  mealChoice: MealChoice
  dietaryRestrictions: string
  songRequest: string
  notes: string
  submittedAt: string
}

export const mockRsvps: RsvpRecord[] = [
  {
    id: "r-001",
    name: "Margaret Ellison",
    email: "margaret.ellison@example.com",
    attendanceStatus: "attending",
    partySize: 2,
    plusOneName: "Daniel Ellison",
    mealChoice: "Beef",
    dietaryRestrictions: "None",
    songRequest: "At Last - Etta James",
    notes: "We are overjoyed for you both. Can't wait to celebrate!",
    submittedAt: "2026-03-02",
  },
  {
    id: "r-002",
    name: "Thomas Reed",
    email: "t.reed@example.com",
    attendanceStatus: "attending",
    partySize: 1,
    plusOneName: "",
    mealChoice: "Fish",
    dietaryRestrictions: "Shellfish allergy",
    songRequest: "Can't Help Falling in Love - Elvis Presley",
    notes: "Honored to stand beside you, James.",
    submittedAt: "2026-03-04",
  },
  {
    id: "r-003",
    name: "Olivia Hartman",
    email: "olivia.h@example.com",
    attendanceStatus: "attending",
    partySize: 2,
    plusOneName: "Marcus Hartman",
    mealChoice: "Chicken",
    dietaryRestrictions: "None",
    songRequest: "Signed, Sealed, Delivered - Stevie Wonder",
    notes: "Please save us a spot on the dance floor.",
    submittedAt: "2026-03-05",
  },
  {
    id: "r-004",
    name: "Gregory Vance",
    email: "g.vance@example.com",
    attendanceStatus: "declined",
    partySize: 0,
    plusOneName: "",
    mealChoice: "",
    dietaryRestrictions: "",
    songRequest: "",
    notes: "So sorry to miss it, sending all our love from afar.",
    submittedAt: "2026-03-06",
  },
  {
    id: "r-005",
    name: "Sophie Bennett",
    email: "sophie.bennett@example.com",
    attendanceStatus: "attending",
    partySize: 2,
    plusOneName: "Guest",
    mealChoice: "Vegetarian",
    dietaryRestrictions: "Vegan",
    songRequest: "September - Earth, Wind & Fire",
    notes: "Counting down the days!",
    submittedAt: "2026-03-08",
  },
  {
    id: "r-006",
    name: "Henry Davenport",
    email: "h.davenport@example.com",
    attendanceStatus: "pending",
    partySize: 0,
    plusOneName: "",
    mealChoice: "",
    dietaryRestrictions: "",
    songRequest: "",
    notes: "",
    submittedAt: "",
  },
  {
    id: "r-007",
    name: "Catherine Whitfield",
    email: "c.whitfield@example.com",
    attendanceStatus: "attending",
    partySize: 1,
    plusOneName: "",
    mealChoice: "Beef",
    dietaryRestrictions: "Gluten-free",
    songRequest: "The Way You Look Tonight - Frank Sinatra",
    notes: "We could not be prouder. With all our love, Mom.",
    submittedAt: "2026-02-28",
  },
  {
    id: "r-008",
    name: "Andrew Foster",
    email: "a.foster@example.com",
    attendanceStatus: "pending",
    partySize: 0,
    plusOneName: "",
    mealChoice: "",
    dietaryRestrictions: "",
    songRequest: "",
    notes: "",
    submittedAt: "",
  },
  {
    id: "r-009",
    name: "Diane Calloway",
    email: "d.calloway@example.com",
    attendanceStatus: "attending",
    partySize: 2,
    plusOneName: "Richard Calloway",
    mealChoice: "Chicken",
    dietaryRestrictions: "None",
    songRequest: "Unforgettable - Nat King Cole",
    notes: "Welcome to the family, Eleanor!",
    submittedAt: "2026-03-01",
  },
  {
    id: "r-010",
    name: "Beatrice Lowell",
    email: "b.lowell@example.com",
    attendanceStatus: "declined",
    partySize: 0,
    plusOneName: "",
    mealChoice: "",
    dietaryRestrictions: "",
    songRequest: "",
    notes: "Wish we could be there. Congratulations to you both.",
    submittedAt: "2026-03-09",
  },
  {
    id: "r-011",
    name: "William Calloway",
    email: "w.calloway@example.com",
    attendanceStatus: "attending",
    partySize: 2,
    plusOneName: "Anna Calloway",
    mealChoice: "Fish",
    dietaryRestrictions: "None",
    songRequest: "You Make My Dreams - Hall & Oates",
    notes: "Best man and ready to celebrate!",
    submittedAt: "2026-03-03",
  },
  {
    id: "r-012",
    name: "Eleanor Pierce",
    email: "e.pierce@example.com",
    attendanceStatus: "pending",
    partySize: 0,
    plusOneName: "",
    mealChoice: "",
    dietaryRestrictions: "",
    songRequest: "",
    notes: "",
    submittedAt: "",
  },
]

export const mealOptions = ["Beef", "Chicken", "Fish", "Vegetarian"] as const
