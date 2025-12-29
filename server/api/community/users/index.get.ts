import type {
  UserWhereInput,
  UserOrderByWithRelationInput,
} from '@/generated/prisma/models';
import { prisma } from '~~/lib/prisma';
import { paginatedSearchParamsSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const {
    page: pageParam,
    pageSize: pageSizeParam,
    query,
    sort,
  } = await validateQueryParameters(event, paginatedSearchParamsSchema);
  const { skip, take } = calculatePageData({
    pageParam,
    pageSizeParam,
  });
  const filterQuery: UserWhereInput = {};
  const orderBy: UserOrderByWithRelationInput = {};

  if (query) {
    filterQuery.OR = [
      {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        email: {
          contains: query,
          mode: 'insensitive',
        },
      },
    ];
  }

  switch (sort) {
    case 'newest':
      orderBy.createdAt = 'desc';
      break;
    case 'oldest':
      orderBy.createdAt = 'asc';
      break;
    case 'popular':
      // orderBy.upvotes = 'desc';
      break;
    default:
      orderBy.createdAt = 'desc';
      break;
  }

  const users = await prisma.user.findMany({
    where: filterQuery,
    orderBy,
    skip,
    take,
  });
  const totalUsers = await prisma.user.count({
    where: filterQuery,
  });
  const isNext: boolean = totalUsers > skip + users.length;

  return {
    users,
    totalUsers,
    isNext,
  };
});
