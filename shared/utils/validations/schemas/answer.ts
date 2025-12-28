import * as v from 'valibot';
import {
  answerQuestionSchema,
  paginatedSearchParamsSchema,
} from '~~/shared/utils/validations/schemas/question';

export const answerSchema = v.object({
  ...answerQuestionSchema.entries,
  questionId: v.pipe(v.string(), v.nonEmpty(), v.cuid2()),
});

export const paginatedAnswersSchema = v.object({
  ...paginatedSearchParamsSchema.entries,
  questionId: v.pipe(v.string(), v.nonEmpty(), v.cuid2()),
});
