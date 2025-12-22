<template>
  <NuxtLink
    :to
    class="flex-start text-dark-300 dark:text-light-900 gap-4 bg-transparent p-4"
    active-class="primary-gradient rounded-lg text-light-900"
  >
    <Component :is="icon" class="size-5" />
    <p
      :class="{
        // TODO: Check later
        // 'max-lg:hidden': !isMobileNav,
        'base-bold': isActive,
        'base-medium': !isActive,
      }"
    >
      {{ label }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from 'vue-router';
import { ROUTES } from '~/utils/constants/routes';

const routePath = useRoute();

const { userId, route } = defineProps<{
  isMobileNav?: boolean;
  icon: Component;
  label: string;
  route: string;
  userId?: string;
}>();

function getRoute(route: string): string {
  return route === '/profile' ? `/profile/${userId}` : route;
}

const to = computed<
  RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric | undefined
>(() => {
  let link:
    | RouteLocationAsRelativeGeneric
    | RouteLocationAsPathGeneric
    | undefined;

  switch (route) {
    case ROUTES.profile:
      if (userId) {
        link = {
          name: route,
          params: { id: userId },
        };
      } else {
        link = undefined;
      }
      break;
    default:
      link = { name: route };
      break;
  }

  return link;
});

const isActive = computed(() => routePath.path === getRoute(route));
</script>
