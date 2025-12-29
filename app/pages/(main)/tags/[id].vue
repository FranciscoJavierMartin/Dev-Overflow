<template>
  <div>
    <section
      class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center"
    >
      <h1 class="h1-bold text-dark-100 dark:text-light-900 capitalize">
        {{ data?.tag.name }}
      </h1>
    </section>
    <section class="mt-11">
      <SearchInput :route-name="ROUTES.tag" />
    </section>
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
import type { Tag } from '@/generated/prisma/client';
import { ROUTES } from '@/utils/constants/routes';
import { EMPTY_QUESTIONS } from '@/utils/constants/lists';

const route = useRoute();

const query = computed<string>(() => (route.query.query as string) || '');
const page = computed<number>(() => +(route.query.page || 1));
const pageSize = computed<number>(() => +(route.query.pageSize || 10));
const dataCacheKey = `tag-${route.params.id}`;

const { data, pending, error, status } = await useAsyncData<{
  tag: Tag;
  questions: QuestionItem[];
  isNext: boolean;
}>(
  dataCacheKey,
  (_nuxtApp, { signal }) =>
    $fetch<{
      tag: Tag;
      questions: QuestionItem[];
      isNext: boolean;
    }>(`/api/tags/${route.params.id}`, {
      query: {
        query: query.value,
        page: page.value,
        pageSize: pageSize.value,
      },
      signal,
    }),
  {
    watch: [query, page, pageSize],
  },
);
</script>
