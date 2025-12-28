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
  });

  return {
    targetId,
    targetType,
    type,
    user,
  };
});
