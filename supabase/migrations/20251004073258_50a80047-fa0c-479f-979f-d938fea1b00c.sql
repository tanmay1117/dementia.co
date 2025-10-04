-- Add foreign key relationship from assessment_results to profiles
ALTER TABLE public.assessment_results
DROP CONSTRAINT IF EXISTS assessment_results_user_id_fkey;

ALTER TABLE public.assessment_results
ADD CONSTRAINT assessment_results_user_id_fkey
FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;