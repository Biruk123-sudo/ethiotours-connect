import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

// Deterministic sample reviews per experience id
const SAMPLE_REVIEWS: Review[] = [
  { id: "r1", name: "Marta Johansson", date: "March 2026", rating: 5, comment: "Absolutely unforgettable. Our guide's deep knowledge made every moment meaningful. Highly recommend to anyone visiting Ethiopia." },
  { id: "r2", name: "James O'Connor", date: "February 2026", rating: 5, comment: "Truly authentic experience. The pace was perfect and we felt safe and well taken care of throughout the journey." },
  { id: "r3", name: "Aiko Tanaka", date: "January 2026", rating: 4, comment: "Beautiful scenery and warm hospitality. The food was incredible. Only wish we had a bit more time at each stop." },
  { id: "r4", name: "Liam Müller", date: "December 2025", rating: 5, comment: "A once-in-a-lifetime trip. The cultural immersion was profound and the guide truly went above and beyond." },
];

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
}

const ReviewsSection = ({ rating, reviewCount }: ReviewsSectionProps) => {
  return (
    <section aria-label="Reviews" className="border-t border-border pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-xl flex items-center gap-2">
          <Star className="w-5 h-5 text-secondary fill-secondary" />
          {rating} · {reviewCount} reviews
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SAMPLE_REVIEWS.map((review, i) => (
          <motion.article
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-card border border-border rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold">
                {review.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`w-3.5 h-3.5 ${
                    idx < review.rating ? "text-secondary fill-secondary" : "text-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default ReviewsSection;
