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
        <div v-for="answer in answers" :key="answer.id">{{ answer.id }}</div>
      </div>
    </ListWrapper>
  </div>
</template>

<script setup lang="ts">
import type { AsyncDataRequestStatus, NuxtError } from '#app';
import type { Answer } from '@/generated/prisma/client';
import { EMPTY_ANSWERS } from '@/utils/constants/lists';

const { totalAnswers } = defineProps<{
  answers: Answer[];
  totalAnswers: number;
  pending: boolean;
  status: AsyncDataRequestStatus;
  error?: NuxtError<unknown>;
}>();

const title = computed<string>(
  () => `${totalAnswers} ${totalAnswers === 1 ? 'answer' : 'answers'}`,
);
</script>
