<template>
  <div
    :class="cn('tiptap-keyboard-shortcuts p-4', props.class)"
    data-slot="tiptap-keyboard-shortcuts"
  >
    <h3 class="mb-2 text-lg font-medium">Keyboard Shortcuts</h3>
    <div class="grid gap-2">
      <div
        v-for="(shortcut, index) in shortcuts"
        :key="index"
        class="flex items-center justify-between"
      >
        <div class="flex gap-1">
          <kbd
            v-for="(key, kIndex) in shortcut.keys"
            :key="kIndex"
            class="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-100"
          >
            {{ key }}
          </kbd>
        </div>
        <span class="text-muted-foreground text-sm">{{
          shortcut.description
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { shortcuts } from './tiptapTreeUtils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>
