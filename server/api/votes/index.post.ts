import type { User } from '@/generated/prisma/client';
import { createVoteSchema } from '~~/shared/utils/validations/schemas/vote';

export default defineEventHandler(async (event) => {
  const { targetId, targetType, type } = await validateRequestBody(
    event,
    createVoteSchema,
  );
  const user: User = event.context.user;

  return {
    targetId,
    targetType,
    type,
    user,
  };
});
