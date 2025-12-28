import { prisma } from '~~/lib/prisma';
import { hasUserVotedSchema } from '~~/shared/utils/validations/schemas/vote';
import type { User } from '@/generated/prisma/client';

export default defineEventHandler(async (event) => {
  const { targetId } = await validateQueryParameters(event, hasUserVotedSchema);
  const user: User = event.context.user;
  const result = {
    hasUpvoted: false,
    hasDownvoted: false,
  };

  const vote = await prisma.vote.findUnique({
    where: {
      targetId_authorId: {
        authorId: user.id,
        targetId,
      },
    },
  });

  if (vote) {
    result.hasDownvoted = vote.type === 'downvote';
    result.hasUpvoted = vote.type === 'upvote';
  }

  return result;
});
