"use client";

import { loginUser } from "@/actions/auth";
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
import { LockKeyhole, Mail } from "lucide-react";
import { Roboto } from "next/font/google";

import { useForm } from "react-hook-form";

const roboto = Roboto({ subsets: ["latin"], weight: ["700"] });

import * as zod from "zod";

const formSchema = zod.object({
  email: zod
    .string()
    .email({ message: "Por favor, insira um endereço de email válido." }),
  password: zod.string().min(6, "A senha deve possuir no mínimo 6 caracteres."),
});

export function LoginForm() {
  const { toast } = useToast();

  const loginForm = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async () => {
    try {
      await loginUser(loginForm.getValues());
      toast({ title: "Logado com sucesso!", variant: "positive" });
    } catch (e: any) {
      toast({
        title: "Dados incorretos!",
        description: "Verifique seu email e senha!",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(handleLogin)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="E-mail"
                    type="email"
                    {...field}
                    icon={<Mail />}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={loginForm.control}
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

        <a className="font-semibold text-sky-600 w-fit" href="#">
          Esqueci minha senha
        </a>

        <Button type="submit" className={roboto.className + " py-5 h-14 mt-1"}>
          ENTRAR
        </Button>
      </form>
    </Form>
  );
}
