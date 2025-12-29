<template>
  <Button variant="ghost" @click="save">
    <Star
      class="size-4.5 text-yellow-500"
      :class="{
        'fill-yellow-500': isSaved,
      }"
    />
  </Button>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next';

const { isSaved: initialIsSaved, questionId } = defineProps<{
  questionId: string;
  isSaved?: boolean;
}>();

const isLoading = ref<boolean>(false);
const isSaved = ref<boolean>(initialIsSaved);

const { user } = useAuth();
const { showErrorToast, showSuccessToast } = useToast();

async function save(): Promise<void> {
  if (!isLoading.value && user.value) {
    try {
      isLoading.value = true;

      const data = await $fetch<{ success: boolean }>(
        `/api/collections/toggle/${questionId}`,
        { method: 'PUT' },
      );

      if (data?.success) {
        isSaved.value = !isSaved.value;
      }

      showSuccessToast(
        `Question ${isSaved.value ? 'saved' : 'unsaved'} successfully`,
      );
    } catch {
      showErrorToast('Failed to save question');
    } finally {
      isLoading.value = false;
    }
  }
}
</script>
