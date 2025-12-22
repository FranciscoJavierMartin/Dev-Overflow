<template>
  <aside
    class="no-scrollbar bg-light-900 dark:bg-dark-200 shadow-light-300 border-light-800 dark:border-dark-300 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-3xs dark:shadow-none"
  >
    <div class="flex flex-1 flex-col gap-6">
      <NavigationNavLinks :user-id="session.data?.user.id" />
    </div>
    <div class="flex flex-col gap-3">
      <Button
        v-if="session.data"
        class="small-medium btn-secondary min-h-10 w-full rounded-lg px-4 py-3 shadow-none"
        @click="authClient.signOut"
      >
        <LogOut class="size-5 text-black dark:text-white" />
        <span class="text-dark-300 dark:text-light-900 max-lg:hidden">
          Log Out
        </span>
      </Button>
      <template v-else>
        <Button
          as-child
          class="small-medium btn-secondary min-h-10 w-full rounded-lg px-4 py-3 shadow-none"
        >
          <NuxtLink :to="{ name: ROUTES.signIn }">
            <CircleUser class="size-5 lg:hidden" />
            <span class="primary-gradient bg-clip-text max-lg:hidden">
              Sign In
            </span>
          </NuxtLink>
        </Button>
        <Button
          as-child
          class="small-medium btn-tertiary text-dark-400 dark:text-light-900 min-h-10 w-full rounded-lg border px-4 py-3 shadow-none"
        >
          <NuxtLink :to="{ name: ROUTES.signUp }">
            <UserRoundPlus class="size-5 lg:hidden" />
            <span class="max-lg:hidden">Sign Up</span>
          </NuxtLink>
        </Button>
      </template>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { CircleUser, UserRoundPlus, LogOut } from 'lucide-vue-next';
import { ROUTES } from '@/utils/constants/routes';
import { authClient } from '~~/lib/auth-client';

const session = authClient.useSession();
</script>
