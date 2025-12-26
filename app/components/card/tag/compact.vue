<template>
  <NuxtLink :to="{ name: ROUTES.tag, params: { id } }">
    <Badge variant="tag">
      <div class="flex-center space-x-2">
        <i class="text-sm" :class="[iconClass]" />
        <span>{{ name }}</span>
      </div>
    </Badge>
    <p class="small-medium text-dark-500 dark:text-light-700">
      {{ questions }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ROUTES } from '@/utils/constants/routes';

const { name } = defineProps<{
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  remove?: boolean;
}>();

const iconClass = computed(() => getDeviconClass(name));
const iconDescription = computed(() => getTechDescription(name));
</script>
