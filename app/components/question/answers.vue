<template>
  <div>{{ answers?.length ?? 'Hello world' }}</div>
</template>

<script setup lang="ts">
import type { Answer } from '@/generated/prisma/client';

defineProps<{ answers?: Answer[] }>();
</script>
