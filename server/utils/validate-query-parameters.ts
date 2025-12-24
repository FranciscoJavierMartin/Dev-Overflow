import type { H3Event } from 'h3';
import * as v from 'valibot';
import { Errors } from './errors';

export async function validateQueryParameters<T extends v.GenericSchema>(
  event: H3Event,
  schema: T,
): Promise<v.InferInput<T>> {
  const query = getQuery(event);
  const { data, error } = v.safeParse(schema, query);

  if (error) {
    const errors: Record<string, string> = {};

    for (const issue of error.issues) {
      const field = issue.path.join('.');

      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    }

    throw Errors.validation('Invalid query parameters', { error, errors });
  }

  return data;
}
