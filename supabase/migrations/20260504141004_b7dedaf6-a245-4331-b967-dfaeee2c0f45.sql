ALTER TABLE public.reviews
  ADD COLUMN IF NOT EXISTS experience_slug text;

ALTER TABLE public.reviews
  ALTER COLUMN experience_id DROP NOT NULL;

ALTER TABLE public.reviews
  DROP CONSTRAINT IF EXISTS reviews_experience_ref_check;

ALTER TABLE public.reviews
  ADD CONSTRAINT reviews_experience_ref_check
  CHECK (experience_id IS NOT NULL OR experience_slug IS NOT NULL);

ALTER TABLE public.reviews
  DROP CONSTRAINT IF EXISTS reviews_rating_range_check;

ALTER TABLE public.reviews
  ADD CONSTRAINT reviews_rating_range_check
  CHECK (rating BETWEEN 1 AND 5);

CREATE UNIQUE INDEX IF NOT EXISTS reviews_user_slug_unique
  ON public.reviews (user_id, experience_slug)
  WHERE experience_slug IS NOT NULL;

CREATE INDEX IF NOT EXISTS reviews_experience_slug_idx
  ON public.reviews (experience_slug);