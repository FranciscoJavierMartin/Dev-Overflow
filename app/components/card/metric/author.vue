<template>
  <NuxtLink :to="to" class="flex-center gap-1">
    <NuxtImg
      :src="imgUrl"
      width="16"
      height="16"
      :alt
      class="rounded-full object-contain"
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

defineProps<{
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  to: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  textClass?: HTMLAttributes['class'];
}>();
</script>
