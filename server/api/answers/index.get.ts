import type { AnswerOrderByWithRelationInput } from '@/generated/prisma/models';
import { prisma } from '~~/lib/prisma';
import { paginatedAnswersSchema } from '~~/shared/utils/validations/schemas/answer';

export default defineEventHandler(async (event) => {
  const {
    page: pageParam,
    pageSize: pageSizeParam,
    questionId,
    filter,
    sort,
  } = await validateQueryParameters(event, paginatedAnswersSchema);
  const { skip, take } = calculatePageData({
    pageParam,
    pageSizeParam,
  });
  // let filterQuery: QuestionWhereInput = {};
  const orderBy: AnswerOrderByWithRelationInput = {};

  switch (sort) {
    case 'latest':
      orderBy.createdAt = 'desc';
      break;
    case 'oldest':
      orderBy.createdAt = 'asc';
      break;
    case 'popular':
      orderBy.upvotes = 'desc';
      break;
    default:
      orderBy.createdAt = 'desc';
  }

  const answers = await prisma.answer.findMany({
    where: {
      questionId,
    },
    orderBy,
    skip,
    take,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
  const totalAnswers = await prisma.answer.count({
    where: {
      questionId,
    },
  });
  const isNext = totalAnswers > skip + answers.length;

  return {
    answers,
    isNext,
    totalAnswers,
  };
});
