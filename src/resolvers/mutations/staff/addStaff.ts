import jwt from "jsonwebtoken";

import { IContext } from "../../types";
import { IAddStaffArgs } from "./types";

export const addStaffMutation = async (
  _: any,
  addStaffInput: IAddStaffArgs,
  ctx: IContext
) => {
  const { fullName } = addStaffInput;

  try {
    // Full name is required
    if (!fullName) {
      throw new Error("Full name is required.");
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

    const { id: providerId, role } = signedIn as { id: number; role: string };

    await ctx.prisma.staff.create({
      data: {
        fullName,
        provider: {
          connect: {
            id: providerId,
          },
        },
      },
    });

    return {
      message: "Staff added successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
