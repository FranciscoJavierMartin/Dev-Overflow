import * as v from 'valibot';
import { auth } from '~~/lib/auth';
import { askQuestionSchema } from '~~/shared/utils/validations/schemas/question';
// import { prisma } from '~~/lib/prisma';

export default defineEventHandler(async (event) => {
  const _body = await readValidatedBody(event, v.parser(askQuestionSchema));
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  // prisma.

  return {
    session,
  };
});
