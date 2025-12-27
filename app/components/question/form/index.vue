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
              :content="field.state.value"
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
          {{
            form.state.isSubmitting
              ? 'Submitting'
              : edit
                ? 'Edit question'
                : 'Ask a question'
          }}
        </Button>
      </div>
    </FieldGroup>
  </form>
</template>

<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import type { Question } from '@/generated/prisma/client';
import { ROUTES } from '@/utils/constants/routes';
import {
  askQuestionSchema,
  type QuestionSchema,
} from '~~/shared/utils/validations/schemas/question';

const { question, edit } = defineProps<{
  question?: QuestionWithTags;
  edit?: boolean;
}>();

const { showErrorToast } = useToast();
const router = useRouter();

const form = useForm({
  defaultValues: {
    title: question?.title ?? '',
    content: question?.content ?? '',
    tags: question?.tags.map(({ name }) => name) ?? [],
  },
  validators: {
    onSubmit: askQuestionSchema,
  },
  onSubmit: async ({ value }) => {
    try {
      const response = await (edit && question
        ? editQuestion(value)
        : askQuestion(value));

      router.push({ name: ROUTES.questions, params: { id: response.id } });
    } catch {
      showErrorToast(
        edit
          ? 'Failed to edit question. Please try again later'
          : 'Failed to ask question. Please try again later',
      );
    }
  },
});

async function askQuestion(data: QuestionSchema): Promise<Question> {
  const { question } = await $fetch<{ question: Question }>('/api/questions', {
    method: 'POST',
    body: {
      ...data,
    },
  });

  return question;
}

async function editQuestion(data: QuestionSchema): Promise<Question> {
  const { question: response } = await $fetch<{ question: Question }>(
    `/api/questions/${question?.id}`,
    {
      method: 'PUT',
      body: {
        ...data,
      },
    },
  );

  return response;
}
</script>
