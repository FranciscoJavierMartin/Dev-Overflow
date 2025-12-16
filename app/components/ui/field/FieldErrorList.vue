<template>
  <div
    v-if="$slots.default || content"
    role="alert"
    data-slot="field-error"
    :class="cn('text-destructive text-sm font-normal', props.class)"
  >
    <ul
      v-if="Array.isArray(content)"
      class="ml-4 flex list-disc flex-col gap-1"
    >
      <li v-for="(error, index) in content" :key="index">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
  errors?: Array<string | { message: string | undefined } | undefined>;
}>();

const content = computed<(string | undefined)[] | null | undefined>(() => {
  if (!props.errors || props.errors.length === 0) return null;

  const uniqueErrors = [
    ...new Map(
      props.errors.filter(Boolean).map((error) => {
        const message = typeof error === 'string' ? error : error?.message;
        return [message, error];
      }),
    ).values(),
  ];

  return uniqueErrors.map((error) =>
    typeof error === 'string' ? error : error?.message,
  );
});
</script>
