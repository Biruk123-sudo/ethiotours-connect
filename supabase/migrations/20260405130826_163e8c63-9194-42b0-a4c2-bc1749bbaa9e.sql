
-- 1. Fix privilege escalation: restrict user_roles INSERT to only 'tourist' role
DROP POLICY IF EXISTS "Users can insert own role" ON public.user_roles;
CREATE POLICY "Users can only insert tourist role"
ON public.user_roles FOR INSERT
TO public
WITH CHECK (auth.uid() = user_id AND role = 'tourist');

-- 2. Fix booking price tampering: add validation trigger
CREATE OR REPLACE FUNCTION public.validate_booking_price()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE exp_price NUMERIC;
BEGIN
  SELECT price INTO exp_price FROM experiences WHERE id = NEW.experience_id;
  IF exp_price IS NULL THEN
    RAISE EXCEPTION 'Experience not found';
  END IF;
  IF NEW.total_price <> exp_price * NEW.guests THEN
    RAISE EXCEPTION 'Invalid total_price: expected %, got %', exp_price * NEW.guests, NEW.total_price;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER check_booking_price
BEFORE INSERT ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.validate_booking_price();

-- 3. Fix profiles phone exposure: replace public SELECT with owner-only for full data
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Allow users to see their own full profile
CREATE POLICY "Users can view own full profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow public to see profiles but phone is still in the row; use a view instead
-- Actually, RLS is row-level not column-level. Create two policies:
-- authenticated users see own profile fully, everyone sees all profiles (public info).
-- To truly hide phone, we need a view. Let's restrict SELECT to authenticated users viewing own profile,
-- and create a safe public view.

CREATE VIEW public.public_profiles AS
SELECT id, user_id, full_name, avatar_url, bio, created_at, updated_at
FROM public.profiles;

-- Grant access to the view
GRANT SELECT ON public.public_profiles TO anon, authenticated;
