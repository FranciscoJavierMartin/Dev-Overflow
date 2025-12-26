<template>
  <div>
    <section
      class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center"
    >
      <h1 class="h1-bold text-dark-100 dark:text-light-900">All questions</h1>
      <Button
        class="text-light-900 primary-gradient min-h-12 px-4 py-3"
        as-child
      >
        <NuxtLink :to="{ name: ROUTES.askQuestion }">Ask a question</NuxtLink>
      </Button>
    </section>
    <section class="mt-11">
      <SearchLocal />
    </section>
    <SearchFilters />
    <div class="mt-10 flex w-full flex-col gap-6">
      <div v-for="question in data?.questions" :key="question.id">
        {{ question.title }}
      </div>
      <!-- <CardQuestion
        v-for="question in filteredQuestions"
        :key="question.id"
        v-bind="question"
      >
        {{ question.title }}
      </CardQuestion> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';

const route = useRoute();

const query = computed<string>(() => (route.query.query as string) || '');
const filter = computed<string>(() => (route.query.filter as string) || '');
const page = computed<number>(() => +(route.query.page || 1));
const pageSize = computed<number>(() => +(route.query.pageSize || 10));

const { data } = await useAsyncData<{
  questions: QuestionItem[];
  isNext: boolean;
}>(
  'questions',
  (_nuxtApp, { signal }) =>
    $fetch<{
      questions: QuestionItem[];
      isNext: boolean;
    }>('/api/questions', {
      query: {
        query: query.value,
        filter: filter.value,
        page: page.value,
        pageSize: pageSize.value,
      },
      signal,
    }),
  {
    watch: [query],
  },
);
</script>
