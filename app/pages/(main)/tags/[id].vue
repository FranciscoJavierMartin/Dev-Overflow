<template>
  <h1>Tags</h1>
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
