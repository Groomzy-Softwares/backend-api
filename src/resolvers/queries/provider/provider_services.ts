import { IContext } from "../../types";

export const providerServicesQuery = async (
  _: any,
  providerServicesArgs: { providerId: number },
  ctx: IContext
) => {
  const { providerId } = providerServicesArgs;
  try {
    return ctx.prisma.provider.findFirst({
      where: {
        id: providerId,
      },
      select: {
        serviceProviderCategories: {
          select: {
            service: true,
            category: true,
          },
        },
      },
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
