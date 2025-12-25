import type { H3Event } from 'h3';
import * as v from 'valibot';

export async function validateQueryParameters<T extends v.GenericSchemaAsync>(
  event: H3Event,
  schema: T,
): Promise<v.InferInput<T>> {
  const query = getQuery(event);
  const { output, issues, success } = await v.safeParserAsync(schema)(query);

  if (!success) {
    const errors: Record<string, string> = {};

    for (const issue of issues) {
      const field = issue.path?.join('.');

      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    }

    throw Errors.validation('Invalid query parameters', {
      error: issues,
      errors,
    });
  }

  return output;
}
