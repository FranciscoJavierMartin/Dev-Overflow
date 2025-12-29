<template>
  <div>
    <h1 class="h1-bold text-dark-100 dark:text-light-900">All users</h1>
    <section
      class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"
    >
      <SearchLocal :route-name="ROUTES.community" />
    </section>
    <ListWrapper
      :data-length="data?.users.length"
      :error
      :is-loading="pending"
      :is-success="status === 'success'"
      :empty="EMPTY_USERS"
    >
      <div class="mt-12 flex flex-wrap gap-6">
        <CardUser v-for="user in data?.users" :key="user.id" :user />
      </div>
    </ListWrapper>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/generated/prisma/client';
import { ROUTES } from '@/utils/constants/routes';
import { EMPTY_USERS } from '@/utils/constants/lists';

const route = useRoute();

const query = computed<string>(() => (route.query.query as string) || '');
const filter = computed<string>(() => (route.query.filter as string) || '');
const page = computed<number>(() => +(route.query.page || 1));
const pageSize = computed<number>(() => +(route.query.pageSize || 10));

const { data, error, pending, status } = await useAsyncData<{
  users: User[];
  totalUsers: number;
  isNext: boolean;
}>(
  'community',
  async (_nuxtApp, { signal }) => {
    const { users, totalUsers, isNext } = await $fetch<{
      users: User[];
      totalUsers: number;
      isNext: boolean;
    }>('/api/community/users', {
      query: {
        query: query.value,
        filter: filter.value,
        page: page.value,
        pageSize: pageSize.value,
      },
      signal,
    });

    return { users, totalUsers, isNext };
  },
  {
    watch: [query, filter, page, pageSize],
    deep: true,
  },
);
</script>
