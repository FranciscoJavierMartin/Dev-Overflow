<template>
  <NuxtLink
    :to="{ name: ROUTES.tags, params: { id } }"
    class="flex justify-between gap-2"
  >
    <Badge variant="tag">
      <div class="flex-center space-x-2">
        <i class="text-sm" :class="[iconClass]" />
        <span>{{ name }}</span>
      </div>
    </Badge>
    <p v-if="showCount" class="small-medium text-dark-500 dark:text-light-700">
      {{ questions }}
    </p>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { ROUTES } from '@/utils/constants/routes';

const { name } = defineProps<{
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
}>();

const iconClass = computed(() => getDeviconClass(name));
const iconDescription = computed(() => getTechDescription(name));
</script>
