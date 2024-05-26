"use server";

import { IApiResponse, IRegisterDTO, IUserDTO } from "@/types";

export async function registerUser(
  userData: IRegisterDTO
): Promise<IUserDTO> {
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
  
  const apiResponse: IApiResponse = await response.json();
  
  if (!response.ok) {
    throw new Error(apiResponse.message)
  }
  
  return userData as IUserDTO;
}
