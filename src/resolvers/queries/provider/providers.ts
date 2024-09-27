import { IContext } from "../../types";
import { IProvidersArgs } from "./types";

export const providersQuery = async (
  _: any,
  providersArgs: IProvidersArgs,
  ctx: IContext
) => {
  const { category, search } = providersArgs;
  try {
    if (search && search.length && category && category.length) {
      return ctx.prisma.provider.findMany({
        where: {
          serviceProviderCategories: {
            some: {
              category: {
                category: {
                  contains: category,
                  mode: "insensitive",
                },
              },
              provider: {
                fullName: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        ...providerNormalQuery(),
      });
    } else if (search && search.length) {
      return ctx.prisma.provider.findMany({
        where: {
          fullName: {
            contains: search,
            mode: "insensitive",
          },
        },
        ...providerNormalQuery(),
      });
    } else if (category && category.length) {
      return ctx.prisma.provider.findMany({
        where: {
          serviceProviderCategories: {
            every: {
              category: {
                category: {
                  contains: category,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        ...providerNormalQuery(),
      });
    }

    return ctx.prisma.provider.findMany({
      ...providerNormalQuery(),
    });
  } catch (error) {
    throw Error(error.message);
  }
};

// A normal providers query
const providerNormalQuery = () => ({
  include: {
    address: true,
    dayTimes: {
      include: {
        day: true,
        time: true,
      },
    },
    staffs: true,
    bookings: {
      include: {
        rating: true,
        service: true,
      },
    },
    serviceProviderCategories: {
      select: {
        category: true,
        service: true,
      },
    },
  },
});
