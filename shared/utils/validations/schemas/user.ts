import * as v from 'valibot';

export const userIdSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
});
