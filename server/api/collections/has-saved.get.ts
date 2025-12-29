import { prisma } from '~~/lib/prisma';
import { hasSavedSchema } from '~~/shared/utils/validations/schemas/collection';

export default defineEventHandler(async (event) => {
  const { id: questionId, userId } = await validateQueryParameters(
    event,
    hasSavedSchema,
  );

  const hasSavedQuestion = await prisma.collection.findUnique({
    where: {
      questionId_authorId: {
        questionId,
        authorId: userId,
      },
    },
  });

  return {
    isSaved: !!hasSavedQuestion,
  };
});
