<template>
  <div>
    <ImageSkeleton
      v-if="!isSuccess"
      :title="error?.message || DEFAULT_ERROR.title"
      :button="DEFAULT_ERROR.button"
      :message="DEFAULT_ERROR.message"
      :image-light="lightError"
      :image-dark="darkError"
      alt="Error state illustration"
    />
    <ImageSkeleton
      v-else-if="data?.length === 0"
      v-bind="empty"
      :image-light="lightIllustration"
      :image-dark="darkIllustration"
      alt="Error state illustration"
    />
    <slot v-else />
  </div>
</template>

<script setup lang="ts" generic="T">
import type { NuxtError } from '#app';
import { DEFAULT_ERROR } from '@/utils/constants/lists';
import lightError from '@/assets/images/light-error.png';
import darkError from '@/assets/images/dark-error.png';
import lightIllustration from '@/assets/images/light-illustration.png';
import darkIllustration from '@/assets/images/dark-illustration.png';

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
