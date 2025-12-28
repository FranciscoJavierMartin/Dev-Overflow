export function calculatePageData({
  pageParam = 1,
  pageSizeParam = 10,
}: {
  pageParam?: string | number;
  pageSizeParam?: string | number;
}): {
  page: number;
  pageSize: number;
  skip: number;
  take: number;
} {
  const page = parseInt(pageParam.toString());
  const pageSize = parseInt(pageSizeParam.toString());
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return {
    page,
    pageSize,
    skip,
    take,
  };
}
