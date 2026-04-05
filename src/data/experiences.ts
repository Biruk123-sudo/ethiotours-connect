import lalibela from "@/assets/lalibela.jpg";
import coffeeCeremony from "@/assets/coffee-ceremony.jpg";
import danakil from "@/assets/danakil.jpg";
import simien from "@/assets/simien.jpg";
import omoValley from "@/assets/omo-valley.jpg";
import blueNile from "@/assets/blue-nile.jpg";
import harar from "@/assets/harar.jpg";

export interface Experience {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  category: string;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  guideName: string;
  guideImage: string;
  guideLanguages: string[];
  guideBio: string;
  activities: string[];
  landmarks: string[];
  itinerary: { day: number; title: string; description: string }[];
}

export const categories = [
  { id: "all", label: "All", icon: "✦" },
  { id: "cultural", label: "Cultural", icon: "🏛" },
  { id: "adventure", label: "Adventure", icon: "⛰" },
  { id: "food", label: "Food & Drink", icon: "☕" },
  { id: "historical", label: "Historical", icon: "📜" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "wildlife", label: "Wildlife", icon: "🦁" },
];

export const experiences: Experience[] = [
  {
    id: "lalibela-churches",
    title: "Rock-Hewn Churches of Lalibela",
    description:
      "Explore the magnificent 12th-century monolithic churches carved directly into volcanic rock. This UNESCO World Heritage Site is often called the 'New Jerusalem' and remains one of Africa's most remarkable architectural achievements.",
    price: 120,
    duration: "2 days",
    location: "Lalibela",
    category: "historical",
    rating: 4.9,
    reviewCount: 247,
    image: lalibela,
    images: [lalibela, harar],
    guideName: "Abebe Tadesse",
    guideImage: "",
    guideLanguages: ["Amharic", "English", "French"],
    guideBio:
      "Born and raised in Lalibela, I've been guiding visitors through these sacred churches for over 15 years. My family has been guardians of these churches for generations.",
    activities: ["Walking tours", "Photography", "Cultural immersion", "Church ceremonies"],
    landmarks: ["Bete Giyorgis", "Bete Medhane Alem", "Bete Maryam"],
    itinerary: [
      { day: 1, title: "Northern Cluster", description: "Visit the northern group of churches including Bete Medhane Alem, the largest monolithic church in the world." },
      { day: 2, title: "Southern Cluster & Bete Giyorgis", description: "Explore the southern churches and end with the iconic cross-shaped Church of St. George." },
    ],
  },
  {
    id: "coffee-origins",
    title: "Ethiopian Coffee Origins Trail",
    description:
      "Journey to the birthplace of coffee in the lush forests of Kaffa. Participate in traditional coffee ceremonies, visit wild coffee forests, and learn the ancient art of Ethiopian coffee roasting.",
    price: 85,
    duration: "1 day",
    location: "Kaffa, Jimma",
    category: "food",
    rating: 4.8,
    reviewCount: 183,
    image: coffeeCeremony,
    images: [coffeeCeremony],
    guideName: "Sara Kebede",
    guideImage: "",
    guideLanguages: ["Amharic", "English"],
    guideBio:
      "As a third-generation coffee farmer, I share the deep connection between Ethiopian culture and the world's favorite beverage.",
    activities: ["Coffee tasting", "Farm visit", "Traditional ceremony", "Forest walk"],
    landmarks: ["Kaffa Biosphere", "Wild coffee forests", "Local roasteries"],
    itinerary: [
      { day: 1, title: "Coffee Forest & Ceremony", description: "Visit wild coffee forests, harvest beans, and participate in a full traditional coffee ceremony with a local family." },
    ],
  },
  {
    id: "danakil-expedition",
    title: "Danakil Depression Expedition",
    description:
      "Venture into one of the hottest and most alien landscapes on Earth. Witness bubbling lava lakes, colorful sulfur springs, and vast salt flats in this otherworldly geological wonder.",
    price: 350,
    duration: "3 days",
    location: "Afar Region",
    category: "adventure",
    rating: 4.7,
    reviewCount: 129,
    image: danakil,
    images: [danakil],
    guideName: "Mohammed Ali",
    guideImage: "",
    guideLanguages: ["Afar", "Amharic", "English"],
    guideBio:
      "An Afar native, I know every trail and safe passage through the Danakil. I've led over 500 expeditions into this incredible landscape.",
    activities: ["Trekking", "Camping", "Photography", "Geological exploration"],
    landmarks: ["Erta Ale volcano", "Dallol sulfur springs", "Lake Assal salt flats"],
    itinerary: [
      { day: 1, title: "Journey to Erta Ale", description: "Drive into the Afar lowlands and trek to the rim of Erta Ale, one of the world's few permanent lava lakes." },
      { day: 2, title: "Dallol & Salt Flats", description: "Explore the psychedelic sulfur springs of Dallol and watch Afar salt miners at work." },
      { day: 3, title: "Return Journey", description: "Final morning at the salt flats before returning through the Afar villages." },
    ],
  },
  {
    id: "simien-trek",
    title: "Simien Mountains Trek",
    description:
      "Trek through Ethiopia's stunning mountain landscapes, encountering endemic wildlife like gelada baboons and Walia ibex. Reach the summit of Ras Dashen, Ethiopia's highest peak.",
    price: 200,
    duration: "4 days",
    location: "Simien Mountains",
    category: "nature",
    rating: 4.9,
    reviewCount: 312,
    image: simien,
    images: [simien],
    guideName: "Yohannes Gebre",
    guideImage: "",
    guideLanguages: ["Amharic", "English", "German"],
    guideBio:
      "A certified mountain guide with 20 years of experience in the Simien Mountains. Wildlife conservation is my passion.",
    activities: ["Trekking", "Wildlife watching", "Camping", "Photography"],
    landmarks: ["Ras Dashen", "Chenek Camp", "Imet Gogo viewpoint"],
    itinerary: [
      { day: 1, title: "Sankaber Camp", description: "Begin the trek from Debark, passing through Juniper forests to Sankaber." },
      { day: 2, title: "Geech Camp", description: "Trek to Geech, encountering gelada baboons along the escarpment." },
      { day: 3, title: "Chenek Camp", description: "Reach Chenek with stunning views and chances to spot Walia ibex." },
      { day: 4, title: "Summit Day", description: "Optional summit push to Ras Dashen (4,550m) and return." },
    ],
  },
  {
    id: "omo-valley-tribes",
    title: "Omo Valley Tribal Encounters",
    description:
      "Meet the diverse indigenous tribes of the Omo Valley — the Mursi, Hamar, and Karo peoples. Experience their unique traditions, body art, and ceremonies.",
    price: 280,
    duration: "3 days",
    location: "Omo Valley",
    category: "cultural",
    rating: 4.6,
    reviewCount: 98,
    image: omoValley,
    images: [omoValley],
    guideName: "Dawit Mekonen",
    guideImage: "",
    guideLanguages: ["Amharic", "English", "Mursi"],
    guideBio:
      "I bridge the gap between visitors and the tribal communities with deep respect and understanding.",
    activities: ["Cultural visits", "Photography", "Market visits", "Traditional meals"],
    landmarks: ["Mursi villages", "Hamar bull-jumping ceremony", "Turmi market"],
    itinerary: [
      { day: 1, title: "Jinka & Mursi", description: "Fly to Jinka and visit a Mursi village to learn about their traditions." },
      { day: 2, title: "Hamar & Karo", description: "Visit Hamar and Karo communities, witness traditional dances." },
      { day: 3, title: "Turmi Market", description: "Experience the vibrant Turmi weekly market where tribes converge." },
    ],
  },
  {
    id: "blue-nile-falls",
    title: "Blue Nile Falls & Lake Tana Monasteries",
    description:
      "Witness the thundering Blue Nile Falls and explore ancient island monasteries on Lake Tana, home to centuries-old religious manuscripts and vibrant murals.",
    price: 95,
    duration: "1 day",
    location: "Bahir Dar",
    category: "nature",
    rating: 4.7,
    reviewCount: 156,
    image: blueNile,
    images: [blueNile],
    guideName: "Tigist Alemu",
    guideImage: "",
    guideLanguages: ["Amharic", "English"],
    guideBio: "A Bahir Dar local passionate about sharing the natural and spiritual wonders of Lake Tana.",
    activities: ["Boat tours", "Waterfall hiking", "Monastery visits", "Bird watching"],
    landmarks: ["Tis Abay Falls", "Ura Kidane Mihret", "Azwa Maryam monastery"],
    itinerary: [
      { day: 1, title: "Falls & Monasteries", description: "Morning visit to Blue Nile Falls, afternoon boat tour to island monasteries on Lake Tana." },
    ],
  },
  {
    id: "harar-old-city",
    title: "Harar: The Walled City & Hyena Feeding",
    description:
      "Wander through the ancient walled city of Harar, a UNESCO World Heritage Site with over 80 mosques. End the evening with the famous hyena feeding ritual.",
    price: 75,
    duration: "1 day",
    location: "Harar",
    category: "cultural",
    rating: 4.8,
    reviewCount: 201,
    image: harar,
    images: [harar],
    guideName: "Ahmed Hassan",
    guideImage: "",
    guideLanguages: ["Harari", "Amharic", "English", "Arabic"],
    guideBio: "Born inside the walls of Harar, I know every alley, mosque, and secret of this ancient city.",
    activities: ["Walking tour", "Hyena feeding", "Market visit", "Coffee tasting"],
    landmarks: ["Jugol walls", "Rimbaud House", "Harar Gate"],
    itinerary: [
      { day: 1, title: "Harar Exploration", description: "Morning walk through Jugol's colorful alleys, afternoon market visit, evening hyena feeding ceremony." },
    ],
  },
];
