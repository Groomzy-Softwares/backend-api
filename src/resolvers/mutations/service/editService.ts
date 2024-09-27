import { Category } from "@prisma/client";
import jwt from "jsonwebtoken";

import { IContext } from "../../types";
import { IEditServiceArgs } from "./types";

export const editServiceMutation = async (
  _: any,
  editServiceInput: IEditServiceArgs,
  ctx: IContext
) => {
  const {
    serviceId,
    title,
    category,
    price,
    description,
    duration,
    durationUnit,
    inHouse,
  } = editServiceInput;

  const serviceToUpdate: Omit<IEditServiceArgs, "serviceId"> = {};

  try {
    // Update title
    if (title) {
      serviceToUpdate.title = title;
    }

    // Update category
    let serviceCategory: Category;
    if (category) {
      serviceCategory = await ctx.prisma.category.findFirst({
        where: {
          category: category,
        },
      });
    }

    // Update price
    if (price) {
      serviceToUpdate.price = price;
    }

    // Update description
    if (description) {
      serviceToUpdate.description = description;
    }

    // Update duration
    if (duration) {
      serviceToUpdate.duration = duration;
    }

    // Update duration unit
    if (durationUnit) {
      serviceToUpdate.durationUnit = durationUnit;
    }

    // Update in house call
    if (inHouse) {
      serviceToUpdate.inHouse = inHouse;
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

    if (serviceCategory && serviceCategory.id) {
      await ctx.prisma.service.update({
        where: {
          id: serviceId,
        },
        data: {
          ...serviceToUpdate,
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
    } else {
      await ctx.prisma.service.update({
        where: {
          id: serviceId,
        },
        data: serviceToUpdate,
      });
    }

    return {
      message: "Service updated successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
