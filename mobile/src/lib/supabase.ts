import { ENV } from '../config/env';
import { createClient } from '@supabase/supabase-js';

// Supabase client
export const supabase = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_ANON_KEY
);

// Types
export interface Profile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  avatar_url?: string;
  verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  type: 'job' | 'backload' | 'equipment' | 'directory';
  title: string;
  description?: string;
  route_from?: string;
  route_to?: string;
  truck_type?: string;
  location?: string;
  price?: number;
  contact_phone?: string;
  contact_email?: string;
  status: 'active' | 'closed' | 'expired';
  created_at: string;
  updated_at: string;
}

// Auth functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Posts functions
export const getPosts = async (type?: string) => {
  let query = supabase.from('posts').select('*, profiles(name, company)');
  if (type) {
    query = query.eq('type', type);
  }
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
};

export const getPost = async (id: string) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(name, company, phone, email)')
    .eq('id', id)
    .single();
  return { data, error };
};

export const createPost = async (post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('posts')
    .insert(post)
    .select()
    .single();
  return { data, error };
};

export const updatePost = async (id: string, updates: Partial<Post>) => {
  const { data, error } = await supabase
    .from('posts')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
};

export const deletePost = async (id: string) => {
  const { error } = await supabase.from('posts').delete().eq('id', id);
  return { error };
};

// Profile functions
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  return { data, error };
};