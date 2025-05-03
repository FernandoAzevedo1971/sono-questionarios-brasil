import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, parse, isValid } from "date-fns";
import { Eye, EyeOff, Calendar as CalendarIcon } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Register form schema with a custom validator for the birth_date
const registerSchema = z.object({
  name: z.string().min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  birth_date: z.date({ required_error: "Data de nascimento é obrigatória" }),
  birth_date_input: z.string().optional(),
  user_type: z.enum(["profissional de saúde", "usuário comum"]),
  password: z.string().min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
  confirm_password: z.string().min(6, { message: "Confirmação de senha é obrigatória" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "As senhas não coincidem",
  path: ["confirm_password"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { signUp } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      birth_date: undefined,
      birth_date_input: "",
      user_type: "usuário comum",
      password: "",
      confirm_password: "",
    },
  });

  // Handle manual date input
  const handleDateInput = (value: string) => {
    form.setValue("birth_date_input", value);
    
    // Try to parse the date
    if (value && value.length === 10) {
      try {
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());
        if (isValid(parsedDate) && parsedDate < new Date() && parsedDate > new Date("1900-01-01")) {
          form.setValue("birth_date", parsedDate);
        }
      } catch (error) {
        // Invalid date format, leave the birth_date unchanged
      }
    }
  };

  // Handle register submission
  const onSubmit = async (data: RegisterFormValues) => {
    const { name, email, birth_date, user_type, password } = data;
    const formattedBirthDate = format(birth_date, "yyyy-MM-dd");
    
    const { error } = await signUp(
      email,
      password,
      { 
        name, 
        birth_date: formattedBirthDate, 
        user_type 
      }
    );
    
    if (error) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Conta criada com sucesso",
        description: "Verifique seu email para confirmar o cadastro",
      });
    }
  };

  // Update birth date display value when form value changes
  const birthDateValue = form.watch("birth_date");
  const birthDateInputValue = form.watch("birth_date_input");

  // When calendar date is selected, also update the text input
  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      form.setValue("birth_date", date);
      form.setValue("birth_date_input", format(date, "dd/MM/yyyy"));
    }
    setIsCalendarOpen(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Nascimento</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="DD/MM/AAAA"
                    value={birthDateInputValue}
                    onChange={(e) => handleDateInput(e.target.value)}
                    className="flex-1"
                    maxLength={10}
                  />
                </FormControl>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="px-3"
                      onClick={() => setIsCalendarOpen(true)}
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={birthDateValue}
                      onSelect={handleCalendarSelect}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Usuário</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="profissional de saúde">Profissional de Saúde</SelectItem>
                  <SelectItem value="usuário comum">Usuário Comum</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  className="absolute right-3 top-2.5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme sua Senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Criar Conta</Button>
      </form>
    </Form>
  );
}
