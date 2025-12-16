<template>
  <main
    class="bg-auth dark:bg-auth flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10"
  >
    <section
      class="light-border bg-light-800 dark:bg-dark-200 shadow-light-100 dark:shadow-dark-100 min-w-full rounded-[10px] border px-4 py-10 sm:min-w-[520px] sm:px-8"
    >
      <div class="flex-between gap-2">
        <div class="space-y-2.5">
          <h1 class="h2-bold text-dark-100 dark:text-light-900">
            Join Dev Overflow
          </h1>
          <p class="text-dark-500 dark:text-light-400 paragraph-regular">
            To get your questions answered
          </p>
        </div>
        <NuxtImg
          :src="siteLogo"
          width="50"
          height="50"
          class="object-contain"
        />
      </div>
      <slot />
    </section>
  </main>
</template>

<script setup lang="ts">
import siteLogo from '@/assets/images/site-logo.svg';
</script>

<style scoped>
.bg-auth {
  background-image: url('@/assets/images/auth-light.png');
}

.dark {
  .bg-auth {
    background-image: url('@/assets/images/auth-dark.png');
  }
}
</style>
