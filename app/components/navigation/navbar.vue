<template>
  <nav
    class="flex-between bg-light-900 dark:bg-dark-200 shadow-light-300 fixed z-50 w-full gap-5 p-6 sm:px-12 dark:shadow-none"
  >
    <NuxtLink :to="{ name: ROUTES.home }" class="flex items-center gap-1">
      <NuxtImg :src="siteLogo" width="23" height="23" alt="Dev overflow" />
      <p
        class="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden"
      >
        Dev <span class="text-primary-500">Overflow</span>
      </p>
    </NuxtLink>

    <p>Global Search</p>

    <div class="flex-between gap-5">
      <NavigationTheme />
      <UserAvatar
        v-if="session.data?.user.id"
        :id="session.data.user.id"
        :name="session.data.user.name"
        :image-url="session.data.user.image"
      />
      <NavigationMobileNavigation />
    </div>
  </nav>
</template>

<script setup lang="ts">
import siteLogo from '@/assets/images/site-logo.svg';
import { ROUTES } from '@/utils/constants/routes';
import { authClient } from '~~/lib/auth-client';

const session = authClient.useSession();
</script>
