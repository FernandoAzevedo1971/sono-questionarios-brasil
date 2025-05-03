
import { createClient } from '@supabase/supabase-js';

// When using Lovable's Supabase integration, these values are automatically injected
// during the build process, so we can hardcode them here
const supabaseUrl = 'https://xeymgmuljwxeagpqkzhx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleW1nbXVsand4ZWFncHFremh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3Nzc2OTgsImV4cCI6MjAzMTM1MzY5OH0.yDLVQnaTauMsArL7O2WTGjvb1ySzppGN_Z-ET1ZkZJA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  birth_date: string;
  user_type: 'profissional de saúde' | 'usuário comum';
  is_admin: boolean;
  created_at?: string;
  updated_at?: string;
};

export const createProfile = async (profile: Omit<Profile, 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([profile])
    .select()
    .single();

  return { data, error };
};

export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  return { data, error };
};

export const updateProfile = async (userId: string, updates: Partial<Omit<Profile, 'id'>>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  return { data, error };
};
