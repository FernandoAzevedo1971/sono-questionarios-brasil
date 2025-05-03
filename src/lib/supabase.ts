
import { createClient } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Usando o cliente Supabase da integração
export const supabase = supabaseClient;

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
