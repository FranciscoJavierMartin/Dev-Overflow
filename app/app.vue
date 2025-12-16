<template>
  <div>
    <Button @click="toggleTheme">Toggle theme</Button>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

function toggleTheme(): void {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
}
</script>
