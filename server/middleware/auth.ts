import type { HTTPMethod } from 'better-auth';
import { auth } from '~~/lib/auth';

const AUTHENTICATED_ENDPOINTS: { path: string; method: HTTPMethod }[] = [
  {
    path: '/api/questions',
    method: 'POST',
  },
];

export default defineEventHandler(async (event) => {
  if (
    AUTHENTICATED_ENDPOINTS.some(
      (endpoint) =>
        endpoint.path === event.path && endpoint.method === event.method,
    )
  ) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (!session) {
      throw createError({
        status: 401,
        message: 'Unauthorized access',
      });
    }

    event.context.user = session.user;
  }
});
