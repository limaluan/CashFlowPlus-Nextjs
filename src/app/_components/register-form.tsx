"use client";

import { registerUser } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail, User } from "lucide-react";
import { Roboto } from "next/font/google";
import { useForm } from "react-hook-form";
import * as zod from "zod";

const roboto = Roboto({ subsets: ["latin"], weight: ["700"] });

const formSchema = zod
  .object({
    name: zod.string(),
    email: zod
      .string()
      .email({ message: "Por favor, insira um endereço de email válido." }),
    password: zod
      .string()
      .min(6, "A senha deve possuir no mínimo 6 caracteres."),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

interface IRegisterFormProps {
  switchLoginMode: () => void;
}

export function RegisterForm({ switchLoginMode }: IRegisterFormProps) {
  const { toast } = useToast();

  const registerForm = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = async () => {
    try {
      await registerUser(registerForm.getValues());
      toast({
        title: "Conta criada com sucesso!",
        variant: "positive",
      });
      switchLoginMode();
    } catch (error: any) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...registerForm}>
      <form
        onSubmit={registerForm.handleSubmit(handleRegister)}
        className="flex flex-col gap-3"
      >
        <FormField
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder="Nome" {...field} icon={<User />} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input placeholder="E-mail" {...field} icon={<Mail />} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Senha"
                    type="password"
                    {...field}
                    icon={<LockKeyhole />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="confirmPassword"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Confirme sua senha"
                    type="password"
                    {...field}
                    icon={<LockKeyhole />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="submit" className={roboto.className + " py-5 h-14 mt-1"}>
          CADASTRAR
        </Button>
      </form>
    </Form>
  );
}
