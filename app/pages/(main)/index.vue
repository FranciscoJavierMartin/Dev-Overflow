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
    <section
      class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"
    >
      <SearchInput :route-name="ROUTES.home" />
      <SearchSort :options="HomePageSort" class="hidden md:flex" />
    </section>
    <SearchFilters />
    <ListWrapper
      :data-length="data?.questions.length"
      :error
      :is-loading="pending"
      :is-success="status === 'success'"
      :empty="EMPTY_QUESTIONS"
    >
      <div class="mt-10 flex w-full flex-col gap-6">
        <CardQuestion
          v-for="question in data?.questions"
          :key="question.id"
          v-bind="question"
        />
      </div>
    </ListWrapper>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';
import { EMPTY_QUESTIONS } from '@/utils/constants/lists';
import { HomePageSort } from '@/utils/constants/sort';

const route = useRoute();

const query = computed<string>(() => (route.query.query as string) || '');
const filter = computed<string>(() => (route.query.filter as string) || '');
const page = computed<number>(() => +(route.query.page || 1));
const pageSize = computed<number>(() => +(route.query.pageSize || 10));

const { data, pending, error, status } = await useAsyncData<{
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
    watch: [query, filter, page, pageSize],
  },
);
</script>
