<template>
  <section
    v-if="data"
    class="flex flex-col-reverse items-start justify-between sm:flex-row"
  >
    <div class="flex flex-col items-start gap-4 lg:flex-row">
      <UserAvatar
        :id="data.user.id"
        :name="data.user.name"
        :image-url="data.user.image"
        class="size-35 rounded-full object-cover text-6xl font-bold"
      />
      <div class="mt-3">
        <h2 class="h2-bold text-dark-100 dark:text-light-900">
          {{ data.user.name }}
        </h2>
        <p class="paragraph-regular text-dark-200 dark:text-light-800">
          @{{ data.user.username }}
        </p>
        <div>
          <ProfileLink />
          <ProfileLink />
          <ProfileLink />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { User } from '~/generated/prisma/client';

const route = useRoute();

const id = computed(() => route.params.id);

const { data } = await useAsyncData<{
  user: User;
  totalAnswers: number;
  totalQuestions: number;
}>(
  `profile-${id.value}`,
  async (_nuxtApp, { signal }) => {
    const { user, totalAnswers, totalQuestions } = await $fetch<{
      user: User;
      totalAnswers: number;
      totalQuestions: number;
    }>(`/api/users/${id.value}`, {
      signal,
    });

    return { user, totalQuestions, totalAnswers };
  },
  {
    watch: [id],
  },
);
</script>
