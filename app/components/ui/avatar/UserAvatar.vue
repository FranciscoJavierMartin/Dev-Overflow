<template>
  <NuxtLink :to="{ name: ROUTES.profile, params: { id } }">
    <Avatar :class="cn('relative', $props.class)">
      <NuxtImg
        v-if="imageUrl"
        :src="imageUrl"
        :alt="name"
        quality="100"
        class="object-cover"
        width="36px"
        height="36px"
      />
      <AvatarFallback
        v-else
        class="font-space-grotesk primary-gradient font-bold tracking-wider text-white"
      >
        {{ initials }}
      </AvatarFallback>
    </Avatar>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/utils/constants/routes';

const { name } = defineProps<{
  id: string;
  name: string;
  imageUrl?: string | null;
  class?: HTMLAttributes['class'];
}>();

const initials = computed<string>(() =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2),
);
</script>
