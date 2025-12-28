import type {
  QuestionOrderByWithRelationInput,
  QuestionWhereInput,
} from '@/generated/prisma/models';
import { prisma } from '~~/lib/prisma';
import { paginatedSearchParamsSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const {
    page: pageParam,
    pageSize: pageSizeParam,
    filter,
    query,
    sort,
  } = await validateQueryParameters(event, paginatedSearchParamsSchema);

  const { skip, take } = calculatePageData({
    pageParam,
    pageSizeParam,
  });
  let filterQuery: QuestionWhereInput = {};
  const orderBy: QuestionOrderByWithRelationInput = {};

  if (filter === 'recommended') {
    return {
      questions: [],
      isNext: true,
    };
  }

  if (query) {
    filterQuery = {
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
    case 'unanswered':
      filterQuery.answers = 0;
      orderBy.createdAt = 'desc';
      break;
    case 'popular':
      orderBy.upvotes = 'desc';
      break;
    default:
      orderBy.createdAt = 'desc';
      break;
  }

  const questions = await prisma.question.findMany({
    where: filterQuery,
    orderBy,
    skip,
    take,
    include: {
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  const totalQuestions = await prisma.question.count({
    where: filterQuery,
  });

  const isNext: boolean = totalQuestions > skip + questions.length;

  return {
    questions,
    isNext,
  };
});
