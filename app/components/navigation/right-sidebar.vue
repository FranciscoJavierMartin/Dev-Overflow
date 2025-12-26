<template>
  <aside
    class="no-scrollbar bg-light-900 dark:bg-dark-200 border-light-800 dark:border-dark-300 shadow-light-300 sticky top-0 right-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border p-6 pt-36 max-xl:hidden dark:shadow-none"
  >
    <section>
      <h3 class="h3-bold text-dark-200 dark:text-light-900">Top questions</h3>
      <section class="mt-7 flex w-full flex-col gap-7">
        <NuxtLink
          v-for="{ id, title } in hotQuestions"
          :key="id"
          :to="{ name: ROUTES.home }"
          class="flex-between cursor-pointer gap-7"
        >
          <p class="body-medium text-dark-500 dark:text-light-700">
            {{ title }}
          </p>
          <ChevronRight class="size-5" />
        </NuxtLink>
      </section>
      <section class="mt-16">
        <h3 class="h3-bold text-dark-200 dark:text-light-900">Popular tags</h3>
        <div class="mt-7 flex flex-col gap-4">
          <CardTagCompact
            v-for="tag in popularTags"
            :key="tag.id"
            v-bind="tag"
            show-count
          />
        </div>
      </section>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next';
import { ROUTES } from '@/utils/constants/routes';

const hotQuestions = [
  { id: '1', title: 'How to create a custom hook in react?' },
  { id: '2', title: 'How to use React Query?' },
  { id: '3', title: 'How to use Redux?' },
  { id: '4', title: 'How to use React Router?' },
  { id: '5', title: 'How to use Next Navigation?' },
];

const popularTags = [
  { id: '1', name: 'react', questions: 100 },
  { id: '2', name: 'javascript', questions: 50 },
  { id: '3', name: 'typescript', questions: 60 },
  { id: '4', name: 'nextjs', questions: 80 },
  { id: '5', name: 'react-query', questions: 20 },
];
</script>
