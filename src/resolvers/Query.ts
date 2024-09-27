import { IContext } from "./types";
import { clientsQuery } from "./queries/client/clients";
import { providersQuery } from "./queries/provider/providers";
import { servicesQuery } from "./queries/service/services";
import { staffsQuery } from "./queries/staff/staffs";
import { providerRatingsQuery } from "./queries/provider/proider_ratings";
import { providerBookingsQuery } from "./queries/provider/provider_bookings";
import { providerServicesQuery } from "./queries/provider/provider_services";
import { providerStaffsQuery } from "./queries/provider/provider_staffs";
import { providerOperatingTimesQuery } from "./queries/provider/provider_operating_times";
import { clientBookingsQuery } from "./queries/client/client_bookings";
import { IProvidersArgs } from "./queries/provider/types";

export default {
  /**
   * Get all clients
   * @param _
   * @param __
   * @param ctx
   * @returns [Client]
   */
  clients: async (_: any, __: any, ctx: IContext) => clientsQuery(_, __, ctx),

  /**
   * Get all client bookings
   * @param _
   * @param clientId number
   * @param ctx
   * @returns [Client]
   */
  clientBookings: async (
    _: any,
    clientBooking: { clientId: number },
    ctx: IContext
  ) => clientBookingsQuery(_, clientBooking, ctx),

  /**
   * Get all service providers
   * @param _
   * @param providersArgs
   * @param ctx
   * @returns [Privider]
   */
  providers: async (_: any, providersArgs: IProvidersArgs, ctx: IContext) =>
    providersQuery(_, providersArgs, ctx),

  /**
   * Get all provider services
   * @param _
   * @param providerId number
   * @param ctx
   * @returns [Privider]
   */
  providerOperatingTimes: async (
    _: any,
    providerOperatingTime: { providerId: number },
    ctx: IContext
  ) => providerOperatingTimesQuery(_, providerOperatingTime, ctx),

  /**
   * Get all provider services
   * @param _
   * @param providerId number
   * @param ctx
   * @returns [Privider]
   */
  providerServices: async (
    _: any,
    providerService: { providerId: number },
    ctx: IContext
  ) => providerServicesQuery(_, providerService, ctx),

  /**
   * Get all provider bookings
   * @param _
   * @param providerId number
   * @param ctx
   * @returns [Privider]
   */
  providerBookings: async (
    _: any,
    providerBooking: { providerId: number },
    ctx: IContext
  ) => providerBookingsQuery(_, providerBooking, ctx),

  /**
   * Get all provider staffs
   * @param _
   * @param providerId number
   * @param ctx
   * @returns [Privider]
   */
  providerStaffs: async (
    _: any,
    providerStaff: { providerId: number },
    ctx: IContext
  ) => providerStaffsQuery(_, providerStaff, ctx),

  /**
   * Get all provider ratings
   * @param _
   * @param providerId number
   * @param ctx
   * @returns [Privider]
   */
  providerRatings: async (
    _: any,
    providerRating: { providerId: number },
    ctx: IContext
  ) => providerRatingsQuery(_, providerRating, ctx),

  /**
   * Get all services
   * @param _
   * @param __
   * @param ctx
   * @returns [Service]
   */
  services: async (_: any, __: any, ctx: IContext) => servicesQuery(_, __, ctx),

  /**
   * Get all staffs
   * @param _
   * @param __
   * @param ctx
   * @returns [Staff]
   */
  staffs: async (_: any, __: any, ctx: IContext) => staffsQuery(_, __, ctx),

  /**
   * TO DO ADD MORE QUERIES
   */
};
