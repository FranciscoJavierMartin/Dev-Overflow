<template>
  <section class="markdown prose grid wrap-break-word">
    <div v-html="markdown2HTML" />
  </section>
</template>

<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

const { content = '' } = defineProps<{ content?: string }>();

const markdown2HTML = computedAsync<string>(() =>
  marked.parse(DOMPurify.sanitize(content)),
);
</script>
