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
  hashtag: "#MeetUsInTheMoss",
  rsvpDeadline: "September 1, 2026",
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
    date: "Friday, November 13, 2026",
    time: "7:00 PM – 10:00 PM",
    location: "Location to be announced",
    address: "Savannah, Georgia",
    attire: "Black tie optional",
    notes:
      "Join us the evening before to greet friends and family arriving from near and far. Details coming soon.",
    status: "tbd",
  },
  {
    id: "ceremony",
    title: "The Ceremony",
    date: "Saturday, November 14, 2026",
    time: "3:00 PM",
    location: "Trinity Methodist Church",
    address: "225 W President St, Savannah, GA 31401",
    attire: "Black tie optional",
    notes:
      "We invite you to be seated by 2:45 PM. The ceremony will be followed by a brief reception of well-wishes.",
    status: "confirmed",
  },
  {
    id: "cocktail-hour",
    title: "Cocktail Hour",
    date: "Saturday, November 14, 2026",
    time: "4:00 PM – 5:00 PM",
    location: "The DeSoto",
    address: "15 E Liberty St, Savannah, GA 31401",
    attire: "Black tie optional",
    notes:
      "Join us for cocktails and conversation before we head into dinner and dancing in the ballroom.",
    status: "confirmed",
  },
  {
    id: "reception",
    title: "The Reception",
    date: "Saturday, November 14, 2026",
    time: "5:00 PM – 11:00 PM",
    location: "The DeSoto",
    address: "15 E Liberty St, Savannah, GA 31401",
    attire: "Black tie optional",
    notes:
      "An evening of dinner, dancing, and celebration in the grand ballroom.",
    status: "confirmed",
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
    image: "images/Trinity_Methodist_Church_-_August_9,_2020.jpg",
    address: "225 W President St, Savannah, GA 31401",
    parking:
      "Street parking is available around Telfair Square. Public garages are a short walk away on Bryan Street and Liberty Street.",
    transportation:
      "A trolley will run between The DeSoto and Trinity Methodist Church before and after the ceremony for guests who would like transportation.",
  },
  {
    id: "desoto",
    name: "The DeSoto",
    role: "Reception",
    image: "images/hotel-desoto-savannah.jpg",
    address: "15 E Liberty St, Savannah, GA 31401",
    parking:
      "Valet parking is available at the hotel entrance on Liberty Street. Self-parking is offered in the adjacent garage.",
    transportation:
      "A trolley will run between The DeSoto and Trinity Methodist Church to and from the ceremony.",
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
    body: "Brendan and Morgan met in 2021 when Brendan was searching for a new apartment and Morgan was subleasing as she prepared to move into her condo. Although their paths first crossed in a practical way, and they somewhat fancied each other in their limited interactions, neither truly entertained a romance until a few months later. Morgan accidentally, as she still insists, forgot to update her address, and mail continued arriving at Brendan's apartment. That small mix-up gave them a reason to reconnect, and before long, one conversation led to another.",
    image: "/images/sublet.JPG",
  },
  {
    id: "savannah",
    year: "2023",
    title: "Savannah, Our Kind of Place",
    body: "In May 2023, Brendan and Morgan took their first trip to Savannah with Brendan's parents. There was something about the moss-draped oaks, the quiet streets, and the unhurried charm of the city that stayed with them. From that visit on, Savannah felt woven into their story, and choosing it for their wedding felt both natural and deeply meaningful.",
    image: "/images/savannah.JPG",
  },
  {
    id: "proposal",
    year: "2024",
    title: "A Hike and a Drone",
    body: "On April 26, 2024, their story took its next step at Rainbow Falls in Chattanooga. Brendan planned a proposal on a rock beneath the falls and filmed the moment with a drone, since it was no small task to find a photographer willing to hike two miles downhill through the forest. It was a joyful, unforgettable day, and of course, the answer was yes.",
    image: "/images/IMG_3449.JPG",
  },
  {
    id: "forever",
    year: "2026",
    title: "See You in Savannah",
    body: "Now, with so many treasured memories tied to that city, Morgan and Brendan are overjoyed to celebrate their wedding in Savannah on November 14, 2026. They cannot wait to gather with the people they love most and share the place that has meant so much to them from the very beginning.",
    image: "/images/morgan&brendanengaged-7984.jpg",
  },
]

export type Hotel = {
  id: string
  name: string
  rate: string
  distance: string
  note: string
  code: string
  url: string
  phone?: string
}

export const hotelBlock: Hotel = {
  id: "desoto-hotel",
  name: "The DeSoto",
  rate: "From $213 / night",
  distance: "Reception venue · Historic District",
  note: "Our only room block will be at The DeSoto, where the reception will also be held. Stay where the celebration happens and enjoy the easiest walk home at the end of the evening.",
  code: "2611HAVMOR",
  url: "https://be.synxis.com/?Hotel=76327&Chain=25795&arrive=2026-11-13&depart=2026-11-15&adult=1&child=0&group=2611HAVMOR",
  phone: "(912) 232-9000",
}

export type NearbyHotel = {
  id: string
  name: string
  note: string
  url: string
  phone?: string
}

