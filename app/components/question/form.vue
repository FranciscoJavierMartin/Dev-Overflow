<template>
  <form class="flex w-full flex-col gap-10" @submit.prevent="form.handleSubmit">
    <FieldGroup>
      <FieldInputText
        name="title"
        label="Question title"
        placeholder="Question title"
        description="Be specific and imagine you're asking a question to another person."
        :form-field="form.Field"
      />
      <form.Field name="content">
        <template #default="{ field }">
          <Field
            :data-invalid="isInvalidInput(field)"
            class="flex w-full flex-col gap-2.5"
          >
            <FieldLabel
              :for="field.name"
              class="paragraph-medium text-dark-400 dark:text-light-700"
            >
              Detailed explanation of your problem
            </FieldLabel>
            <FieldDescription class="body-regular text-light-500 mt-2.5">
              Introduce the problem and expand on what you've put in the title.
            </FieldDescription>
            <LazyQuestionEditor
              :id="field.name"
              :name="field.name"
              :model-value="field.state.value"
              placeholder="What trouble you?"
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
      <FieldInputTag
        name="tags"
        label="Tags"
        placeholder="Add tags..."
        description="Add up to 3 tags to describe what your question is about. You need to press enter to add a tag."
        :form-field="form.Field"
        :default-values="[...form.state.values.tags]"
      />
      <div class="mt-16 flex justify-end">
        <!-- TODO: isSubmitting is not working -->
        <Button
          type="submit"
          :disabled="form.state.isSubmitting"
          class="text-light-900 primary-gradient w-fit"
        >
          <Spinner v-if="form.state.isSubmitting" />
          {{ form.state.isSubmitting ? 'Submitting' : 'Ask a question' }}
        </Button>
      </div>
    </FieldGroup>
  </form>
</template>

<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import type { Question } from '@/generated/prisma/client';
import { askQuestionSchema } from '~~/shared/utils/validations/schemas/question';
import { ROUTES } from '~/utils/constants/routes';

const { showErrorToast } = useToast();
const router = useRouter();

const form = useForm({
  defaultValues: {
    title: '',
    content: '',
    tags: [] as string[],
  },
  validators: {
    onSubmit: askQuestionSchema,
  },
  onSubmit: async ({ value }) => {
    try {
      const { question } = await $fetch<{ question: Question | null }>(
        '/api/questions',
        {
          method: 'POST',
          body: {
            ...value,
          },
        },
      );

      if (question) {
        router.push({ name: ROUTES.question, params: { id: question.id } });
      } else {
        showErrorToast('Failed to ask a question. Please try again later');
      }
    } catch {
      showErrorToast('Failed to ask a question. Please try again later');
    }
  },
});
</script>
