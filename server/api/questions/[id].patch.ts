import { questionIdSchema } from '~~/shared/utils/validations/schemas/question';
import { prisma } from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const { id } = await validateRouterParams(event, questionIdSchema);

  const question = await prisma.question.update({
    where: {
      id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return {
    question,
  };
});
