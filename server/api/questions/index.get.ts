import type {
  QuestionOrderByWithRelationInput,
  QuestionWhereInput,
} from '@/generated/prisma/models';
import { prisma } from '~~/lib/prisma';
import { paginatedSearchParamsSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const {
    page: pageParam = 1,
    pageSize: pageSizeParam = 10,
    filter,
    query,
    sort,
  } = await validateQueryParameters(event, paginatedSearchParamsSchema);

  const page = parseInt(pageParam.toString());
  const pageSize = parseInt(pageSizeParam.toString());
  const skip = (page - 1) * pageSize;
  const take = pageSize;
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
          name: true,
        },
      },
      author: {
        select: {
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
