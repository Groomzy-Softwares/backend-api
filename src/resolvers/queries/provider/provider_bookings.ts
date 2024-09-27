import { IContext } from "../../types";

export const providerBookingsQuery = async (
  _: any,
  providerBookingsArgs: { providerId: number },
  ctx: IContext
) => {
  const { providerId } = providerBookingsArgs;
  try {
    return ctx.prisma.provider.findFirst({
      where: {
        id: providerId,
      },
      select: {
        bookings: {
          include: {
            client: {
              select: {
                id: true,
                fullName: true,
              },
            },
            staff: true,
            service: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
