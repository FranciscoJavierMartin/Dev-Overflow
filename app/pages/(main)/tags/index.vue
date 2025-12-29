<template>
  <div>
    <h1 class="h1-bold text-dark-100 dark:text-light-900 text-3xl">Tags</h1>
    <section class="mt-11">
      <SearchInput :route-name="ROUTES.tag" />
    </section>
    <ListWrapper
      :data-length="data?.tags.length"
      :error
      :is-loading="pending"
      :is-success="status === 'success'"
      :empty="EMPTY_TAGS"
    >
      <div class="mt-10 flex w-full flex-wrap gap-4">
        <CardTag v-for="tag in data?.tags" :key="tag.id" v-bind="tag" />
      </div>
    </ListWrapper>
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/generated/prisma/client';
import { ROUTES } from '@/utils/constants/routes';
import { EMPTY_TAGS } from '@/utils/constants/lists';

const route = useRoute();

const query = computed<string>(() => (route.query.query as string) || '');
const filter = computed<string>(() => (route.query.filter as string) || '');
const page = computed<number>(() => +(route.query.page || 1));
const pageSize = computed<number>(() => +(route.query.pageSize || 10));

const { data, pending, error, status } = await useAsyncData<{
  tags: Tag[];
  isNext: boolean;
}>(
  'tags',
  (_nuxtApp, { signal }) =>
    $fetch<{
      tags: Tag[];
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
