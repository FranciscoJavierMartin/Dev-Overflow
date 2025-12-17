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
import { authClient } from '~~/lib/auth-client';
import { ROUTES } from '@/utils/constants/routes';
import {
  emailSchema,
  passwordSignUpSchema,
  usernameSchema,
} from '~~/shared/utils/validations/schemas/auth';

const { showErrorToast } = useToast();
const router = useRouter();

const authFormSchema = v.pipe(
  v.object({
    username: usernameSchema,
    name: v.pipe(
      v.string(),
      v.nonEmpty('Name is required.'),
      v.maxLength(50, 'Name cannot exceed 50 characters.'),
    ),
    email: emailSchema,
    password: passwordSignUpSchema,
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
  onSubmit: async ({ value }) => {
    await authClient.signUp.email(
      {
        email: value.email,
        name: value.name,
        password: value.password,
        callbackURL: '/',
      },
      {
        onSuccess() {
          router.replace({ name: ROUTES.home });
        },
        onError(ctx) {
          if (ctx.error.message) {
            showErrorToast(ctx.error.message);
          }
        },
      },
    );
  },
});

const buttonText = computed<string>(() =>
  form.state.isSubmitting ? 'Signing up' : 'Sign up',
);
</script>
