import jwt from "jsonwebtoken";

import { IContext } from "../../types";
import { IEditStaffArgs } from "./types";

export const editStaffMutation = async (
  _: any,
  editStaffInput: IEditStaffArgs,
  ctx: IContext
) => {
  const { fullName, staffId } = editStaffInput;

  const staffToUpdate: Omit<IEditStaffArgs, "staffId"> = {};

  try {
    // Update full name
    if (fullName) {
      staffToUpdate.fullName = fullName;
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

    await ctx.prisma.staff.update({
      where: {
        id: staffId,
      },
      data: staffToUpdate,
    });

    return {
      message: "staff updated successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
