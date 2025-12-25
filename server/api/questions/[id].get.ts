import { prisma } from '~~/lib/prisma';
import { questionIdSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const { id } = await validateRouterParams(event, questionIdSchema);

  const question = await prisma.question.findUnique({
    where: {
      id,
    },
    include: {
      tags: true,
    },
  });

  if (!question) {
    throw createError({
      statusCode: 404,
      message: 'Question not found',
    });
  }

  return question;
});
