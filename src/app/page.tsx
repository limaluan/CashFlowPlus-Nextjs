"use client";

import Image from "next/image";
import { useState } from "react";
import { LoginForm, RegisterForm } from "./_components";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSwitchLoginMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <main className="bg-zinc-900 w-full h-screen flex items-center justify-center text-zinc-50 px-6 overflow-y-auto">
      <div className="flex justify-between gap-10 xl:gap-24 max-w-5xl flex-col xl:flex-row">
        <section className="flex-1 flex flex-col justify-center">
          <div className="flex items-center">
            <Image
              alt="Logo do CashFlowPlus"
              src="logo-words.svg"
              width={180}
              height={475}
            />
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold leading-[140%]">
            Faça seu {isLogin ? "login" : "cadastro"} na plataforma
          </h1>
        </section>

        <section className="bg-zinc-800 flex-1 xl:max-w-[480px] rounded-md py-8 px-4 xl:p-16">
          {isLogin ? <LoginForm /> : <RegisterForm/>} 

          <p className="mt-[18px] m-auto w-fit">
            {isLogin ? "Não tem uma conta? " : "Já tem uma conta? "}
            <button
              type="button"
              onClick={handleSwitchLoginMode}
              className="font-semibold text-sky-600"
            >
              {isLogin ? "Registre-se" : "Faça Login"}
            </button>
          </p>
        </section>
      </div>
    </main>
  );
}
