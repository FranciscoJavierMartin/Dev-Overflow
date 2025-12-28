<template>
  <div class="flex-center bg-light-700 dark:bg-dark-400 gap-1.5 rounded-sm">
    <div class="flex-center gap-0">
      <Button variant="ghost" size="icon">
        <ArrowBigUp
          class="size-4.5"
          :class="{
            'text-green-500': hasUpvoted,
            'text-muted-foreground': !hasUpvoted,
          }"
          :fill="hasUpvoted ? 'var(--color-green-500)' : 'none'"
        />
      </Button>
      <div class="flex-center">
        <p class="text-dark-400 dark:text-light-900 text-sm font-medium">
          {{ formatNumber(upvotes) }}
        </p>
      </div>
    </div>
    <div class="flex-center gap-0">
      <Button variant="ghost" size="icon">
        <ArrowBigDown
          class="size-4.5"
          :class="{
            'text-destructive': hasDownvoted,
            'text-muted-foreground': !hasDownvoted,
          }"
          :fill="hasDownvoted ? 'var(--destructive)' : 'none'"
        />
      </Button>
      <div class="flex-center pr-2.5">
        <p class="text-dark-400 dark:text-light-900 text-sm font-medium">
          {{ formatNumber(downvotes) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowBigDown, ArrowBigUp } from 'lucide-vue-next';

defineProps<{
  upvotes: number;
  hasUpvoted?: boolean;
  downvotes: number;
  hasDownvoted?: boolean;
}>();
</script>
