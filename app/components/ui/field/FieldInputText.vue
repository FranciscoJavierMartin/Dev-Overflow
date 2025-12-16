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
        <Input
          :id="field.name"
          :name="field.name"
          :model-value="field.state.value"
          :aria-invalid="isInvalidInput(field)"
          :type
          :placeholder
          autocomplete="off"
          class="paragraph-regular bg-light-900 dark:bg-dark-300 text-dark-300 dark:text-light-700 border-light-700 dark:border-dark-400 min-h-12 rounded-sm"
          @blur="field.handleBlur"
          @input="field.handleChange($event.target.value)"
        />
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
const { type = 'text' } = defineProps<{
  name: string;
  placeholder: string;
  label: string;
  formField: Component;
  type?: 'text' | 'email';
  description?: string;
}>();
</script>
