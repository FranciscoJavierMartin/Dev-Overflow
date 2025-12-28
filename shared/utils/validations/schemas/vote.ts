import * as v from 'valibot';
import { VoteType, VoteTarget } from '~/generated/prisma/client';

export const hasUserVotedSchema = v.object({
  targetId: v.pipe(v.string(), v.nonEmpty(), v.cuid2()),
});

export const createVoteSchema = v.object({
  ...hasUserVotedSchema.entries,
  targetType: v.pipe(v.enum(VoteTarget)),
  type: v.pipe(v.enum(VoteType)),
});
