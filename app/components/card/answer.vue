<template>
  <article>
    <span>{{ id }}</span>
    <div>
      <div>
        <UserAvatar
          :id="author.id"
          :name="author.name"
          :image-url="author.image"
        />
        <NuxtLink :to="{ name: ROUTES.profile, params: { id: author.id } }">
          <p>{{ author.name }}</p>
          <p>
            <span> - </span>
            answered {{ getTimeStamp(createdAt) }}
          </p>
        </NuxtLink>
      </div>
      <div>Votes</div>
    </div>
    <LazyQuestionPreview hydrate-on-visible :content />
  </article>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';

defineProps<{
  id: string;
  content: string;
  createdAt: Date | string;
  author: Author;
}>();
</script>
