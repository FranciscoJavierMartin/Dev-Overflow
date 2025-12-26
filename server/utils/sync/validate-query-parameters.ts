import type { H3Event } from 'h3';
import * as v from 'valibot';

export async function validateQueryParameters<T extends v.GenericSchema>(
  event: H3Event,
  schema: T,
): Promise<v.InferInput<T>> {
  try {
    const query = getQuery(event);
    // TODO: Continue with error handling
    console.log('----------Query------------');
    console.log(query);
    console.log('----------Query------------');
    const body = v.parse(schema, query);
    console.log(body);
    return body;
  } catch (error) {
    console.log('----------Error------------');
    console.log(error);
    console.log('----------Error------------');
    throw Errors.validation('Invalid query parameters', { error });
  }
}
