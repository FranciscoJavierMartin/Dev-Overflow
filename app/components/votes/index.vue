<template>
  <div class="flex-center bg-light-700 dark:bg-dark-400 gap-1.5 rounded-sm">
    <div class="flex-center gap-0">
      <Button
        variant="ghost"
        size="icon"
        :disabled="upvoteButtonDisabled"
        class="group"
        @click="vote(VoteType.upvote)"
      >
        <ArrowBigUp
          class="size-4.5 group-hover:fill-green-500 group-hover:text-green-500"
          :class="{
            'fill-green-500 text-green-500': data?.hasUpvoted,
            'text-muted-foreground': !data?.hasUpvoted,
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
        @click="vote(VoteType.downvote)"
      >
        <ArrowBigDown
          class="group-hover:text-destructive group-hover:fill-destructive size-4.5"
          :class="{
            'text-destructive fill-destructive': data?.hasDownvoted,
            'text-muted-foreground': !data?.hasDownvoted,
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
import { VoteType, type VoteTarget } from '@/generated/prisma/enums';

const { targetId } = defineProps<{
  type: VoteTarget;
  targetId: string;
  upvotes: number;
  downvotes: number;
}>();

const isLoading = ref<boolean>(false);

const { user } = useAuth();
const { showErrorToast, showSuccessToast } = useToast();

const upvoteButtonDisabled = computed<boolean>(
  () =>
    data.value?.hasUpvoted ||
    data.value?.hasDownvoted ||
    !user ||
    isLoading.value,
);

const downvoteButtonDisabled = computed<boolean>(
  () =>
    data.value?.hasDownvoted ||
    data.value?.hasUpvoted ||
    !user ||
    isLoading.value,
);

async function vote(voteType: VoteType): Promise<void> {
  try {
    isLoading.value = true;
    console.log(voteType);
    showSuccessToast('An error occured while voting');
  } catch {
    showErrorToast('An error occured while voting');
  } finally {
    isLoading.value = false;
  }
}

const { data } = await useLazyFetch<{
  hasUpvoted: boolean;
  hasDownvoted: boolean;
}>('/api/votes/has-voted', {
  query: {
    targetId,
  },
  watch: [() => targetId],
});
</script>
