import jwt from "jsonwebtoken";

import { IClientBookArgs } from "./types";

import { IContext } from "../../types";

export const clientBookMutation = async (
  _: any,
  bookInput: IClientBookArgs,
  ctx: IContext
) => {
  const {
    providerId,
    serviceId,
    staffId,
    bookingDate,
    bookingTime,
    inHouse,
    address,
  } = bookInput;

  try {
    // Provider id is required
    if (!providerId) {
      throw new Error("Provider id is required.");
    }

    // Service id is required
    if (!serviceId) {
      throw new Error("Service id is required.");
    }

    // Staff id is required
    if (!staffId) {
      throw new Error("staff id is required.");
    }

    // Booking date is required
    if (!bookingDate) {
      throw new Error("Booking date is required.");
    }

    // Booking time is required
    if (!bookingTime) {
      throw new Error("Booking time is required.");
    }

    // Address required if in house call.
    if (inHouse) {
      if (!address) {
        throw new Error("In house call requires an address to be provided.");
      }
    }

    // Check if an auth header is set.
    const authorizationHeader =
      ctx.request.headers["x-access-token"] ||
      ctx.request.headers.authorization;

    // TODO: Should we throw an Error instead?

    if (!authorizationHeader) {
      throw new Error("Looks like you are not signed in. Please sign in.");
    }

    // Check if the JWT secret key is defined.
    if (!process.env.GROOMZY_JWT_SECRET) {
      throw Error("Internal server error.");
    }

    // Get the token.
    const token = authorizationHeader.split(" ")[1];
    // Verify the token if it is valid.
    const signedIn = jwt.verify(token, process.env.GROOMZY_JWT_SECRET);

    const { id: clientId, role } = signedIn as { id: number; role: string };

    console.log(bookingDate);
    console.log(bookingTime);

    const bookingDateTime = new Date(`${bookingDate} ${bookingTime}`);

    console.log(bookingDateTime);

    return ctx.prisma.booking.create({
      data: {
        clientId,
        providerId,
        serviceId,
        staffId,
        status: "Pending",
        bookingTime: bookingDateTime,
        inHouse,
      },
    });
  } catch (error) {
    if (error.message.includes("jwt")) {
      throw new Error("To make a booking, please sign in.");
    }
    throw new Error(error.message);
  }
};
