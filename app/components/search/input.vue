<template>
  <InputGroup>
    <InputGroupInput
      v-model="searchQuery"
      :placeholder
      class="paragraph-regular placeholder text-dark-400 dark:text-light-700 shadow-none"
    />
    <InputGroupAddon>
      <Search />
    </InputGroupAddon>
  </InputGroup>
</template>

<script setup lang="ts">
import { watchDebounced } from '@vueuse/core';
import { Search } from 'lucide-vue-next';

const { routeName, placeholder = 'Search...' } = defineProps<{
  routeName: string;
  placeholder?: string;
}>();

const route = useRoute();
const router = useRouter();

const searchQuery = ref<string>((route.query.query as string) ?? '');

watchDebounced(
  searchQuery,
  (newSearchQuery) => {
    const queryParams = route.query;

    if (newSearchQuery) {
      router.replace({
        name: routeName,
        query: { ...queryParams, query: searchQuery.value },
        force: true,
      });
    } else {
      delete queryParams.query;
      router.replace({ name: routeName, query: queryParams, force: true });
    }
  },
  { debounce: 300 },
);
</script>
