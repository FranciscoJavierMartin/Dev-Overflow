<template>
  <article class="shadow-light-100 xs:w-57.5 w-full dark:shadow-none">
    <div
      class="bg-light-900 dark:bg-dark-200 border-light-800 dark:border-dark-300 flex-center w-full flex-col rounded-2xl border p-8"
    >
      <UserAvatar
        :id="user.id"
        :name="user.name"
        :image-url="user.image"
        class="size-25 rounded-full object-cover text-3xl tracking-widest"
      />
      <NuxtLink
        as-child
        :to="{ name: ROUTES.profile, params: { id: user.id } }"
      >
        <div class="mt-4 text-center">
          <h3 class="h3-bold text-dark-200 dark:text-light-900 line-clamp-1">
            {{ user.name }}
          </h3>
          <p class="body-regular text-dark-400 dark:text-light-500 mt-2">
            @{{ user.username }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { User } from '@/generated/prisma/client';
import { ROUTES } from '~/utils/constants/routes';

defineProps<{ user: User }>();
</script>
