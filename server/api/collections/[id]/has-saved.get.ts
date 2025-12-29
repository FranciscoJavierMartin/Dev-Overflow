import type { User } from '@/generated/prisma/client';
import { prisma } from '~~/lib/prisma';
import { questionIdSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const { id: questionId } = await validateRouterParams(
    event,
    questionIdSchema,
  );
  const user: User = event.context.user;

  const hasSavedQuestion = await prisma.collection.findUnique({
    where: {
      questionId_authorId: {
        questionId,
        authorId: user.id,
      },
    },
  });

  return {
    isSaved: !!hasSavedQuestion,
  };
});
