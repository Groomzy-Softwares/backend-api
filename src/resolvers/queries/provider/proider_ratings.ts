import { IContext } from "../../types";

export const providerRatingsQuery = async (
  _: any,
  providerRatingsArgs: { providerId: number },
  ctx: IContext
) => {
  const { providerId } = providerRatingsArgs;
  try {
    return ctx.prisma.provider.findFirst({
      where: {
        id: providerId,
      },
      select: {
        bookings: {
          select: {
            rating: true,
            client: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
