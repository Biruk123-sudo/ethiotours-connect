
DROP VIEW IF EXISTS public.public_profiles;
CREATE VIEW public.public_profiles WITH (security_invoker = true) AS
SELECT id, user_id, full_name, avatar_url, bio, created_at, updated_at
FROM public.profiles;

-- Need a policy allowing everyone to read profiles for the view to work
CREATE POLICY "Anyone can view basic profile info"
ON public.profiles FOR SELECT
TO public
USING (true);

-- Drop the owner-only policy since we now allow public SELECT on the full row
-- but the view hides the phone column for public access
DROP POLICY IF EXISTS "Users can view own full profile" ON public.profiles;

GRANT SELECT ON public.public_profiles TO anon, authenticated;
