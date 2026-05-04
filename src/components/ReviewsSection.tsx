import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  comment: string;
}

const SAMPLE_REVIEWS: Review[] = [
  { id: "r1", name: "Marta Johansson", date: "March 2026", rating: 5, comment: "Absolutely unforgettable. Our guide's deep knowledge made every moment meaningful. Highly recommend to anyone visiting Ethiopia." },
  { id: "r2", name: "James O'Connor", date: "February 2026", rating: 5, comment: "Truly authentic experience. The pace was perfect and we felt safe and well taken care of throughout the journey." },
  { id: "r3", name: "Aiko Tanaka", date: "January 2026", rating: 4, comment: "Beautiful scenery and warm hospitality. The food was incredible. Only wish we had a bit more time at each stop." },
  { id: "r4", name: "Liam Müller", date: "December 2025", rating: 5, comment: "A once-in-a-lifetime trip. The cultural immersion was profound and the guide truly went above and beyond." },
];

interface ReviewsSectionProps {
  experienceId: string;
  rating: number;
  reviewCount: number;
}

const MAX_COMMENT = 1000;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { month: "long", year: "numeric" });

const ReviewsSection = ({ experienceId, rating, reviewCount }: ReviewsSectionProps) => {
  const { user } = useAuth();
  const [dbReviews, setDbReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("id, rating, comment, created_at, user_id")
      .eq("experience_slug", experienceId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load reviews", error);
      setDbReviews([]);
      setLoading(false);
      return;
    }

    const rows = data ?? [];
    // Fetch reviewer display names via the public profile function
    const profiles = await Promise.all(
      rows.map((r) =>
        supabase.rpc("get_public_profile", { profile_user_id: r.user_id })
      )
    );

    const reviews: Review[] = rows.map((r, i) => {
      const p = profiles[i].data?.[0];
      return {
        id: r.id,
        name: p?.full_name?.trim() || "Traveler",
        date: formatDate(r.created_at),
        rating: r.rating,
        comment: r.comment ?? "",
      };
    });
    setDbReviews(reviews);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experienceId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (newRating < 1 || newRating > 5) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }
    const trimmed = comment.trim();
    if (!trimmed) {
      toast({ title: "Please write a short review", variant: "destructive" });
      return;
    }
    if (trimmed.length > MAX_COMMENT) {
      toast({ title: `Review must be under ${MAX_COMMENT} characters`, variant: "destructive" });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      experience_slug: experienceId,
      rating: newRating,
      comment: trimmed,
    });
    setSubmitting(false);

    if (error) {
      const isDup = error.code === "23505";
      toast({
        title: isDup ? "You've already reviewed this experience" : "Could not submit review",
        description: isDup ? "You can edit your review by deleting the old one." : error.message,
        variant: "destructive",
      });
      return;
    }

    setNewRating(0);
    setComment("");
    toast({ title: "Review submitted", description: "Thanks for sharing your experience!" });
    loadReviews();
  };

  const allReviews = [...dbReviews, ...SAMPLE_REVIEWS];
  const totalCount = reviewCount + dbReviews.length;

  return (
    <section aria-label="Reviews" className="border-t border-border pt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-xl flex items-center gap-2">
          <Star className="w-5 h-5 text-secondary fill-secondary" />
          {rating} · {totalCount} reviews
        </h3>
      </div>

      {/* Submission form */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-8">
        <h4 className="font-display font-semibold text-base mb-3">Write a review</h4>
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground block mb-2">Your rating</label>
              <div
                className="flex items-center gap-1"
                onMouseLeave={() => setHoverRating(0)}
                role="radiogroup"
                aria-label="Rating"
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = (hoverRating || newRating) >= n;
                  return (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={newRating === n}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      onMouseEnter={() => setHoverRating(n)}
                      onClick={() => setNewRating(n)}
                      className="p-1 rounded-md transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Star
                        className={`w-6 h-6 ${active ? "text-secondary fill-secondary" : "text-muted-foreground"}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label htmlFor="review-comment" className="text-xs text-muted-foreground block mb-2">
                Your review
              </label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, MAX_COMMENT))}
                placeholder="Share what made this experience special..."
                rows={4}
                maxLength={MAX_COMMENT}
              />
              <p className="text-xs text-muted-foreground mt-1 text-right">
                {comment.length}/{MAX_COMMENT}
              </p>
            </div>

            <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
              {submitting ? "Submitting..." : "Submit review"}
            </Button>
          </form>
        ) : (
          <p className="text-sm text-muted-foreground">
            <Link to="/auth" className="text-primary underline underline-offset-2">
              Sign in
            </Link>{" "}
            to share your rating and review for this experience.
          </p>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading reviews...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {allReviews.map((review, i) => (
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
                  {review.name.charAt(0).toUpperCase()}
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
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {review.comment}
              </p>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;
