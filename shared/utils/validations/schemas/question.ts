import * as v from 'valibot';

export const questionIdSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty(), v.cuid2()),
});

export const askQuestionSchema = v.object({
  title: v.pipe(
    v.string(),
    v.nonEmpty('Title is required'),
    v.minLength(5, 'Title must be at least 5 character long'),
    v.maxLength(100, 'Title cannot exceed 100 characters'),
  ),
  content: v.pipe(v.string(), v.nonEmpty('Content is required')),
  tags: v.pipe(
    v.array(
      v.pipe(
        v.string(),
        v.nonEmpty('Tag is required'),
        v.maxLength(15, 'Tag cannot exceed 15 characters'),
        v.transform((tag) => tag.toLowerCase()),
      ),
    ),
    v.minLength(1, 'At least one tag is required'),
    v.maxLength(3, 'Cannot add more than 3 tags'),
  ),
});

export const editQuestionSchema = askQuestionSchema;

export const answerQuestionSchema = v.object({
  content: v.pipe(
    v.string(),
    v.nonEmpty('Content is required'),
    v.minLength(20, 'Answer has to have more then 20 characters'),
  ),
});

export const paginatedSearchParamsSchema = v.object({
  page: v.optional(
    v.pipe(
      v.union([v.string(), v.number()]),
      v.toNumber(),
      v.number(),
      v.integer(),
      v.minValue(1),
    ),
    1,
  ),
  pageSize: v.optional(
    v.pipe(
      v.union([v.string(), v.number()]),
      v.toNumber(),
      v.number(),
      v.integer(),
      v.minValue(1),
    ),
    10,
  ),
  query: v.optional(v.pipe(v.string())),
  filter: v.optional(v.pipe(v.string())),
  sort: v.optional(v.pipe(v.string())),
});

export type QuestionSchema = v.InferInput<typeof askQuestionSchema>;
export type PaginatedSearchParams = Omit<
  v.InferInput<typeof paginatedSearchParamsSchema>,
  'page' | 'pageSize'
> & { page: number; pageSize: number };
