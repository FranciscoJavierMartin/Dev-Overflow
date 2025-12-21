<template>
  <div class="flex-center gap-1">
    <Component :is="icon" class="size-4 rounded-full object-contain" />
    <p class="flex items-center gap-1" :class="textClass">
      {{ value }}
      <span class="small-regular line-clamp-1">
        {{ title }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { LucideProps } from 'lucide-vue-next';
import type { FunctionalComponent, HTMLAttributes } from 'vue';

defineProps<{
  icon: FunctionalComponent<LucideProps>;
  value: string | number;
  title: string;
  textClass?: HTMLAttributes['class'];
}>();
</script>
