import { paginatedAnswersSchema } from '~~/shared/utils/validations/schemas/answer';

export default defineEventHandler(async (event) => {
  const {
    page: pageParam,
    pageSize: pageSizeParam,
    questionId,
    filter,
  } = await validateQueryParameters(event, paginatedAnswersSchema);

  // let filterQuery: QuestionWhereInput = {};
  // const orderBy: QuestionOrderByWithRelationInput = {};

  const { page, pageSize, skip, take } = calculatePageData({
    pageParam,
    pageSizeParam,
  });

  return {
    questionId,
    page,
    pageSize,
    skip,
    take,
  };
});
