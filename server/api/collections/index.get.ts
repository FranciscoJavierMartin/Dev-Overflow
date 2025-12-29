import type { User } from '@/generated/prisma/client';
import type {
  CollectionOrderByWithRelationInput,
  CollectionWhereInput,
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
  const user: User = event.context.user;
  const filterQuery: CollectionWhereInput = {
    authorId: user.id,
  };
  const orderBy: CollectionOrderByWithRelationInput = {};

  if (query) {
    filterQuery.question = {
      OR: [
        {
          title: {
            mode: 'insensitive',
            contains: query,
          },
        },
        {
          content: {
            mode: 'insensitive',
            contains: query,
          },
        },
      ],
    };
  }

  switch (sort) {
    case 'newest':
      orderBy.createdAt = 'desc';
      break;
    case 'oldest':
      orderBy.createdAt = 'asc';
      break;
    case 'unanswered':
      // filterQuery.answers = 0;
      orderBy.createdAt = 'desc';
      break;
    case 'popular':
      orderBy.question!.upvotes = 'desc';
      break;
    default:
      orderBy.createdAt = 'desc';
      break;
  }

  const questions = (
    await prisma.collection.findMany({
      where: filterQuery,
      orderBy,
      skip,
      take,
      include: {
        question: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
            tags: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
  ).flatMap((item) => item.question);
  const totalQuestion = await prisma.collection.count({
    where: {
      authorId: user.id,
    },
  });
  const isNext: boolean = totalQuestion > skip + questions.length;

  return {
    questions,
    isNext,
  };
});
