// Central mock data for the wedding website.
// All content here is placeholder. Replace with real data when wiring up a backend.

export const wedding = {
  brideFirst: "Morgan",
  groomFirst: "Brendan",
  brideFull: "Morgan Havron",
  groomFull: "Brendan Morrissey",
  monogram: "M & B",
  // Placeholder date - update before launch.
    dateISO: "2026-11-14T15:00:00-04:00",
    dateLong: "Saturday, November 14, 2026",
    dateShort: "11 . 14 . 2026",
  city: "Savannah, Georgia",
  hashtag: "#HavronMeetsMorrissey",
  rsvpDeadline: "April 1, 2026",
  contactEmail: "wedding@email.com",
}

export type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/story" },
  { label: "Schedule", href: "/schedule" },
  { label: "Venues", href: "/venues" },
  { label: "Travel", href: "/travel" },
  { label: "Registry", href: "/registry" },
  { label: "FAQ", href: "/faq" },
]

export type ScheduleEvent = {
  id: string
  title: string
  date: string
  time: string
  location: string
  address: string
  attire: string
  notes: string
  status?: "confirmed" | "tbd"
}

export const schedule: ScheduleEvent[] = [
  {
    id: "welcome",
    title: "Welcome Party",
    date: "Friday, May 15, 2026",
    time: "7:00 PM – 10:00 PM",
    location: "Location to be announced",
    address: "Savannah, Georgia",
    attire: "Cocktail attire",
    notes:
      "Join us the evening before to greet friends and family arriving from near and far. Details coming soon.",
    status: "tbd",
  },
  {
    id: "ceremony",
    title: "The Ceremony",
    date: "Saturday, May 16, 2026",
    time: "4:30 PM",
    location: "Trinity Methodist Church",
    address: "225 W President St, Savannah, GA 31401",
    attire: "Black-tie",
    notes:
      "We invite you to be seated by 4:15 PM. The ceremony will be followed by a brief reception of well-wishes.",
    status: "confirmed",
  },
  {
    id: "reception",
    title: "The Reception",
    date: "Saturday, May 16, 2026",
    time: "6:00 PM – 11:00 PM",
    location: "The DeSoto",
    address: "15 E Liberty St, Savannah, GA 31401",
    attire: "Black-tie",
    notes:
      "An evening of dinner, dancing, and celebration in the grand ballroom. Cocktails begin at 6:00 PM.",
    status: "confirmed",
  },
  {
    id: "brunch",
    title: "Farewell Brunch",
    date: "Sunday, May 17, 2026",
    time: "10:00 AM – 12:00 PM",
    location: "Location to be announced",
    address: "Savannah, Georgia",
    attire: "Casual",
    notes:
      "Before you depart, share one last meal with us. An optional send-off for all who are able to stay.",
    status: "tbd",
  },
]

export type Venue = {
  id: string
  name: string
  role: string
  image: string | null
  address: string
  parking: string
  transportation: string
  comingSoon?: boolean
}

export const venues: Venue[] = [
  {
    id: "church",
    name: "Trinity Methodist Church",
    role: "Ceremony",
    image: "/images/trinity-church.png",
    address: "225 W President St, Savannah, GA 31401",
    parking:
      "Street parking is available around Telfair Square. Public garages are a short walk away on Bryan Street and Liberty Street.",
    transportation:
      "The church is centrally located in the Historic District, an easy walk or short ride from most downtown hotels.",
  },
  {
    id: "desoto",
    name: "The DeSoto",
    role: "Reception",
    image: "/images/desoto-ballroom.png",
    address: "15 E Liberty St, Savannah, GA 31401",
    parking:
      "Valet parking is available at the hotel entrance on Liberty Street. Self-parking is offered in the adjacent garage.",
    transportation:
      "Shuttle service will run between Trinity Methodist Church and The DeSoto following the ceremony.",
  },
  {
    id: "welcome",
    name: "Welcome Party Venue",
    role: "Welcome Party",
    image: null,
    address: "Savannah, Georgia",
    parking: "Details to follow.",
    transportation: "Details to follow.",
    comingSoon: true,
  },
]

