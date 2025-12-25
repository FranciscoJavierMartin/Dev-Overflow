import { prisma } from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') as string;

  const question = await prisma.question.findUnique({
    where: {
      id,
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
