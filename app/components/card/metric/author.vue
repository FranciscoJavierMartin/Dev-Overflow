<template>
  <NuxtLink :to="to" class="flex-center gap-1">
    <NuxtImg
      v-if="imgUrl"
      :src="imgUrl"
      width="16"
      height="16"
      :alt
      class="rounded-full object-contain"
      :placeholder="[16, 16]"
    />
    <User
      v-else
      class="text-dark-400 dark:text-light-700 border-dark-400 dark:border-light-700 size-4 rounded-2xl border"
    />
    <p class="flex items-center gap-1" :class="textClass">
      {{ value }}
      <span class="small-regular line-clamp-1 max-sm:hidden">
        {{ title }}
      </span>
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from 'vue-router';
import { User } from 'lucide-vue-next';

defineProps<{
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  textClass?: HTMLAttributes['class'];
}>();
</script>
