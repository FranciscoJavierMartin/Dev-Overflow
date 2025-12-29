import type { HTTPMethod } from 'better-auth';
import { auth } from '~~/lib/auth';

const AUTHENTICATED_ENDPOINTS: { path: string; method: HTTPMethod }[] = [
  {
    path: '/api/questions',
    method: 'POST',
  },
  {
    path: '/api/questions',
    method: 'PUT',
  },
  {
    path: '/api/answers',
    method: 'POST',
  },
  {
    path: '/api/votes',
    method: 'POST',
  },
  {
    path: '/api/votes/has-voted',
    method: 'GET',
  },
  {
    path: '/api/collections/',
    method: 'PUT',
  },
  {
    path: '/api/collections',
    method: 'GET',
  },
];

export default defineEventHandler(async (event) => {
  if (
    AUTHENTICATED_ENDPOINTS.some(
      (endpoint) =>
        event.path.startsWith(endpoint.path) &&
        endpoint.method === event.method,
    )
  ) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (!session) {
      throw createError({
        status: 401,
        message: 'Unauthenticated access',
      });
    }

    event.context.user = session.user;
  }
});
