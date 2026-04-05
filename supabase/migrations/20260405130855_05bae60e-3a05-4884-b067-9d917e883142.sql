
-- Remove the broad public SELECT policy
DROP POLICY IF EXISTS "Anyone can view basic profile info" ON public.profiles;

-- Only profile owners can SELECT their own row from the profiles table
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);
