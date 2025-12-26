<template>
  <div class="rounded-[10px] p-9 sm:px-11">
    <div
      class="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row"
    >
      <div>
        <span
          class="subtitle-regular text-dark-400 dark:text-light-700 line-clamp-1 flex sm:hidden"
        >
          {{ getTimeStamp(createdAt) }}
        </span>
        <NuxtLink :to="{ name: ROUTES.questions, params: { id: id } }">
          <h3
            class="sm:h3-semibold base-semibold text-dark-200 dark:text-light-900 line-clamp-1 flex-1"
          >
            {{ title }}
          </h3>
        </NuxtLink>
      </div>
    </div>
    <div class="mt-3.5 flex w-full flex-wrap gap-2">
      <CardTag
        v-for="tag in tags"
        :id="tag.id"
        :key="tag.id"
        :name="tag.name"
        compact
      />
    </div>
    <div class="flex-between mt-6 w-full flex-wrap gap-3">
      <CardMetricAuthor
        :img-url="author.image"
        :alt="author.name"
        :value="author.name"
        :title="`- asked ${getTimeStamp(createdAt)} `"
        :to="{ name: ROUTES.profile, params: { id: author.id } }"
        text-class="body-medium text-dark-400 dark:text-light-700"
      />
      <div
        class="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start"
      >
        <CardMetricInfo
          :icon="ThumbsUp"
          :value="upvotes"
          title="Upvotes"
          text-class="small-medium text-dark-400 dark:text-light-800"
        />
        <CardMetricInfo
          :icon="MessageCircle"
          :value="answers"
          title="Answers"
          text-class="small-medium text-dark-400 dark:text-light-800"
        />
        <CardMetricInfo
          :icon="Eye"
          :value="views"
          title="Views"
          text-class="small-medium text-dark-400 dark:text-light-800"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';
import { Eye, MessageCircle, ThumbsUp } from 'lucide-vue-next';

defineProps<{
  id: string;
  title: string;
  tags: { id: string; name: string }[];
  author: { id: string; name: string; image: string };
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}>();
</script>
