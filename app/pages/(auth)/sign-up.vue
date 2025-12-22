<template>
  <AuthSignUpForm />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: ['non-auth'],
});
</script>
