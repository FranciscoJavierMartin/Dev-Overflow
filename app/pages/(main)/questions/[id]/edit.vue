<template>
  <div>
    <!-- <QuestionForm :question edit /> -->
    <h1>{{ question?.id }}</h1>
  </div>
</template>

<script setup lang="ts">
import type { Question, Tag } from '@/generated/prisma/client';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();

const { data: question } = await useFetch<Question & { tags: Tag[] }>(
  `/api/questions/${route.params.id}`,
  {},
);
</script>
