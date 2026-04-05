import { Search, MapPin, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-ethiopia.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Simien Mountains Ethiopia at golden hour"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground/60" />
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-4">
            Discover the
            <br />
            <span className="text-secondary">Soul of Ethiopia</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-lg font-sans">
            Authentic experiences with local guides. From ancient churches to volcanic landscapes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="bg-card rounded-2xl p-2 shadow-xl max-w-3xl flex flex-col md:flex-row gap-2"
        >
          <div className="flex items-center gap-2 px-4 py-3 flex-1 border-b md:border-b-0 md:border-r border-border">
            <MapPin className="w-5 h-5 text-primary shrink-0" />
            <input
              type="text"
              placeholder="Where to?"
              className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 flex-1 border-b md:border-b-0 md:border-r border-border">
            <Calendar className="w-5 h-5 text-primary shrink-0" />
            <input
              type="text"
              placeholder="When?"
              className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-3 flex-1">
            <Users className="w-5 h-5 text-primary shrink-0" />
            <input
              type="text"
              placeholder="Guests"
              className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl flex items-center gap-2 font-medium text-sm hover:opacity-90 transition-opacity shrink-0">
            <Search className="w-4 h-4" />
            Search
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
