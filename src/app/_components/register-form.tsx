"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole, Mail, User } from "lucide-react";
import { Roboto } from "next/font/google";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

const roboto = Roboto({ subsets: ["latin"], weight: ["700"] });

const formSchema = zod
  .object({
    name: zod.string(),
    email: zod
      .string()
      .email({ message: "Por favor, insira um endereço de email válido." }),
    password: zod.string(),
    confirmPassword: zod.string(),
  })
 ;

export function RegisterForm() {
  const registerForm = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    console.log(registerForm.getValues().email);
  };

  return (
    <Form {...registerForm}>
      <form onSubmit={(e) => handleRegister(e)} className="flex flex-col gap-3">
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
