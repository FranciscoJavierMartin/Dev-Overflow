<template>
  <article class="border-light-800 dark:border-dark-300 border-b py-5">
    <div
      class="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2"
    >
      <div class="flex flex-1 items-start gap-1 sm:items-center">
        <UserAvatar
          :id="author.id"
          :name="author.name"
          :image-url="author.image"
          class="size-5 rounded-full object-cover text-xs max-sm:mt-2"
        />
        <NuxtLink
          :to="{ name: ROUTES.profile, params: { id: author.id } }"
          class="flex flex-col max-sm:ml-1 sm:flex-row sm:items-center"
        >
          <p class="body-semibold text-dark-300 dark:text-light-700">
            {{ author.name }}
          </p>
          <p
            class="small-regular text-dark-400 dark:text-light-500 mt-0.5 ml-0.5 line-clamp-1"
          >
            <span class="mx-0.5 max-sm:mx-0 max-sm:hidden">-</span>
            answered {{ getTimeStamp(createdAt) }}
          </p>
        </NuxtLink>
      </div>
      <div class="flex justify-end">
        <Votes :type="VoteTarget.answer" :target-id="id" :upvotes :downvotes />
      </div>
    </div>
    <LazyQuestionPreview hydrate-on-visible :content />
  </article>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';
import { VoteTarget } from '@/generated/prisma/enums';

defineProps<{
  id: string;
  content: string;
  upvotes: number;
  downvotes: number;
  createdAt: Date | string;
  author: Author;
}>();
</script>
