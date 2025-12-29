<template>
  <div :class="cn('relative', $props.class)">
    <Select v-model="sortValue">
      <SelectTrigger
        class="body-regular border-light-800 dark:border-light-800 bg-light-800 dark:bg-dark-300 text-dark-500 dark:text-light-700 border px-5 py-2.5"
        aria-label="Filter options"
      >
        <div class="line-clamp-1 flex-1 text-left">
          <SelectValue placeholder="Select filter" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const { defaultValue = '' } = defineProps<{
  options: { name: string; value: string }[];
  defaultValue?: string;
  class?: HTMLAttributes['class'];
}>();
const sortValue = ref<string>(defaultValue);

const route = useRoute();
const router = useRouter();

watch(sortValue, (newValue) => {
  router.push({
    ...route,
    query: { ...route.query, sort: newValue },
  });
});
</script>
