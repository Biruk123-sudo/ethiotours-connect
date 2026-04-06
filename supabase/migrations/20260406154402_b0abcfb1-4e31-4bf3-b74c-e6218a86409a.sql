
-- 1. Fix guide_profiles INSERT: require guide role
DROP POLICY IF EXISTS "Guides can insert own profile" ON public.guide_profiles;
CREATE POLICY "Guides can insert own profile"
ON public.guide_profiles FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND public.has_role(auth.uid(), 'guide')
);

-- Also fix guide_profiles UPDATE to require guide role
DROP POLICY IF EXISTS "Guides can update own profile" ON public.guide_profiles;
CREATE POLICY "Guides can update own profile"
ON public.guide_profiles FOR UPDATE
TO authenticated
USING (
  auth.uid() = user_id
  AND public.has_role(auth.uid(), 'guide')
);

-- 2. Fix user_roles INSERT: restrict to authenticated only
DROP POLICY IF EXISTS "Users can only insert tourist role" ON public.user_roles;
CREATE POLICY "Users can only insert tourist role"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND role = 'tourist');
