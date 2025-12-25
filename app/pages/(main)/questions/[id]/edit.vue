<template>
  <div>
    <QuestionForm :question edit />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

const route = useRoute();
const { user } = useAuth();

const { data: question } = await useFetch<QuestionWithTags>(
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
