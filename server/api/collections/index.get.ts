import { paginatedSearchParamsSchema } from '~~/shared/utils/validations/schemas/question';
import type { User } from '@/generated/prisma/client';

export default defineEventHandler(async (event) => {
  const {
    page: pageParam,
    pageSize: pageSizeParam,
    filter,
    query,
    sort,
  } = await validateQueryParameters(event, paginatedSearchParamsSchema);
  const { skip, take } = calculatePageData({
    pageParam,
    pageSizeParam,
  });
  const user: User = event.context.user;
  // let filterQuery: QuestionWhereInput = {};
  // const orderBy: QuestionOrderByWithRelationInput = {};

  return {
    questions: [],
    isNext: true,
  };
});
