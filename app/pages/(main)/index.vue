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
      <CardQuestion
        v-for="question in filteredQuestions"
        :key="question.id"
        v-bind="question"
      >
        {{ question.title }}
      </CardQuestion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';

const route = useRoute();

const questions = [
  {
    id: '1',
    title: 'How to learn React?',
    description: 'I want to learn React, can anyone help me?',
    tags: [
      { id: '1', name: 'React' },
      { id: '2', name: 'JavaScript' },
    ],
    author: {
      id: '1',
      name: 'John Doe',
      image:
        'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'How to learn JavaScript?',
    description: 'I want to learn JavaScript, can anyone help me?',
    tags: [{ id: '1', name: 'JavaScript' }],
    author: {
      id: '1',
      name: 'John Doe',
      image:
        'https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg',
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
];

const query = computed(() => (route.query.query as string) ?? '');
const filter = computed(() => (route.query.filter as string) ?? '');

const filteredQuestions = computed(() => {
  const filterLowerCase = filter.value.toLowerCase();
  return questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.value.toLowerCase());
    const matchesFilter = filter.value
      ? question.tags.some((tag) => tag.name.toLowerCase() === filterLowerCase)
      : true;

    return matchesQuery && matchesFilter;
  });
});
</script>
