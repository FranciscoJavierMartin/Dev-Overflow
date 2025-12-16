<template>
  <form class="mt-10 space-y-6" @submit.prevent="form.handleSubmit">
    <FieldGroup>
      <FieldInputText
        name="email"
        label="Email address"
        placeholder="Email address"
        type="email"
        :form-field="form.Field"
      />
      <FieldInputPassword
        name="password"
        label="Password"
        placeholder="Password"
        :form-field="form.Field"
      />
      <Button
        type="submit"
        :disabled="form.state.isSubmitting"
        class="primary-gradient paragraph-medium font-inter text-light-900 min-h-12 w-full rounded-md px-4 py-3"
      >
        <Spinner v-if="form.state.isSubmitting" />
        {{ buttonText }}
      </Button>
    </FieldGroup>
    <p>
      Don't have an account?
      <NuxtLink
        :to="{ name: ROUTES.signUp }"
        class="paragraph-semibold primary-gradient bg-clip-text"
      >
        Sign up
      </NuxtLink>
    </p>
  </form>
</template>

<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';
import { toast } from 'vue-sonner';
import * as v from 'valibot';
import { ROUTES } from '@/utils/constants/routes';

const authFormSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty('Email is required'),
    v.email('Please provide a valid email address'),
  ),
  password: v.pipe(
    v.string(),
    v.minLength(6, 'Password must be at least 6 characters long'),
  ),
});

const form = useForm({
  defaultValues: {
    email: '',
    password: '',
  },
  validators: {
    onSubmit: authFormSchema,
  },
  onSubmit: async ({ value }) => {
    toast('You submitted the following values:', {
      description: h(
        'pre',
        {
          class:
            'bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4',
        },
        h('code', JSON.stringify(value, null, 2)),
      ),
      position: 'bottom-right',
      class: 'flex flex-col gap-2',
      style: {
        '--border-radius': 'calc(var(--radius)  + 4px)',
      },
    });
  },
});

const buttonText = computed<string>(() =>
  form.state.isSubmitting ? 'Signing in' : 'Sign in',
);
</script>
