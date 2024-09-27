import { Provider } from "@prisma/client";

export interface ISignupProviderArgs extends Provider {}

export interface ISigninProviderArgs {
  email: string;
  password: string;
  verifyPin?: string | number;
}
