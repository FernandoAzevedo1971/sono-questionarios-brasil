
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getProfile } from "@/lib/supabase";
import { Profile } from "@/lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProfilePage = () => {
  const { user, userMetadata } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        try {
          setLoading(true);
          const { data, error } = await getProfile(user.id);
          if (error) {
            console.error("Error loading profile:", error);
          } else if (data) {
            // Ensure user_type is one of the expected values
            const validUserType = data.user_type === "profissional de saúde" || 
                                 data.user_type === "usuário comum" 
                                 ? data.user_type 
                                 : "usuário comum";
            
            // Create a properly typed profile object
            const typedProfile: Profile = {
              id: data.id,
              name: data.name,
              birth_date: data.birth_date,
              is_admin: data.is_admin,
              user_type: validUserType as "profissional de saúde" | "usuário comum",
              created_at: data.created_at,
              updated_at: data.updated_at
            };
            
            setProfile(typedProfile);
          }
        } catch (err) {
          console.error("Exception loading profile:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProfile();
  }, [user]);

  if (!user || loading) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-lg">Carregando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  const formattedBirthDate = profile?.birth_date ? new Date(profile.birth_date).toLocaleDateString('pt-BR') : 'Não informado';
  const userTypeLabel = profile?.user_type === 'profissional de saúde' 
    ? 'Profissional de Saúde'
    : 'Usuário Comum';

  const getNameInitials = () => {
    if (profile?.name) {
      const nameParts = profile.name.trim().split(' ');
      if (nameParts.length === 1) return nameParts[0].substring(0, 2).toUpperCase();
      return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Meu Perfil</h1>
        
        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-xl">{getNameInitials()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center sm:text-left">
                    <CardTitle className="text-2xl">{profile?.name || 'Nome não informado'}</CardTitle>
                    <CardDescription className="text-base">
                      {userTypeLabel}
                      {profile?.is_admin && <span className="ml-2 text-primary">(Administrador)</span>}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Email:</span>
                      </div>
                      <span>{user?.email}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Data de Nascimento:</span>
                      </div>
                      <span>{formattedBirthDate}</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">Tipo de Usuário:</span>
                      </div>
                      <span>{userTypeLabel}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end">
                  <Button variant="outline" onClick={() => navigate('/')}>Voltar</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações da Conta</CardTitle>
                  <CardDescription>
                    Gerencie suas preferências e configurações de conta.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">
                    As opções de configuração estarão disponíveis em breve.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button disabled>Salvar alterações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
