import { ROUTES } from '~/utils/constants/routes';
import { authClient } from '~~/lib/auth-client';

export function useAuth() {
  const router = useRouter();
  const session = authClient.useSession();

  const user = computed(() => session.value.data?.user);

  async function signOut() {
    await authClient.signOut();
    router.replace({ name: ROUTES.signIn });
  }

  return {
    signOut,
    user,
  };
}
