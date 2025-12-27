import * as v from 'valibot';

export const answerSchema = v.object({
  questionId: v.pipe(v.string(), v.nonEmpty(), v.cuid2()),
  content: v.pipe(
    v.string(),
    v.minLength(20, 'Answer has to have more then 20 characters'),
  ),
});
