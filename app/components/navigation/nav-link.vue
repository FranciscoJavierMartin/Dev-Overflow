<template>
  <NuxtLink
    :to="getRoute(route)"
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
const routePath = useRoute();

const { userId, route } = defineProps<{
  isMobileNav?: boolean;
  icon: Component;
  label: string;
  route: string;
  userId: string;
}>();

function getRoute(route: string): string {
  return route === '/profile' ? `/profile/${userId}` : route;
}

const isActive = computed(() => routePath.path === getRoute(route));
</script>
