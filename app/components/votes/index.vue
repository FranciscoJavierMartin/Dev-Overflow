<template>
  <div class="flex-center bg-light-700 dark:bg-dark-400 gap-1.5 rounded-sm">
    <div class="flex-center gap-0">
      <Button
        variant="ghost"
        size="icon"
        :disabled="upvoteButtonDisabled"
        class="group"
        @click="vote('upvote')"
      >
        <ArrowBigUp
          class="size-4.5 group-hover:fill-green-500 group-hover:text-green-500"
          :class="{
            'fill-green-500 text-green-500': hasUpvoted,
            'text-muted-foreground': !hasUpvoted,
          }"
        />
      </Button>
      <div class="flex-center">
        <p class="text-dark-400 dark:text-light-900 text-sm font-medium">
          {{ formatNumber(upvotes) }}
        </p>
      </div>
    </div>
    <div class="flex-center gap-0">
      <Button
        variant="ghost"
        size="icon"
        class="group"
        :disabled="downvoteButtonDisabled"
        @click="vote('downvote')"
      >
        <ArrowBigDown
          class="group-hover:text-destructive group-hover:fill-destructive size-4.5"
          :class="{
            'text-destructive fill-destructive': hasDownvoted,
            'text-muted-foreground': !hasDownvoted,
          }"
        />
      </Button>
      <div class="flex-center pr-2.5">
        <p class="text-dark-400 dark:text-light-900 text-sm font-medium">
          {{ formatNumber(downvotes) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowBigDown, ArrowBigUp } from 'lucide-vue-next';

const { hasUpvoted, hasDownvoted } = defineProps<{
  upvotes: number;
  hasUpvoted?: boolean;
  downvotes: number;
  hasDownvoted?: boolean;
}>();

const isLoading = ref<boolean>(false);

const { user } = useAuth();
const { showErrorToast, showSuccessToast } = useToast();

const upvoteButtonDisabled = computed<boolean>(
  () => hasUpvoted || hasDownvoted || !user || isLoading.value,
);

const downvoteButtonDisabled = computed<boolean>(
  () => hasDownvoted || hasUpvoted || !user || isLoading.value,
);

async function vote(voteType: 'upvote' | 'downvote'): Promise<void> {
  try {
    isLoading.value = true;
    showSuccessToast('An error occured while voting');
  } catch {
    showErrorToast('An error occured while voting');
  } finally {
    isLoading.value = false;
  }
}
</script>
