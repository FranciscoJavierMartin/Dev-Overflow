<template>
  <form class="mt-10 space-y-6" @submit.prevent="form.handleSubmit">
    <FieldGroup>
      <FieldInputText
        name="username"
        label="Username"
        placeholder="Username"
        :form-field="form.Field"
      />
      <FieldInputText
        name="name"
        label="Name"
        placeholder="Name"
        :form-field="form.Field"
      />
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
      <FieldInputPassword
        name="confirmPassword"
        label="Confirm password"
        placeholder="Confirm password"
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
      Already have an account?
      <NuxtLink
        :to="{ name: ROUTES.signIn }"
        class="paragraph-semibold primary-gradient bg-clip-text"
      >
        Sign in
      </NuxtLink>
    </p>
  </form>
</template>

<script setup lang="ts">
import { useForm } from '@tanstack/vue-form';

import * as v from 'valibot';
import { ROUTES } from '@/utils/constants/routes';

const authFormSchema = v.pipe(
  v.object({
    username: v.pipe(
      v.string(),
      v.nonEmpty('Username is required.'),
      v.minLength(3, 'Username must be at least 3 characters long.'),
      v.maxLength(30, 'Username cannot exceed 30 characters.'),
      v.regex(
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores.',
      ),
    ),
    name: v.pipe(
      v.string(),
      v.nonEmpty('Name is required.'),
      v.maxLength(50, 'Name cannot exceed 50 characters.'),
    ),
    email: v.pipe(
      v.string(),
      v.nonEmpty('Email is required.'),
      v.email('Please provide a valid email address.'),
    ),
    password: v.pipe(
      v.string(),
      v.minLength(6, 'Password must be at least 6 characters long.'),
      v.maxLength(100, 'Password cannot exceed 100 characters.'),
      v.regex(/[A-Z]/, 'Password must contain at least one uppercase letter.'),
      v.regex(/[a-z]/, 'Password must contain at least one lowercase letter.'),
      v.regex(/[0-9]/, 'Password must contain at least one number.'),
      v.regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character.',
      ),
    ),
    confirmPassword: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      'Must confirm with password',
    ),
    ['confirmPassword'],
  ),
);

const form = useForm({
  defaultValues: {
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
  validators: {
    onSubmit: authFormSchema,
  },
  onSubmit: async ({ value }) => {},
});

const buttonText = computed<string>(() =>
  form.state.isSubmitting ? 'Signing up' : 'Sign up',
);
</script>
