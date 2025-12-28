import * as v from 'valibot';
import { VoteTarget, VoteType } from '~~/shared/types/vote';

export const createVoteSchema = v.object({
  targetId: v.pipe(v.string(), v.nonEmpty(), v.cuid2()),
  targetType: v.pipe(v.string(), v.nonEmpty(), v.enum(VoteTarget)),
  type: v.pipe(v.string(), v.nonEmpty(), v.enum(VoteType)),
});
