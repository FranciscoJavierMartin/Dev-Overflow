import type { User } from '@/generated/prisma/client';
import { prisma } from '~~/lib/prisma';
import { answerSchema } from '~~/shared/utils/validations/schemas/answer';

export default defineEventHandler(async (event) => {
  const { content, questionId } = await validateRequestBody(
    event,
    answerSchema,
  );
  const user: User = event.context.user;

  const newAnswer = await prisma.$transaction(async (tx) => {
    await tx.question.update({
      where: {
        id: questionId,
      },
      data: {
        answers: {
          increment: 1,
        },
      },
    });

    return await tx.answer.create({
      data: {
        content,
        authorId: user.id,
        questionId,
      },
    });
  });

  return newAnswer;
});
