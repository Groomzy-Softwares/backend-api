import { Staff } from "@prisma/client";

export interface IAddStaffArgs extends Staff {}

export interface IDeleteStaffArgs {
  staffId: number;
}

export interface IEditStaffArgs {
  staffId: number;
  fullName?: string;
}
