import jwt from "jsonwebtoken";

import { IContext } from "../../types";
import { IDeleteOperatingTimeArgs } from "./types";

export const deleteOperatingTimeMutation = async (
  _: any,
  deleteOperatingTimeInput: IDeleteOperatingTimeArgs,
  ctx: IContext
) => {
  const { dayTimeId } = deleteOperatingTimeInput;

  try {
    try {
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

      await ctx.prisma.dayTime.delete({
        where: {
          id: dayTimeId,
        },
        include: {
          time: true,
        },
      });

      return {
        message: "Day time updated successfully",
      };
    } catch (error) {
      throw Error(error.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
