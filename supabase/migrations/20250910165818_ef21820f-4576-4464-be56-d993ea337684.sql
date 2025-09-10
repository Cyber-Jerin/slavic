-- CRITICAL SECURITY FIX: Enable Row Level Security on exposed tables
-- This prevents public access to sensitive customer data

-- Enable RLS on contact_messages table
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Enable RLS on newsletter_signups table  
ALTER TABLE public.newsletter_signups ENABLE ROW LEVEL SECURITY;

-- Create user roles enum for admin access control
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for role-based access control
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_roles.user_id = is_admin.user_id 
    AND role = 'admin'
  );
$$;

-- RLS Policies for contact_messages (admin-only access)
CREATE POLICY "Only admins can view contact messages"
ON public.contact_messages
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can insert contact messages"
ON public.contact_messages  
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update contact messages"
ON public.contact_messages
FOR UPDATE  
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete contact messages"
ON public.contact_messages
FOR DELETE
TO authenticated  
USING (public.is_admin());

-- RLS Policies for newsletter_signups (admin-only access)
CREATE POLICY "Only admins can view newsletter signups"
ON public.newsletter_signups
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can insert newsletter signups"
ON public.newsletter_signups
FOR INSERT  
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Only admins can update newsletter signups"
ON public.newsletter_signups
FOR UPDATE
TO authenticated
USING (public.is_admin());

CREATE POLICY "Only admins can delete newsletter signups"
ON public.newsletter_signups
FOR DELETE
TO authenticated
USING (public.is_admin());

-- RLS Policies for user_roles (users can only see their own roles, admins can see all)
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Only admins can manage roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Add subject column to contact_messages for better organization
ALTER TABLE public.contact_messages 
ADD COLUMN IF NOT EXISTS subject TEXT;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_signups_created_at ON public.newsletter_signups(created_at DESC);