export type StoryMoment = {
  id: string
  year: string
  title: string
  body: string
  image: string | null
}

export const storyMoments: StoryMoment[] = [
  {
    id: "met",
    year: "2021",
    title: "A Chance Sublet",
    body: "We met in 2021 when Brendan was searching for a new apartment and Morgan was subleasing hers. Although our paths crossed at first in a practical way, we did not truly begin talking until a package meant for Morgan's old address was delivered by mistake. That small mix-up gave us a reason to reconnect, and before long, one conversation led to another.",
    image: "/images/engagement-1.png",
  },
  {
    id: "savannah",
    year: "2023",
    title: "Savannah, Our Kind of Place",
    body: "In May 2023, we took our first trip to Savannah with Brendan's parents. There was something about the moss-draped oaks, the quiet streets, and the unhurried charm of the city that stayed with us. From that visit on, Savannah felt woven into our story, and choosing it for our wedding felt both natural and deeply meaningful.",
    image: null,
  },
  {
    id: "proposal",
    year: "2024",
    title: "A Hike and a Drone",
    body: "On April 26, 2024, our story took its next beautiful step at Rainbow Falls in Chattanooga. Brendan planned a proposal on a trail overlooking the falls and even filmed the moment with a drone, equal parts thoughtful gesture and private joke that felt perfectly us. It was a joyful, unforgettable day, and of course, the answer was yes.",
    image: "/images/engagement-2.png",
  },
  {
    id: "forever",
    year: "2026",
    title: "See You in Savannah",
    body: "Now, with so many treasured memories tied to that city, we are overjoyed to celebrate our wedding in Savannah on November 14, 2026. We cannot wait to gather with the people we love most and share the place that has meant so much to us from the very beginning.",
    image: null,
  },
]

export type Hotel = {
  id: string
  name: string
  rate: string
  distance: string
  note: string
  code: string
}

export const hotels: Hotel[] = [
  {
    id: "desoto-hotel",
    name: "The DeSoto",
    rate: "From $279 / night",
    distance: "Reception venue · Historic District",
    note: "Our recommended hotel and reception venue. Stay where the celebration happens.",
    code: "HAVRON-MORRISSEY",
  },
  {
    id: "perry-lane",
    name: "Perry Lane Hotel",
    rate: "From $329 / night",
    distance: "0.4 miles from The DeSoto",
    note: "A refined boutique stay with a rooftop bar overlooking the Historic District.",
    code: "EJ2026",
  },
  {
    id: "marshall-house",
    name: "The Marshall House",
    rate: "From $239 / night",
    distance: "0.5 miles from The DeSoto",
    note: "Historic charm on Broughton Street, within walking distance of both venues.",
    code: "EJWEDDING",
  },
]

export type Faq = { question: string; answer: string }

export type RsvpHelpItem = {
  title: string
  body: string
}

