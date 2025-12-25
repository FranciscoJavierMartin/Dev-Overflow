import type { H3Event } from 'h3';
import * as v from 'valibot';

export async function validateRouterParamsAsync<T extends v.GenericSchema>(
  event: H3Event,
  schema: T,
): Promise<v.InferInput<T>> {
  const { data, error } = await getValidatedRouterParams(
    event,
    v.parserAsync(schema),
  );

  if (error) {
    const errors: Record<string, string> = {};

    for (const issue of error.issues) {
      const field = issue.path.join('.');

      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    }

    throw Errors.validation('Invalid router parameters', { error, errors });
  }

  return data;
}
