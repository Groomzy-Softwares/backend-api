import { IContext } from "../../types";

export const clientBookingsQuery = async (
  _: any,
  clientBookingsArgs: { clientId: number },
  ctx: IContext
) => {
  const { clientId } = clientBookingsArgs;
  try {
    return ctx.prisma.client.findFirst({
      where: {
        id: clientId,
      },
      select: {
        bookings: {
          include: {
            provider: {
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
