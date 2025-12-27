<template>
  <div>
    <div v-if="data" class="flex-start w-full flex-col">
      <div class="flex w-full flex-col-reverse justify-between">
        <div class="flex-start gap-1">
          <UserAvatar
            :id="data.author.id"
            :name="data.author.name"
            :image-url="data.author.image"
            class="size-5.5 text-xs"
          />
          <NuxtLink
            :to="{ name: ROUTES.profile, params: { id: data.author.id } }"
          >
            <p class="paragraph-semibold text-dark-300 dark:text-light-700">
              {{ data.author.name }}
            </p>
          </NuxtLink>
        </div>
        <div class="flex justify-end">
          <p>Votes</p>
        </div>
      </div>
      <h2 class="h2-semibold text-dark-200 dark:text-light-900 mt-3.5 w-full">
        {{ data.title }}
      </h2>
    </div>
    <div v-if="data" class="mt-5 mb-8 flex flex-wrap gap-4">
      <CardMetricInfo
        :icon="Clock"
        :value="`asked ${getTimeStamp(data?.createdAt ?? '')}`"
        title=""
        text-class="small-medium text-dark-400 dark:text-light-700"
      />
      <CardMetricInfo
        :icon="MessageCircle"
        :value="data?.answers ?? 0"
        title="answers"
        text-class="small-medium text-dark-400 dark:text-light-700"
      />
      <CardMetricInfo
        :icon="Eye"
        :value="formatNumber(data?.views ?? 0)"
        title="views"
        text-class="small-medium text-dark-400 dark:text-light-700"
      />
    </div>
    <LazyQuestionPreview hydrate-on-visible />
    <div v-if="data" class="mt-8 flex flex-wrap gap-2">
      <CardTagCompact v-for="tag in data?.tags" :key="tag.id" v-bind="tag" />
    </div>
    <section v-if="user" class="my-5">
      <QuestionFormAnswer :question-id="id" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';
import { Eye, MessageCircle, Clock } from 'lucide-vue-next';

const route = useRoute();
const { user } = useAuth();

const id = computed<string>(() => route.params.id as string);

const { data } = await useAsyncData<QuestionItem>(
  `question-${id.value}`,
  (_nuxtApp, { signal }) =>
    $fetch<QuestionItem>(`/api/questions/${id.value}`, {
      signal,
    }),
  {
    watch: [id],
  },
);

await useLazyFetch(`/api/questions/${id.value}`, {
  method: 'PATCH',
  server: false,
});
</script>
