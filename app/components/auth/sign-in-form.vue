<template>
  <form class="mt-10 space-y-6" @submit.prevent="form.handleSubmit">
    <FieldGroup>
      <FieldInputText
        name="emailOrUsername"
        label="Email address or username"
        placeholder="Email address or username"
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
import * as v from 'valibot';
import { authClient } from '~~/lib/auth-client';
import { ROUTES } from '@/utils/constants/routes';
import {
  emailSchema,
  passwordSignInSchema,
  usernameSchema,
} from '~~/shared/utils/validations/schemas/auth';

const { showErrorToast } = useToast();
const router = useRouter();

const authFormSchema = v.object({
  emailOrUsername: v.union([emailSchema, usernameSchema]),
  password: passwordSignInSchema,
});

const form = useForm({
  defaultValues: {
    emailOrUsername: '',
    password: '',
  },
  validators: {
    onSubmit: authFormSchema,
  },
  onSubmit: async ({ value }) => {
    if (value.emailOrUsername.includes('@')) {
      await authClient.signIn.email(
        {
          email: value.emailOrUsername,
          password: value.password,
          callbackURL: '/',
          rememberMe: true,
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
    } else {
      await authClient.signIn.username(
        {
          username: value.emailOrUsername,
          password: value.password,
          callbackURL: '/',
          rememberMe: true,
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
    }
  },
});

const buttonText = computed<string>(() =>
  form.state.isSubmitting ? 'Signing in' : 'Sign in',
);
</script>
