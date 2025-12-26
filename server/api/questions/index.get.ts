import { prisma } from '~~/lib/prisma';
import { paginatedSearchParamsSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const { page, pageSize, filter, query, sort } = await validateQueryParameters(
    event,
    paginatedSearchParamsSchema,
  );

  console.log(typeof page);

  return {
    page,
    pageSize,
    filter,
    query,
    sort,
  };
});
