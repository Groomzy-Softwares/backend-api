import jwt from "jsonwebtoken";

import { IContext } from "../../types";

export const staffsQuery = async (_: any, __: any, ctx: IContext) => {
  try {
    // Check if an auth header is set.
    const authorizationHeader =
      ctx.request.headers["x-access-token"] ||
      ctx.request.headers.authorization;

    // TODO: Should we throw an Error instead?
    if (!authorizationHeader) {
      return null;
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

    return ctx.prisma.staff.findMany({
      where: {
        providerId,
      },
    });
  } catch (error) {
    throw Error(error.message);
  }
};
