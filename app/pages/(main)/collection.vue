<template>
  <div>
    <h1 class="h1-bold text-dark-100 dark:text-light-900">Saved questions</h1>
    <section
      class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"
    >
      <SearchLocal :route-name="ROUTES.collection" />
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
import { ROUTES } from '@/utils/constants/routes';
import { EMPTY_QUESTIONS } from '@/utils/constants/lists';

const route = useRoute();
const { user } = useAuth();

const query = computed<string>(() => (route.query.query as string) || '');
const filter = computed<string>(() => (route.query.filter as string) || '');
const page = computed<number>(() => +(route.query.page || 1));
const pageSize = computed<number>(() => +(route.query.pageSize || 10));

const { data, error, pending, status } = await useAsyncData<{
  questions: QuestionItem[];
}>(
  `collection-${user.value?.id}`,
  async (_nuxtApp, { signal }) => {
    const { questions } = await $fetch<{
      questions: QuestionItem[];
      isNext: boolean;
    }>(`/api/collections`, {
      query: {
        query: query.value,
        filter: filter.value,
        page: page.value,
        pageSize: pageSize.value,
      },
      signal,
    });

    return { questions };
  },
  {
    watch: [user],
    deep: true,
  },
);
</script>
