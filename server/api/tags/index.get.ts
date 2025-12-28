import type {
  TagWhereInput,
  TagOrderByWithRelationInput,
} from '@/generated/prisma/models';
import { prisma } from '~~/lib/prisma';
import { paginatedSearchParamsSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const {
    page: pageParam = 1,
    pageSize: pageSizeParam = 10,
    query,
    sort,
  } = await validateQueryParameters(event, paginatedSearchParamsSchema);
  const { skip, take } = calculatePageData({
    pageParam,
    pageSizeParam,
  });
  let filterQuery: TagWhereInput = {};
  const orderBy: TagOrderByWithRelationInput = {};

  if (query) {
    filterQuery = {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    };
  }

  switch (sort) {
    case 'popular':
      orderBy.questions = 'desc';
      break;
    case 'recent':
      orderBy.createdAt = 'desc';
      break;
    case 'oldest':
      orderBy.createdAt = 'asc';
      break;
    case 'name':
      orderBy.name = 'asc';
      break;
    default:
      orderBy.questions = 'desc';
      break;
  }

  const tags = await prisma.tag.findMany({
    where: filterQuery,
    orderBy,
    skip,
    take,
  });

  const totalTags = await prisma.tag.count({
    where: filterQuery,
  });

  const isNext: boolean = totalTags > skip + tags.length;

  return {
    tags,
    isNext,
  };
});