export const faqs: Faq[] = [
  {
    question: "What is the dress code?",
    answer:
      "Both the ceremony and reception are black-tie. We kindly ask gentlemen to wear tuxedos and ladies to wear floor-length gowns. The welcome party is cocktail attire.",
  },
  {
    question: "Where should I park?",
    answer:
      "Valet and garage parking are available at The DeSoto. Street and garage parking surround Trinity Methodist Church in the Historic District. See the Venues page for details.",
  },
  {
    question: "Will transportation be provided?",
    answer:
      "Yes. A shuttle will run between Trinity Methodist Church and The DeSoto following the ceremony. Additional transportation details will be shared closer to the date.",
  },
  {
    question: "Are children welcome?",
    answer:
      "While we adore your little ones, we have chosen to make our wedding an adults-only celebration so that everyone may relax and enjoy the evening.",
  },
  {
    question: "May I bring a plus-one?",
    answer:
      "Plus-ones are noted on your invitation. If your invitation includes a guest, you will be able to add their name on the RSVP form.",
  },
  {
    question: "When should I RSVP by?",
    answer:
      "Please respond no later than April 1, 2026. We kindly ask for your reply by this date so we may finalize arrangements with our venues.",
  },
  {
    question: "Can I change my RSVP after submitting?",
    answer:
      "Certainly. If your plans change, please send us a note at wedding@email.com and we will be glad to update your reply for you.",
  },
  {
    question: "What if I made a mistake on my RSVP?",
    answer:
      "No trouble at all. If you entered the wrong email address, misspelled a name, or need to correct any detail, please reach out to us at wedding@email.com and we will happily make the change.",
  },
  {
    question: "What if my dietary restriction changes?",
    answer:
      "We would be grateful to know as soon as possible. Please email wedding@email.com if your meal selection, dietary needs, or your guest's preferences change, and we will do our very best to accommodate them.",
  },
  {
    question: "Have hotel blocks been reserved?",
    answer:
      "Yes. We have arranged room blocks at several nearby hotels. Please see the Travel page for booking codes and rates.",
  },
  {
    question: "What time does the ceremony begin?",
    answer:
      "The ceremony begins promptly at 4:30 PM at Trinity Methodist Church. Please plan to be seated by 4:15 PM.",
  },
  {
    question: "What time does the reception end?",
    answer:
      "The reception at The DeSoto will conclude at 11:00 PM, with a farewell send-off to follow.",
  },
  {
    question: "What is the weather like in Savannah in May?",
    answer:
      "May in Savannah is warm and lovely, with daytime temperatures in the low 80s°F and pleasant evenings in the upper 60s. Light layers are recommended for the evening.",
  },
]

export const rsvpHelpItems: RsvpHelpItem[] = [
  {
    title: "If your plans change",
    body:
      "Should you need to revise your reply after submitting, please send us a note at wedding@email.com and we will be pleased to update your RSVP on your behalf.",
  },
  {
    title: "If you used the wrong email",
    body:
      "If your RSVP was submitted with an incorrect email address, kindly contact us at wedding@email.com with the correct address and we will make sure everything is amended properly.",
  },
  {
    title: "If your guest or meal choice changes",
    body:
      "If your plus-one changes, or if meal selections or dietary restrictions need to be adjusted, please email wedding@email.com and we will happily help with those details.",
  },
]

export type RegistryItem = {
  id: string
  name: string
  description: string
}

export const registries: RegistryItem[] = [
  { id: "crate", name: "Crate & Barrel", description: "Home essentials and elegant tableware for our new chapter together." },
  { id: "williams", name: "Williams Sonoma", description: "Kitchen and entertaining pieces for the dinners we hope to host." },
  { id: "honeymoon", name: "Honeymoon Fund", description: "Contribute to our first journey together as husband and wife." },
  { id: "zola", name: "Zola Registry", description: "A curated collection of gifts to help us build our home." },
]

export type ThingToDo = {
  id: string
  name: string
  category: "See" | "Eat" | "Drink"
  description: string
}

export const thingsToDo: ThingToDo[] = [
  { id: "forsyth", name: "Forsyth Park", category: "See", description: "Savannah's most beloved park, home to the iconic fountain and sprawling oak canopies." },
  { id: "river", name: "River Street", category: "See", description: "Cobblestone streets along the Savannah River lined with shops and galleries." },
  { id: "bonaventure", name: "Bonaventure Cemetery", category: "See", description: "A hauntingly beautiful historic cemetery draped in Spanish moss." },
  { id: "grey", name: "The Grey", category: "Eat", description: "Award-winning Southern cuisine set in a restored 1938 Greyhound terminal." },
  { id: "olde-pink", name: "The Olde Pink House", category: "Eat", description: "Classic Lowcountry fare in a historic 18th-century mansion." },
  { id: "perch", name: "Peregrin Rooftop", category: "Drink", description: "Cocktails with sweeping views over the Historic District." },
  { id: "myrtle", name: "Artillery Bar", category: "Drink", description: "An elegant cocktail lounge in a converted historic armory." },
]
