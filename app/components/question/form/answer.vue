<template>
  <ClientOnly>
    <div
      class="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2"
    >
      <h3 class="paragraph-semibold text-dark-400 dark:text-light-800">
        Write your answer here
      </h3>
    </div>
    <form
      class="mt-6 flex w-full flex-col gap-10"
      @submit.prevent="form.handleSubmit"
    >
      <FieldGroup>
        <form.Field name="content">
          <template #default="{ field }">
            <Field
              :data-invalid="isInvalidInput(field)"
              class="flex w-full flex-col gap-2.5"
            >
              <LazyQuestionEditor
                :id="field.name"
                :name="field.name"
                :content="field.state.value"
                placeholder="You can solve applying..."
                :aria-invalid="isInvalidInput(field)"
                @input="field.handleChange"
              />
              <FieldErrorList
                v-if="isInvalidInput(field)"
                :errors="field.state.meta.errors"
              />
            </Field>
          </template>
        </form.Field>
      </FieldGroup>
      <div class="flex justify-end">
        <Button
          type="submit"
          :disabled="form.state.isSubmitting"
          class="text-light-900 primary-gradient w-fit"
        >
          <Spinner v-if="form.state.isSubmitting" />
          {{ form.state.isSubmitting ? 'Posting...' : 'Answer question' }}
        </Button>
      </div>
    </form>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import type { Answer } from '~/generated/prisma/client';
import { answerQuestionSchema } from '~~/shared/utils/validations/schemas/question';

const { questionId } = defineProps<{ questionId: string }>();

const { showErrorToast } = useToast();

const form = useForm({
  defaultValues: {
    content: '',
  },
  validators: {
    onSubmit: answerQuestionSchema,
  },
  onSubmit: async ({ value, formApi }) => {
    try {
      await $fetch<Answer>('/api/answers', {
        method: 'POST',
        body: {
          questionId: questionId,
          content: value.content,
        },
      });

      formApi.reset();
    } catch (error) {
      console.log(error);
      showErrorToast('Failed to answer question. Please try again later');
    }
  },
});
</script>
