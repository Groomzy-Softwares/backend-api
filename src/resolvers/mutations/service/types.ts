import { Service, Category } from "@prisma/client";

export interface IAddServiceArgs extends Service, Category {}

export interface IEditServiceArgs {
  serviceId: number;
  category?: string;
  title?: string;
  description?: string;
  price?: number;
  duration?: number;
  durationUnit?: string;
  inHouse?: boolean;
}

export interface IDeleteServiceArgs {
  serviceId: number;
  category: string;
}
