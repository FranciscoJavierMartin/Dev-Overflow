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
        <Button type="submit" class="text-light-900 primary-gradient w-fit">
          Ask a question
        </Button>
      </div>
    </FieldGroup>
  </form>
</template>

<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import * as v from 'valibot';

const askQuestionSchema = v.object({
  title: v.pipe(
    v.string(),
    v.nonEmpty('Title is required'),
    v.minLength(5, 'Title must be at least 5 character long'),
    v.maxLength(100, 'Title cannot exceed 100 characters'),
  ),
  content: v.pipe(v.string(), v.nonEmpty('Content is required')),
  tags: v.pipe(
    v.array(
      v.pipe(
        v.string(),
        v.nonEmpty('Tag is required'),
        v.maxLength(15, 'Tag cannot exceed 15 characters'),
      ),
    ),
    v.minLength(1, 'At least one tag is required'),
    v.maxLength(3, 'Cannot add more than 3 tags'),
  ),
});

const form = useForm({
  defaultValues: {
    title: 'Test title',
    content: '',
    tags: [] as string[],
  },
  validators: {
    onSubmit: askQuestionSchema,
  },
  onSubmit: async ({ value }) => {
    console.log(value);
  },
});
</script>
