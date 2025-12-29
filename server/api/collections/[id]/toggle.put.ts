import type { User } from '@/generated/prisma/client';
import { prisma } from '~~/lib/prisma';
import { questionIdSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const { id: questionId } = await validateRouterParams(
    event,
    questionIdSchema,
  );
  const user: User = event.context.user;

  const isInCollection = await prisma.collection.findUnique({
    where: {
      questionId_authorId: {
        authorId: user.id,
        questionId,
      },
    },
  });

  if (isInCollection) {
    await prisma.collection.delete({
      where: {
        questionId_authorId: {
          authorId: user.id,
          questionId,
        },
      },
    });
  } else {
    await prisma.collection.create({
      data: {
        authorId: user.id,
        questionId,
      },
    });
  }

  return {
    success: true,
  };
});
