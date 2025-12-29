<template>
  <div class="flex-center mt-16 w-full flex-col sm:mt-36">
    <img
      :src="imageDark"
      width="270px"
      height="200px"
      :alt
      class="hidden object-contain dark:block"
    />
    <img
      :src="imageLight"
      width="270px"
      height="200px"
      :alt
      class="block object-contain dark:hidden"
    />
    <h2 class="h2-bold text-dark-200 dark:text-light-900 mt-8">{{ title }}</h2>
    <p
      class="body-regular text-dark-500 dark:text-light-700 my-3.5 max-w-md text-center"
    >
      {{ message }}
    </p>
    <NuxtLink v-if="button" as-child :to="{ name: button?.toName }">
      <Button
        class="paragraph-medium bg-primary-500 text-light-900 hover:bg-primary-500 min-h-11 rounded-lg px-4 py-3"
      >
        {{ button?.text }}
      </Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  message: string;
  imageLight: string;
  imageDark: string;
  alt: string;
  button?: {
    text: string;
    toName: string;
  };
}>();
</script>
