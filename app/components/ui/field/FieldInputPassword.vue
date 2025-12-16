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
        <InputGroup
          class="paragraph-regular bg-light-900 dark:bg-dark-300 text-dark-300 dark:text-light-700 border-light-700 dark:border-dark-400 min-h-12 rounded-sm"
        >
          <InputGroupInput
            :id="field.name"
            :name="field.name"
            :model-value="field.state.value"
            :aria-invalid="isInvalidInput(field)"
            :type="isPasswordVisible ? 'text' : 'password'"
            :placeholder
            autocomplete="off"
            @blur="field.handleBlur"
            @input="field.handleChange($event.target.value)"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              variant="ghost"
              size="icon-sm"
              @click="isPasswordVisible = !isPasswordVisible"
            >
              <EyeClosed v-if="isPasswordVisible" />
              <Eye v-else />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldErrorList
          v-if="isInvalidInput(field)"
          :errors="field.state.meta.errors"
        />
      </Field>
    </template>
  </component>
</template>

<script setup lang="ts">
import { Eye, EyeClosed } from 'lucide-vue-next';

defineProps<{
  name: string;
  placeholder: string;
  label: string;
  formField: Component;
}>();

const isPasswordVisible = ref<boolean>(false);
</script>
