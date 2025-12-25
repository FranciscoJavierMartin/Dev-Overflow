<template>
  <div>
    <QuestionForm :question edit />
  </div>
</template>

<script setup lang="ts">
import type { Question, Tag } from '@/generated/prisma/client';

definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const { user } = useAuth();

const { data: question } = await useFetch<Question & { tags: Tag[] }>(
  `/api/questions/${route.params.id}`,
);

if (!question.value) {
  throw createError({
    status: 404,
    statusText: 'Question not found',
  });
}

if (question.value.authorId === user.value?.id) {
  throw createError({
    status: 401,
    statusText: "User is not question's author",
  });
}
</script>
