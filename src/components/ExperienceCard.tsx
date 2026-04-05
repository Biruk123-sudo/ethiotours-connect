import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { Experience } from "@/data/experiences";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

const ExperienceCard = ({ experience, index }: ExperienceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/experience/${experience.id}`} className="group block">
        <div className="rounded-2xl overflow-hidden bg-card shadow-[var(--card-shadow)] hover:shadow-[var(--card-shadow-hover)] transition-shadow duration-300">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={experience.image}
              alt={experience.title}
              loading="lazy"
              width={800}
              height={600}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <MapPin className="w-3 h-3" />
                {experience.location}
              </div>
              <div className="flex items-center gap-1 text-sm font-medium">
                <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                {experience.rating}
                <span className="text-muted-foreground text-xs">({experience.reviewCount})</span>
              </div>
            </div>
            <h3 className="font-display font-semibold text-foreground text-base leading-snug mb-2 line-clamp-2">
              {experience.title}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-muted-foreground text-xs">
                <Clock className="w-3 h-3" />
                {experience.duration}
              </div>
              <p className="text-sm">
                <span className="font-semibold text-foreground">${experience.price}</span>
                <span className="text-muted-foreground text-xs"> / person</span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ExperienceCard;
