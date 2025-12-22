import { authClient } from '~~/lib/auth-client';
import { ROUTES } from '@/utils/constants/routes';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { data: session } = await authClient.useSession(useFetch);

  if (session.value?.user) {
    if (to.fullPath === from.fullPath) {
      return await navigateTo({ name: ROUTES.home });
    }
  }
});
