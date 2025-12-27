import * as v from 'valibot';
import { answerQuestionSchema } from '~~/shared/utils/validations/schemas/question';

export const answerSchema = v.object({
  questionId: v.pipe(v.string(), v.nonEmpty(), v.cuid2()),
  ...answerQuestionSchema.entries,
});
