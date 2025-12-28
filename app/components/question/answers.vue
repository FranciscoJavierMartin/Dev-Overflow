<template>
  <div class="mt-11">
    <div class="flex-between">
      <h3 class="primary-gradient bg-clip-text font-semibold">{{ title }}</h3>
      <p>Filters</p>
    </div>
    <ListWrapper
      :data-length="answers.length"
      :error
      :is-loading="pending"
      :is-success="status === 'success'"
      :empty="EMPTY_ANSWERS"
    >
      <div class="mt-10 flex w-full flex-col gap-6">
        <CardAnswer
          v-for="answer in answers"
          :id="answer.id"
          :key="answer.id"
          :author="answer.author"
          :content="answer.content"
          :created-at="answer.createdAt"
        />
      </div>
    </ListWrapper>
  </div>
</template>

<script setup lang="ts">
import type { AsyncDataRequestStatus, NuxtError } from '#app';
import { EMPTY_ANSWERS } from '@/utils/constants/lists';

const { totalAnswers } = defineProps<{
  answers: AnswerWithAuthor[];
  totalAnswers: number;
  pending: boolean;
  status: AsyncDataRequestStatus;
  error?: NuxtError<unknown>;
}>();

const title = computed<string>(
  () => `${totalAnswers} ${totalAnswers === 1 ? 'answer' : 'answers'}`,
);
</script>
