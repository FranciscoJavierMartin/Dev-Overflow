import { prisma } from '~~/lib/prisma';
import { userIdSchema } from '~~/shared/utils/validations/schemas/user';

export default defineEventHandler(async (event) => {
  const { id } = await validateRouterParams(event, userIdSchema);

  const [user, totalAnswers, totalQuestions] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id,
      },
    }),
    prisma.answer.count({
      where: { authorId: id },
    }),
    prisma.question.count({
      where: { authorId: id },
    }),
  ]);

  return {
    user,
    totalAnswers,
    totalQuestions,
  };
});
