
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
        console.log("Auth state changed:", _event, session?.user?.id);
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
      console.log("Initial session check:", session?.user?.id);
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
    console.log("Tentando login com email:", email);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error("Erro no login:", error.message);
    } else {
      console.log("Login bem-sucedido:", data.user?.id);
    }
    
    return { error };
  };

  const signUp = async (email: string, password: string, metadata: UserMetadata) => {
    console.log("Iniciando cadastro para email:", email);
    
    try {
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
        console.error("Erro ao criar usuário auth:", authError?.message);
        return { error: authError };
      }
      
      console.log("Usuário auth criado com sucesso:", authData.user.id);
      
      // Separamos a criação do perfil do usuário
      // Vamos criar o perfil depois de uma pequena pausa para evitar condições de corrida
      setTimeout(async () => {
        try {
          const profileData = {
            id: authData.user.id,
            name: metadata.name || '',
            birth_date: metadata.birth_date || '',
            user_type: metadata.user_type || 'usuário comum',
            is_admin: isAdmin,
          };
          
          console.log("Tentando criar perfil:", profileData);
          
          const { error: profileError } = await createProfile(profileData);
          
          if (profileError) {
            console.error("Erro ao criar perfil do usuário:", profileError);
          } else {
            console.log("Perfil criado com sucesso!");
          }
        } catch (e) {
          console.error("Exceção ao criar perfil:", e);
        }
      }, 500);

      return { error: null };
    } catch (e) {
      console.error("Exceção no processo de cadastro:", e);
      return { error: e };
    }
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
