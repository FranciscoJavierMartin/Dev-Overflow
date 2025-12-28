import type { User } from '@/generated/prisma/client';
import { prisma } from '~~/lib/prisma';
import { createVoteSchema } from '~~/shared/utils/validations/schemas/vote';

export default defineEventHandler(async (event) => {
  const { targetId, targetType, type } = await validateRequestBody(
    event,
    createVoteSchema,
  );
  const user: User = event.context.user;

  await prisma.$transaction(async (tx) => {
    const isUpdate = !!(await tx.vote.findUnique({
      where: {
        targetId_authorId: {
          targetId,
          authorId: user.id,
        },
      },
    }));

    await tx.vote.upsert({
      where: {
        targetId_authorId: {
          targetId,
          authorId: user.id,
        },
      },
      create: {
        authorId: user.id,
        targetId,
        target: targetType,
        type,
      },
      update: {
        type,
      },
    });

    if (targetType === 'answer') {
      await tx.answer.update({
        where: {
          id: targetId,
        },
        data: {
          downvotes: {
            increment: type === 'downvote' ? 1 : isUpdate ? -1 : 0,
          },
          upvotes: {
            increment: type === 'upvote' ? 1 : isUpdate ? -1 : 0,
          },
        },
      });
    } else {
      await tx.question.update({
        where: {
          id: targetId,
        },
        data: {
          downvotes: {
            increment: type === 'downvote' ? 1 : isUpdate ? -1 : 0,
          },
          upvotes: {
            increment: type === 'upvote' ? 1 : isUpdate ? -1 : 0,
          },
        },
      });
    }
  });

  return {
    targetId,
    targetType,
    type,
    user,
  };
});
