<template>
  <NuxtLink
    :to="{ name: ROUTES.tag, params: { id } }"
    class="shadow-light-100 dark:shadow-none"
  >
    <article
      class="bg-light-900 dark:bg-dark-200 border-light-800 dark:border-dark-300 flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-63"
    >
      <div class="flex-between gap-3">
        <div class="bg-light-800 dark:bg-dark-400 w-fit rounded-sm px-5 py-1.5">
          <p class="paragraph-semibold text-dark-300 dark:text-light-900">
            {{ name }}
          </p>
        </div>
        <i class="text-2xl" :class="[iconClass]" />
      </div>
      <p
        class="small-regular text-dark-500 dark:text-light-700 mt-5 line-clamp-3 w-full"
      >
        {{ iconDescription }}
      </p>
      <p class="small-medium text-dark-400 dark:text-light-500 mt-4">
        <span class="body-semibold mr-2.5">{{ questions }}+</span> Questions
      </p>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';

const { name } = defineProps<{
  id: string;
  name: string;
  questions?: number;
}>();

const iconClass = computed(() => getDeviconClass(name));
const iconDescription = computed(() => getTechDescription(name));
</script>
