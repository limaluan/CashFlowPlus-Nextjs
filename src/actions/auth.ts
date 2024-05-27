"use server";

import { ILoginDTO, IRegisterDTO, IUserDTO } from "@/types";
import { cookies } from "next/headers";

export async function registerUser(userData: IRegisterDTO): Promise<IUserDTO> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const apiResponse = await response.json();

  if (!response.ok) {
    throw new Error(apiResponse.message);
  }

  const userResponse: IUserDTO = apiResponse;

  return userResponse;
}

export async function loginUser(userData: ILoginDTO): Promise<String> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const apiResponse = await response.json();

  if (!response.ok) {
    throw new Error(apiResponse.message);
  }

  const { token } = apiResponse;

  cookies().set("token", token, {
    httpOnly: true,
  });

  return "Logado com sucesso!";
}
