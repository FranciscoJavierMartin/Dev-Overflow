<template>
  <NuxtLink :to="{ name: ROUTES.tag, params: { id } }">
    <Badge variant="tag">
      <div class="flex-center space-x-2">
        <i class="text-sm" :class="[iconClass]" />
        <span>{{ name }}</span>
      </div>
      <Button v-if="showRemove" variant="ghost" class="size-3">
        <X
          class="size-3 cursor-pointer object-contain text-black dark:text-white"
          alt="close"
        />
      </Button>
    </Badge>
    <p v-if="showCount" class="small-medium text-dark-500 dark:text-light-700">
      {{ questions }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';
import { ROUTES } from '@/utils/constants/routes';

const { name } = defineProps<{
  id: string;
  name: string;
  questions?: number;
  showCount?: boolean;
  compact?: boolean;
  showRemove?: boolean;
}>();

const iconClass = computed(() => getDeviconClass(name));
</script>
