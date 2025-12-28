<template>
  <div class="flex-center gap-2.5">
    <div class="flex-center gap-1.5">
      <ArrowBigDown
        class="text-destructive size-4.5"
        fill="var(--destructive)"
      />
      <ArrowBigDown class="text-muted-foreground size-4.5" />
      <ArrowBigUp
        class="size-4.5 text-green-500"
        fill="var(--color-green-500)"
      />
      <ArrowBigUp class="text-muted-foreground size-4.5" :fill="'none'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowBigDown, ArrowBigUp } from 'lucide-vue-next';

defineProps<{
  upvotes: number;
  hasUpvoted?: boolean;
  downvotes: number;
  hasDownvotes?: boolean;
}>();
</script>
