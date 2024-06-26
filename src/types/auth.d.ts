export interface IRegisterDTO {
  name: string;
  password: string;
  email: string;
}

export interface IUserDTO extends Omit<IRegisterDTO, "password"> {}

export interface ILoginDTO extends Omit<IRegisterDTO, "name"> {}
