import jwt from "jsonwebtoken";

import { IContext } from "../../types";
import { IDeleteServiceArgs } from "./types";

export const deleteServiceMutation = async (
  _: any,
  deleteServiceInput: IDeleteServiceArgs,
  ctx: IContext
) => {
  const { serviceId, category } = deleteServiceInput;

  try {
    // Service id is required
    if (!serviceId) {
      throw new Error("Service id is required.");
    }

    // Service category is required
    if (!category) {
      throw new Error("Service category is required.");
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

    const serviceCategory = await ctx.prisma.category.findFirst({
      where: {
        category: category,
      },
    });

    await ctx.prisma.serviceProviderCategory.delete({
      where: {
        categoryId_serviceId_providerId: {
          categoryId: serviceCategory.id,
          serviceId,
          providerId,
        },
      },
      include: {
        service: true,
      },
    });

    return {
      message: "Service deleted successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
