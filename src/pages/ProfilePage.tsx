import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getProfile, updateProfile } from "@/lib/supabase";
import { Profile } from "@/lib/supabase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, User, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { format, parse } from "date-fns";

const ProfilePage = () => {
  const { user, userMetadata } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    birth_date: "",
    user_type: "usuário comum" as "profissional de saúde" | "usuário comum"
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        try {
          setLoading(true);
          const { data, error } = await getProfile(user.id);
          if (error) {
            console.error("Error loading profile:", error);
            toast.error("Erro ao carregar perfil");
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
            
            // Initialize form data
            setFormData({
              name: typedProfile.name,
              birth_date: typedProfile.birth_date,
              user_type: typedProfile.user_type
            });
          } else {
            // Se o perfil não foi encontrado, podemos tentar criá-lo com os dados do userMetadata
            if (userMetadata) {
              const newProfile = {
                id: user.id,
                name: userMetadata.name || '',
                birth_date: userMetadata.birth_date || '',
                user_type: (userMetadata.user_type as "profissional de saúde" | "usuário comum") || "usuário comum",
                is_admin: !!userMetadata.is_admin
              };
              
              const { data: createdProfile } = await updateProfile(user.id, newProfile);
              if (createdProfile) {
                setProfile(createdProfile[0] as Profile);
                setFormData({
                  name: createdProfile[0].name,
                  birth_date: createdProfile[0].birth_date,
                  user_type: createdProfile[0].user_type
                });
              }
            }
          }
        } catch (err) {
          console.error("Exception loading profile:", err);
          toast.error("Erro ao carregar perfil");
        } finally {
          setLoading(false);
        }
      }
    };

    loadProfile();
  }, [user, userMetadata]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: "profissional de saúde" | "usuário comum") => {
    setFormData(prev => ({
      ...prev,
      user_type: value
    }));
  };

  const handleSave = async () => {
    if (!user || !profile) return;
    
    try {
      setSaving(true);
      
      // Garantir que temos todos os dados necessários
      const updateData = {
        name: formData.name,
        birth_date: formData.birth_date,
        user_type: formData.user_type
      };
      
      console.log("Enviando dados para atualizar:", updateData);
      
      const { error } = await updateProfile(user.id, updateData);
      
      if (error) {
        console.error("Error updating profile:", error);
        toast.error("Erro ao atualizar perfil");
      } else {
        // Update local profile state with new data
        setProfile({
          ...profile,
          name: formData.name,
          birth_date: formData.birth_date,
          user_type: formData.user_type
        });
        
        toast.success("Perfil atualizado com sucesso");
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Exception updating profile:", err);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setSaving(false);
    }
  };

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
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="birth_date">Data de Nascimento</Label>
                        <Input 
                          id="birth_date" 
                          name="birth_date" 
                          type="date" 
                          value={formData.birth_date} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          value={user?.email || ''} 
                          disabled 
                          className="bg-gray-100"
                        />
                        <p className="text-xs text-muted-foreground">
                          O email não pode ser alterado
                        </p>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="user_type">Tipo de Usuário</Label>
                        <Select 
                          value={formData.user_type} 
                          onValueChange={(value) => handleSelectChange(value as "profissional de saúde" | "usuário comum")}
                        >
                          <SelectTrigger id="user_type">
                            <SelectValue placeholder="Selecione o tipo de usuário" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="usuário comum">Usuário Comum</SelectItem>
                            <SelectItem value="profissional de saúde">Profissional de Saúde</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
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
                  )}
                </CardContent>
                
                <CardFooter className="flex justify-end gap-2">
                  {isEditing ? (
                    <>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                        disabled={saving}
                      >
                        Cancelar
                      </Button>
                      <Button 
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? 'Salvando...' : 'Salvar'} 
                        {!saving && <Save className="ml-2 h-4 w-4" />}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => navigate('/')}>Voltar</Button>
                      <Button onClick={() => setIsEditing(true)}>Editar</Button>
                    </>
                  )}
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
