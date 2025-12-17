<template>
  <component :is="formField" :name>
    <template #default="{ field }">
      <Field orientation="horizontal" :data-invalid="isInvalidInput(field)">
        <Checkbox
          :id="field.name"
          :name="field.name"
          :model-value="field.state.value"
          @update:model-value="
            (checked) => field.handleChange(checked === true)
          "
        />
        <FieldContent>
          <FieldLabel :for="field.name">
            {{ label }}
          </FieldLabel>
        </FieldContent>
      </Field>
    </template>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  label: string;
  formField: Component;
}>();
</script>
