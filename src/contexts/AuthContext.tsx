
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, createProfile } from '@/lib/supabase';

type UserMetadata = {
  name?: string;
  birth_date?: string;
  user_type?: 'profissional de saúde' | 'usuário comum';
  is_admin?: boolean;
}

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userMetadata: UserMetadata | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, metadata: UserMetadata) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setUserMetadata(session.user.user_metadata as UserMetadata);
        } else {
          setUserMetadata(null);
        }
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        setUserMetadata(session.user.user_metadata as UserMetadata);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, metadata: UserMetadata) => {
    // Admin account is special
    const isAdmin = email === 'fazevedopneumosono@gmail.com';
    if (isAdmin) {
      metadata.is_admin = true;
    }

    // First create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: metadata
      }
    });

    if (authError || !authData.user) {
      return { error: authError };
    }
    
    // Then create the profile in the profiles table
    const { error: profileError } = await createProfile({
      id: authData.user.id,
      name: metadata.name || '',
      birth_date: metadata.birth_date || '',
      user_type: metadata.user_type || 'usuário comum',
      is_admin: isAdmin,
    });

    return { error: profileError };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userMetadata,
        loading,
        signIn,
        signUp,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
