
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<string>("login");
  const [showResetForm, setShowResetForm] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <div className="w-full max-w-md">
        {showResetForm ? (
          <Card>
            <CardHeader>
              <CardTitle>Recuperar senha</CardTitle>
              <CardDescription>
                Digite seu email para receber um link de recuperação de senha
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResetPasswordForm onBackToLogin={() => setShowResetForm(false)} />
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="link"
                onClick={() => setShowResetForm(false)}
              >
                Voltar para o login
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Entre com suas credenciais para acessar o sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LoginForm onForgotPassword={() => setShowResetForm(true)} />
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button
                    variant="link"
                    onClick={() => setShowResetForm(true)}
                  >
                    Esqueci minha senha
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Cadastro</CardTitle>
                  <CardDescription>
                    Crie sua conta para acessar o sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RegisterForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
