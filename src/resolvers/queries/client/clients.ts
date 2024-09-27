import { IContext } from "../../types";

export const clientsQuery = async (_: any, __: any, ctx: IContext) => {
  try {
    return ctx.prisma.client.findMany({
      include: {
        address: true,
      },
    });
  } catch (error) {
    throw Error(error.message);
  }
};
