
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Reset password schema
const resetSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});

type ResetFormValues = z.infer<typeof resetSchema>;

export function ResetPasswordForm({ onBackToLogin }: { onBackToLogin: () => void }) {
  const { toast } = useToast();
  const { resetPassword } = useAuth();

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetFormValues) => {
    const { error } = await resetPassword(data.email);
    
    if (error) {
      toast({
        title: "Erro ao solicitar nova senha",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Email enviado",
        description: "Verifique seu email para redefinir sua senha",
      });
      onBackToLogin();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Enviar email de recuperação</Button>
      </form>
    </Form>
  );
}
