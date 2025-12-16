<template>
  <TagsInputItem :value>
    <Badge variant="tag" class="bg-dark-100! rounded-full py-1.5 pr-1.5">
      <div class="flex-center">
        <i class="text-sm" :class="[iconClass]" />
        <TagsInputItemText />
        <TagsInputItemDelete />
      </div>
    </Badge>
  </TagsInputItem>
</template>

<script setup lang="ts">
const { value } = defineProps<{
  value: string;
}>();

const iconClass = computed(() => getDeviconClass(value));
</script>
