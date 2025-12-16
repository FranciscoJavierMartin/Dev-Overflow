<template>
  <component :is="formField" :name>
    <template #default="{ field }">
      <Field
        :data-invalid="isInvalidInput(field)"
        class="flex w-full flex-col gap-2.5"
      >
        <FieldLabel
          :for="field.name"
          class="paragraph-medium text-dark-400 dark:text-light-700"
        >
          {{ label }}
        </FieldLabel>
        <TagsInput
          v-model="tags"
          class="paragraph-regular bg-light-900 dark:bg-dark-300 text-dark-300 dark:text-light-700 border-light-700 dark:border-dark-400 min-h-12 gap-0.5 rounded-sm"
          @add-tag="addTag(field, $event)"
          @remove-tag="removeTag(field, $event)"
        >
          <FieldInputTagBadge v-for="tag in tags" :key="tag" :value="tag" />
          <TagsInputInput :placeholder />
        </TagsInput>
        <FieldDescription
          v-if="description"
          class="body-regular text-light-500 mt-2.5"
        >
          {{ description }}
        </FieldDescription>
        <FieldErrorList
          v-if="isInvalidInput(field)"
          :errors="field.state.meta.errors"
        />
      </Field>
    </template>
  </component>
</template>

<script setup lang="ts">
import type { AcceptableInputValue } from 'reka-ui';
import type { FieldInputTagBadge } from '.';

const { defaultValues = [] } = defineProps<{
  name: string;
  placeholder: string;
  label: string;
  formField: Component;
  description?: string;
  defaultValues?: string[];
}>();

const tags = ref<string[]>(defaultValues);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addTag(field: any, tag: AcceptableInputValue) {
  field.handleChange([...field.state.value, tag]);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function removeTag(field: any, tag: AcceptableInputValue): void {
  field.handleChange(field.state.value.filter((t: string) => t !== tag));
}
</script>
