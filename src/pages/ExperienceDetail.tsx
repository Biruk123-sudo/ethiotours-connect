import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, ArrowLeft, Users, Globe, Calendar, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { experiences } from "@/data/experiences";

const ExperienceDetail = () => {
  const { id } = useParams();
  const experience = experiences.find((e) => e.id === id);
  const [guests, setGuests] = useState(2);

  if (!experience) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Experience not found</h1>
          <Link to="/" className="text-primary underline">Back to home</Link>
        </div>
      </div>
    );
  }

  const totalPrice = experience.price * guests;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to experiences
        </Link>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Image */}
          <div className="rounded-2xl overflow-hidden mb-8 aspect-[21/9] max-h-[480px]">
            <img src={experience.image} alt={experience.title} className="w-full h-full object-cover" width={800} height={600} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{experience.location}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{experience.duration}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-secondary fill-secondary" />{experience.rating} ({experience.reviewCount})</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{experience.title}</h1>
                <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
              </div>

              {/* Guide */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="font-display font-semibold text-lg mb-3">Your Guide</h3>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0">
                    {experience.guideName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{experience.guideName}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1 mb-2">
                      <Globe className="w-3 h-3" />
                      {experience.guideLanguages.join(", ")}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{experience.guideBio}</p>
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div>
                <h3 className="font-display font-semibold text-lg mb-4">Itinerary</h3>
                <div className="space-y-4">
                  {experience.itinerary.map((day) => (
                    <div key={day.day} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold shrink-0">
                        {day.day}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{day.title}</p>
                        <p className="text-sm text-muted-foreground">{day.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities & Landmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-display font-semibold text-lg mb-3">Activities</h3>
                  <ul className="space-y-2">
                    {experience.activities.map((a) => (
                      <li key={a} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-3">Landmarks</h3>
                  <ul className="space-y-2">
                    {experience.landmarks.map((l) => (
                      <li key={l} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" /> {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Booking sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 border border-border shadow-[var(--card-shadow)]">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-bold text-foreground">${experience.price}</span>
                  <span className="text-muted-foreground text-sm">/ person</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="border border-border rounded-xl p-3">
                    <label className="text-xs text-muted-foreground block mb-1">Date</label>
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      Select a date
                    </div>
                  </div>
                  <div className="border border-border rounded-xl p-3">
                    <label className="text-xs text-muted-foreground block mb-1">Guests</label>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        {guests} {guests === 1 ? "guest" : "guests"}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setGuests(guests + 1)}
                          className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">${experience.price} × {guests} guests</span>
                    <span className="text-foreground">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-foreground">
                    <span>Total</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>

                <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
                  Reserve Experience
                </button>
                <p className="text-xs text-center text-muted-foreground mt-3">You won't be charged yet</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ExperienceDetail;
