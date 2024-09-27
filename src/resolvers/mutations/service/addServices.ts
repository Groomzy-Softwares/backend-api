import jwt from "jsonwebtoken";

import { IContext } from "../../types";
import { IAddServiceArgs } from "./types";

export const addServiceMutation = async (
  _: any,
  addServiceInput: IAddServiceArgs,
  ctx: IContext
) => {
  const {
    title,
    category,
    price,
    description,
    duration,
    durationUnit,
    inHouse,
  } = addServiceInput;

  try {
    // Title is required
    if (!title) {
      throw new Error("Title is required.");
    }

    // Category is required
    if (!category) {
      throw new Error("Category is required.");
    }

    // Price is required
    if (!price) {
      throw new Error("Price is required.");
    }

    // Description is required
    if (!description) {
      throw new Error("Description is required.");
    }

    // Duration is required
    if (!duration) {
      throw new Error("Duration is required.");
    }

    // Duration unit is required
    if (!durationUnit) {
      throw new Error("Duration unit is required.");
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

    await ctx.prisma.service.create({
      data: {
        title,
        description,
        duration,
        durationUnit,
        price,
        inHouse,
        serviceProviderCategories: {
          create: {
            category: {
              connect: {
                id: serviceCategory.id,
              },
            },
            provider: {
              connect: {
                id: providerId,
              },
            },
          },
        },
      },
    });

    return {
      message: "Service added successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
