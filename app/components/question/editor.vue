<template>
  <div></div>
</template>

<script setup lang="ts">
const text = ref('');

defineProps<{
  id: string;
  name: string;
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: 'input', text: string): void;
}>();

watch(text, (newValue) => {
  emit('input', newValue);
});
</script>
