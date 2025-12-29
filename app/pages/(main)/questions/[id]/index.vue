<template>
  <div>
    <div v-if="data" class="flex-start w-full flex-col">
      <div class="flex w-full flex-col-reverse justify-between">
        <div class="flex-start gap-1">
          <UserAvatar
            :id="data.question.author.id"
            :name="data.question.author.name"
            :image-url="data.question.author.image"
            class="size-5.5 text-xs"
          />
          <NuxtLink
            :to="{
              name: ROUTES.profile,
              params: { id: data.question.author.id },
            }"
          >
            <p class="paragraph-semibold text-dark-300 dark:text-light-700">
              {{ data.question.author.name }}
            </p>
          </NuxtLink>
        </div>
        <div class="flex justify-end">
          <Votes
            :type="VoteTarget.question"
            :target-id="data.question.id"
            :upvotes="data.question.upvotes"
            :downvotes="data.question.downvotes"
          />
          <QuestionSave
            :question-id="data.question.id"
            :is-saved="isSaved?.isSaved"
          />
        </div>
      </div>
      <h2 class="h2-semibold text-dark-200 dark:text-light-900 mt-3.5 w-full">
        {{ data.question.title }}
      </h2>
    </div>
    <div v-if="data" class="mt-5 mb-8 flex flex-wrap gap-4">
      <CardMetricInfo
        :icon="Clock"
        :value="`asked ${getTimeStamp(data.question.createdAt)}`"
        title=""
        text-class="small-medium text-dark-400 dark:text-light-700"
      />
      <CardMetricInfo
        :icon="MessageCircle"
        :value="data.totalAnswers"
        title="answers"
        text-class="small-medium text-dark-400 dark:text-light-700"
      />
      <CardMetricInfo
        :icon="Eye"
        :value="formatNumber(data.question.views)"
        title="views"
        text-class="small-medium text-dark-400 dark:text-light-700"
      />
    </div>
    <LazyQuestionPreview hydrate-on-visible :content="data?.question.content" />
    <div v-if="data" class="mt-8 flex flex-wrap gap-2">
      <CardTagCompact
        v-for="tag in data.question.tags"
        :key="tag.id"
        v-bind="tag"
      />
    </div>
    <section v-if="data" class="my-5">
      <AnswerList
        :answers="data.answers"
        :total-answers="data.totalAnswers"
        :error
        :pending
        :status
      />
    </section>
    <section v-if="user" class="my-5">
      <AnswerForm :question-id="id" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';
import { Eye, MessageCircle, Clock } from 'lucide-vue-next';
import { VoteTarget } from '@/generated/prisma/enums';

const route = useRoute();
const { user } = useAuth();

const id = computed<string>(() => route.params.id as string);

const { data, error, pending, status } = await useAsyncData<{
  question: QuestionItem;
  answers: AnswerWithAuthor[];
  totalAnswers: number;
  isNext: boolean;
}>(
  `question-${id.value}`,
  async (_nuxtApp, { signal }) => {
    const [question, answers] = await Promise.all([
      $fetch<QuestionItem>(`/api/questions/${id.value}`, {
        signal,
      }),
      $fetch<{
        answers: AnswerWithAuthor[];
        totalAnswers: number;
        isNext: boolean;
      }>('/api/answers', {
        query: {
          questionId: id.value,
          sort: 'latest',
        },
        signal,
      }),
    ]);

    return { question, ...answers };
  },
  {
    watch: [id],
  },
);

await useLazyFetch(`/api/questions/${id.value}`, {
  method: 'PATCH',
  server: false,
});

const { data: isSaved } = await useFetch<{ isSaved: boolean }>(
  '/api/collections/has-saved',
  {
    query: {
      id: id.value,
      userId: user.value?.id ?? '',
    },
    watch: [id, user],
  },
);
</script>
