import { Client } from "@prisma/client";

export interface ISignupClientArgs extends Client {}

export interface ISigninClientArgs {
  email: string;
  password: string;
  verifyPin?: string | number;
}

export interface IClientBookArgs {
  providerId: number;
  serviceId: number;
  staffId: number;
  bookingDate: string;
  bookingTime: string;
  inHouse: boolean;
  address?: string;
}

export interface IClientCompleteBookArgs {
  bookingId: number;
  complete: boolean;
}
