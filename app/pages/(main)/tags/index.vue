<template>
  <div>
    <h1 class="h1-bold text-dark-100 dark:text-light-900 text-3xl">Tags</h1>
    <section class="mt-11">
      <SearchLocal :route-name="ROUTES.tag" />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/generated/prisma/client';
import { ROUTES } from '@/utils/constants/routes';

const route = useRoute();

const query = computed<string>(() => (route.query.query as string) || '');
const filter = computed<string>(() => (route.query.filter as string) || '');
const page = computed<number>(() => +(route.query.page || 1));
const pageSize = computed<number>(() => +(route.query.pageSize || 10));

const { data, pending, error, status } = await useAsyncData<{
  questions: Tag[];
  isNext: boolean;
}>(
  'tags',
  (_nuxtApp, { signal }) =>
    $fetch<{
      questions: Tag[];
      isNext: boolean;
    }>('/api/tags', {
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
