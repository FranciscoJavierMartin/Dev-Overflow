import type { User } from '@/generated/prisma/client';
import { questionIdSchema } from '~~/shared/utils/validations/schemas/question';

export default defineEventHandler(async (event) => {
  const { id } = await validateRouterParams(event, questionIdSchema);
  const user: User = event.context.user;
  return 'Hello collections/toggle';
});
