import { IContext } from "./types";
import { signupClientMutation } from "./mutations/client/signup";
import {
  IClientBookArgs,
  IClientCompleteBookArgs,
  ISigninClientArgs,
  ISignupClientArgs,
} from "../resolvers/mutations/client/types";
import { ISignupProviderArgs } from "./mutations/provider/types";
import { signupProviderMutation } from "./mutations/provider/signup";
import { signinClientMutation } from "./mutations/client/signin";
import { ISigninProviderArgs } from "./mutations/provider/types";
import { signinProviderMutation } from "./mutations/provider/signin";
import { addServiceMutation } from "./mutations/service/addServices";
import { IAddServiceArgs } from "./mutations/service/types";
import { addStaffMutation } from "./mutations/staff/addStaff";
import { IAddStaffArgs } from "./mutations/staff/types";
import { IDeleteServiceArgs } from "./mutations/service/types";
import { deleteServiceMutation } from "./mutations/service/deleteService";
import { IDeleteStaffArgs } from "./mutations/staff/types";
import { deleteStaffMutation } from "./mutations/staff/deleteStaff";
import { editServiceMutation } from "./mutations/service/editService";
import { IEditServiceArgs } from "./mutations/service/types";
import { IEditStaffArgs } from "./mutations/staff/types";
import { editStaffMutation } from "./mutations/staff/editStaff";
import { addOperatingTimeMutation } from "./mutations/operating_time/add_operating_time";
import {
  IAddOperatingTimeArgs,
  IDeleteOperatingTimeArgs,
  IEditOperatingTimeArgs,
} from "./mutations/operating_time/types";
import { editOperatingTimeMutation } from "./mutations/operating_time/edit_operating_time";
import { deleteOperatingTimeMutation } from "./mutations/operating_time/delete_operating_time";
import { clientBookMutation } from "./mutations/client/book";
import { clientBookCompleteMutation } from "./mutations/client/book_complete";

export default {
  /**
   * Client sign up mutation
   */
  signupClient: async (_: any, client: ISignupClientArgs, ctx: IContext) => {
    return signupClientMutation(_, client, ctx);
  },
  /**
   * Client sign in mutation
   */
  signinClient: async (_: any, client: ISigninClientArgs, ctx: IContext) => {
    return signinClientMutation(_, client, ctx);
  },

  /**
   * Provider sign up mutation
   */
  signupProvider: async (
    _: any,
    provider: ISignupProviderArgs,
    ctx: IContext
  ) => {
    return signupProviderMutation(_, provider, ctx);
  },

  /**
   * Provider sign up mutation
   */
  signinProvider: async (
    _: any,
    provider: ISigninProviderArgs,
    ctx: IContext
  ) => {
    return signinProviderMutation(_, provider, ctx);
  },

  /**
   * Add service mutation
   */
  addService: async (_: any, service: IAddServiceArgs, ctx: IContext) => {
    return addServiceMutation(_, service, ctx);
  },

  /**
   * Delete service mutation
   */
  deleteService: async (_: any, service: IDeleteServiceArgs, ctx: IContext) => {
    return deleteServiceMutation(_, service, ctx);
  },

  /**
   * Edit service mutation
   */
  editService: async (_: any, service: IEditServiceArgs, ctx: IContext) => {
    return editServiceMutation(_, service, ctx);
  },

  /**
   * Add staff mutation
   */
  addStaff: async (_: any, staff: IAddStaffArgs, ctx: IContext) => {
    return addStaffMutation(_, staff, ctx);
  },

  /**
   * Delete staff mutation
   */
  deleteStaff: async (_: any, staff: IDeleteStaffArgs, ctx: IContext) => {
    return deleteStaffMutation(_, staff, ctx);
  },

  /**
   * Edit staff mutation
   */
  editStaff: async (_: any, staff: IEditStaffArgs, ctx: IContext) => {
    return editStaffMutation(_, staff, ctx);
  },

  /**
   * Add operating time mutation
   */
  addOperatingTime: async (
    _: any,
    operatingTime: IAddOperatingTimeArgs,
    ctx: IContext
  ) => {
    return addOperatingTimeMutation(_, operatingTime, ctx);
  },

  /**
   * Edit operating time mutation
   */
  editOperatingTime: async (
    _: any,
    operatingTime: IEditOperatingTimeArgs,
    ctx: IContext
  ) => {
    return editOperatingTimeMutation(_, operatingTime, ctx);
  },

  /**
   * Delete operating time mutation
   */
  deleteOperatingTime: async (
    _: any,
    operatingTime: IDeleteOperatingTimeArgs,
    ctx: IContext
  ) => {
    return deleteOperatingTimeMutation(_, operatingTime, ctx);
  },

  /**
   * Client book mutation
   */
  clientBook: async (_: any, clientBook: IClientBookArgs, ctx: IContext) => {
    return clientBookMutation(_, clientBook, ctx);
  },

  /**
   * Client book complete mutation
   */
  clientBookComplete: async (
    _: any,
    clientBookComplete: IClientCompleteBookArgs,
    ctx: IContext
  ) => {
    return clientBookCompleteMutation(_, clientBookComplete, ctx);
  },
};
