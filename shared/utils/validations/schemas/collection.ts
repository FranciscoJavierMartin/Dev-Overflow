import * as v from 'valibot';
import { questionIdSchema } from '~~/shared/utils/validations/schemas/question';

export const hasSavedSchema = v.object({
  ...questionIdSchema.entries,
  userId: v.pipe(v.string(), v.nonEmpty()),
});
