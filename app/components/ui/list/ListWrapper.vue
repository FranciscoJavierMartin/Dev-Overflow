<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts" generic="T">
import type { NuxtError } from '#app';

defineProps<{
  isSuccess: boolean;
  isLoading: boolean;
  data?: T[];
  error?: NuxtError;
  empty: {
    title: string;
    message: string;
    button?: {
      text: string;
      toName: string;
    };
  };
}>();
</script>
