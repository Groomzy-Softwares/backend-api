import { IContext } from "../../types";

export const providerOperatingTimesQuery = async (
  _: any,
  providerOperatingTimesArgs: { providerId: number },
  ctx: IContext
) => {
  const { providerId } = providerOperatingTimesArgs;
  try {
    return ctx.prisma.provider.findFirst({
      where: {
        id: providerId,
      },
      select: {
        dayTimes: {
          include: {
            day: true,
            time: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
