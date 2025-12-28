import type {
  QuestionWhereInput,
  QuestionOrderByWithRelationInput,
} from '@/generated/prisma/models';
import { prisma } from '~~/lib/prisma';
import { tagIdSchema } from '~~/shared/utils/validations/schemas/tag';
import { paginatedSearchParamsSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const { id } = await validateRouterParams(event, tagIdSchema);
  const {
    page: pageParam,
    pageSize: pageSizeParam,
    query,
  } = await validateQueryParameters(event, paginatedSearchParamsSchema);
  const { skip, take } = calculatePageData({
    pageParam,
    pageSizeParam,
  });
  let filterQuery: QuestionWhereInput = {};
  const orderBy: QuestionOrderByWithRelationInput = {};

  const tag = await prisma.tag.findUnique({
    where: {
      id,
    },
  });

  if (!tag) {
    throw createError({
      statusCode: 404,
      message: 'Tag not found',
    });
  }

  if (query) {
    filterQuery = {
      title: {
        contains: query,
        mode: 'insensitive',
      },
    };
  }

  const questions = await prisma.question.findMany({
    where: filterQuery,
    orderBy,
    skip,
    take,
    select: {
      id: true,
      title: true,
      views: true,
      answers: true,
      upvotes: true,
      downvotes: true,
      createdAt: true,
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
  });

  const totalQuestions = await prisma.question.count({
    where: filterQuery,
  });

  const isNext: boolean = totalQuestions > skip + questions.length;

  return {
    tag,
    questions,
    isNext,
  };
});
