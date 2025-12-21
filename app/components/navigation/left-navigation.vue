<template>
  <aside
    class="no-scrollbar bg-light-900 dark:bg-dark-200 shadow-light-300 border-light-800 dark:border-dark-300 sticky top-0 left-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 max-sm:hidden lg:w-3xs dark:shadow-none"
  >
    <div class="flex flex-1 flex-col gap-6">
      <NavigationNavLinks />
    </div>
    <div class="flex flex-col gap-3">
      <Button
        as-child
        class="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
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
        class="small-medium btn-tertiary text-dark-400 dark:text-light-900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
      >
        <NuxtLink :to="{ name: ROUTES.signUp }">
          <UserRoundPlus class="size-5 lg:hidden" />
          <span class="max-lg:hidden">Sign Up</span>
        </NuxtLink>
      </Button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { CircleUser, UserRoundPlus } from 'lucide-vue-next';
import { ROUTES } from '@/utils/constants/routes';
</script>
