import jwt from "jsonwebtoken";

import { IClientCompleteBookArgs } from "./types";

import { IContext } from "../../types";

export const clientBookCompleteMutation = async (
  _: any,
  completeBookInput: IClientCompleteBookArgs,
  ctx: IContext
) => {
  const { bookingId, complete } = completeBookInput;

  try {
    // Booking id is required
    if (!bookingId) {
      throw new Error("Booking id is required.");
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

    if (!complete) {
      throw Error(
        "Eisther Something went wrong while trying to complete the booking or the booking was cancelled."
      );
    }

    await ctx.prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "Active",
      },
    });
    return {
      message: "Booking completed successfully.",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
