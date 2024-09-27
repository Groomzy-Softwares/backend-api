import { BusinessDay } from "@prisma/client";
import jwt from "jsonwebtoken";

import { IContext } from "../../types";
import { IAddOperatingTimeArgs } from "./types";

export const addOperatingTimeMutation = async (
  _: any,
  addOperatingTimeInput: IAddOperatingTimeArgs,
  ctx: IContext
) => {
  const { day, startTime, endTime } = addOperatingTimeInput;

  try {
    // Day is required
    if (!day) {
      throw new Error("Day is required.");
    }

    // Start time is required
    if (!startTime) {
      throw new Error("Start time is required.");
    }

    // End time is required
    if (!endTime) {
      throw new Error("End time is required.");
    }

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

      const _day = await ctx.prisma.day.findUnique({
        where: {
          day: day as BusinessDay,
        },
      });

      const businessTimeExist = await ctx.prisma.dayTime.findUnique({
        where: {
          dayId_providerId: {
            dayId: _day.id,
            providerId,
          },
        },
      });

      if (businessTimeExist) {
        throw new Error(`Business day ${day} already exist`);
      }

      await ctx.prisma.dayTime.create({
        data: {
          day: {
            connect: {
              day: day as BusinessDay,
            },
          },
          time: {
            create: {
              startTime,
              endTime,
            },
          },
          provider: {
            connect: {
              id: providerId,
            },
          },
        },
      });

      return {
        message: "Day time added successfully",
      };
    } catch (error) {
      throw Error(error.message);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