export const nearbyHotels: NearbyHotel[] = [
  {
    id: "perry-lane",
    name: "Perry Lane Hotel",
    note: "A polished boutique stay for guests looking for a luxe Savannah weekend in the Historic District.",
    url: "https://www.perrylanehotel.com/",
    phone: "(912) 415-9000",
  },
  {
    id: "marshall-house",
    name: "The Marshall House",
    note: "A beloved historic Savannah hotel with classic Southern character and plenty of charm.",
    url: "https://www.marshallhouse.com/",
    phone: "(912) 644-7896",
  },
  {
    id: "hyatt-regency-savannah",
    name: "Hyatt Regency Savannah",
    note: "A reliable waterfront chain option for guests who prefer a larger full-service hotel.",
    url: "https://www.hyatt.com/hyatt-regency/en-US/savrs-hyatt-regency-savannah",
    phone: "(912) 238-1234",
  },
  {
    id: "andaz-savannah",
    name: "Andaz Savannah",
    note: "A stylish chain hotel near City Market with convenient access to the Historic District.",
    url: "https://www.hyatt.com/andaz/en-US/savrd-andaz-savannah",
    phone: "(912) 233-2116",
  },
  {
    id: "holiday-inn-express-savannah-historic-district",
    name: "Holiday Inn Express Savannah Historic District",
    note: "A straightforward chain stay for guests who want a comfortable and convenient home base downtown.",
    url: "https://www.ihg.com/holidayinnexpress/hotels/us/en/savannah/savhd/hoteldetail",
    phone: "+1-912-292-0350",
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
      "The dress code for the weekend is black tie optional. Tuxedos and formal gowns are welcome, and a dark suit or other formal evening attire is equally appropriate.",
  },
  {
    question: "Where should I park?",
    answer:
      "Valet and garage parking are available at The DeSoto. Street and garage parking surround Trinity Methodist Church in the Historic District. See the Venues page for details.",
  },
  {
    question: "Will transportation be provided?",
    answer:
      "Yes. A trolley will run between The DeSoto and Trinity Methodist Church to and from the ceremony. Additional transportation details will be shared closer to the date.",
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
      "Please respond no later than September 1, 2026. We kindly ask for your reply by this date so we may finalize arrangements with our venues.",
  },
  {
    question: "Can I change my RSVP after submitting?",
    answer:
      "Certainly. If your plans change, please reach out to Brendan or Morgan directly, and we will be glad to update your reply for you.",
  },
  {
    question: "What if I made a mistake on my RSVP?",
    answer:
      "No trouble at all. If you entered the wrong email address, misspelled a name, or need to correct any detail, please reach out to Brendan or Morgan directly and we will happily make the change.",
  },
  {
    question: "What if my dietary restriction changes?",
    answer:
      "We would be grateful to know as soon as possible. If your meal selection, dietary needs, or your guest's preferences change, please reach out to Brendan or Morgan directly and we will do our very best to accommodate them.",
  },
  {
    question: "Have hotel blocks been reserved?",
    answer:
      "Yes. Our room block will be at The DeSoto. We will also share a few nearby hotel suggestions on the Travel page for guests who would prefer other accommodations.",
  },
  {
    question: "What time does the ceremony begin?",
    answer:
      "The ceremony begins promptly at 3:00 PM at Trinity Methodist Church. Please plan to be seated by 2:45 PM.",
  },
  {
    question: "What time does the reception end?",
    answer:
      "The reception at The DeSoto will conclude at 11:00 PM.",
  },
  {
    question: "What is the weather like in Savannah in November?",
    answer:
      "November in Savannah is typically mild and comfortable, with daytime temperatures in the upper 60s to low 70s°F and cooler evenings in the 50s. A light wrap or jacket will be lovely to have after sunset.",
  },
]

export const rsvpHelpItems: RsvpHelpItem[] = [
  {
    title: "If your plans change",
    body:
      "Should you need to revise your reply after submitting, please reach out to Brendan or Morgan directly and we will be pleased to update your RSVP on your behalf.",
  },
  {
    title: "If you used the wrong email",
    body:
      "If your RSVP was submitted with an incorrect email address, kindly reach out to Brendan or Morgan directly with the correct one and we will make sure everything is amended properly.",
  },
  {
    title: "If your guest or meal choice changes",
    body:
      "If your plus-one changes, or if meal selections or dietary restrictions need to be adjusted, please reach out to Brendan or Morgan directly and we will happily help with those details.",
  },
]

export type RegistryItem = {
  id: string
  name: string
  description: string
}

export const registries: RegistryItem[] = [
  {
    id: "tbd",
    name: "Registry Details to Come",
    description:
      "We are still finalizing our registry and will share those details once everything is in place. Thank you for your patience and for celebrating this season with us.",
  },
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
  { id: "sorry-charlies", name: "Sorry Charlie's", category: "Eat", description: "A lively downtown favorite for seafood, oysters, and an easygoing Savannah atmosphere." },
  { id: "the-public", name: "The Public", category: "Eat", description: "A stylish neighborhood spot for a relaxed meal and cocktails in the heart of downtown." },
  { id: "perch", name: "Peregrin Rooftop", category: "Drink", description: "Cocktails with sweeping views over the Historic District." },
  { id: "myrtle", name: "Artillery Bar", category: "Drink", description: "An elegant cocktail lounge in a converted historic armory." },
  { id: "rocks-on-the-roof", name: "Rocks on the Roof", category: "Drink", description: "A rooftop perch for drinks with river views and a lively evening scene." },
  { id: "totally-awesome-bar", name: "Totally Awesome Bar", category: "Drink", description: "Our favorite stop for a fun night out, with a playful atmosphere that always makes for a memorable evening." },
]
