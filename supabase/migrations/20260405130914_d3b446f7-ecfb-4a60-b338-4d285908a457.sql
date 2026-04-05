
-- Drop the view since it can't bypass RLS with security_invoker
DROP VIEW IF EXISTS public.public_profiles;

-- Create a security definer function to get public profile info (no phone)
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_user_id uuid)
RETURNS TABLE(id uuid, user_id uuid, full_name text, avatar_url text, bio text, created_at timestamptz, updated_at timestamptz)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT p.id, p.user_id, p.full_name, p.avatar_url, p.bio, p.created_at, p.updated_at
  FROM profiles p
  WHERE p.user_id = profile_user_id;
$$;
