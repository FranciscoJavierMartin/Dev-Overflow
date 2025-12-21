<template>
  <div class="mt-10 hidden flex-wrap gap-3 sm:flex">
    <Button
      v-for="filter in filters"
      :key="filter.value"
      class="body-medium rounded-lg px-6 py-3 capitalize shadow-none"
      :class="{
        'bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400':
          activeFilter === filter.value,
        'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300':
          activeFilter !== filter.value,
      }"
      @click="handleFilterChange(filter.value)"
    >
      {{ filter.name }}
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';

const router = useRouter();
const route = useRoute();
const activeFilter = ref<string>((route.query.filter as string) ?? '');

const filters = [
  { name: 'React', value: 'react' },
  { name: 'JavaScript', value: 'javascript' },
];

function handleFilterChange(filterValue: string): void {
  const queryParams = route.query;

  if (filterValue === activeFilter.value) {
    delete queryParams.filter;
    router.replace({ name: ROUTES.home, query: queryParams, force: true });
  } else {
    router.replace({
      name: ROUTES.home,
      query: { ...queryParams, filter: filterValue },
      force: true,
    });
  }
}

watch(route, (newRoute) => {
  activeFilter.value = (newRoute.query.filter as string) ?? '';
});
</script>
