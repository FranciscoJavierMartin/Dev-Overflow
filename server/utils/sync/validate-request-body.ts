import type { H3Event } from 'h3';
import * as v from 'valibot';

export async function validateRequestBody<T extends v.GenericSchema>(
  event: H3Event,
  schema: T,
): Promise<v.InferInput<T>> {
  try {
    return await readValidatedBody(event, v.parser(schema));
  } catch (error) {
    throw Errors.validation('Invalid request body', { error });
  }
}
