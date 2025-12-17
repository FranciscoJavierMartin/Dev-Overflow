import * as v from 'valibot';

export const emailSchema = v.pipe(
  v.string(),
  v.nonEmpty('Email is required'),
  v.email('Please provide a valid email address'),
);

export const passwordSignInSchema = v.pipe(
  v.string(),
  v.minLength(6, 'Password must be at least 6 characters long'),
);

export const usernameSchema = v.pipe(
  v.string(),
  v.nonEmpty('Username is required.'),
  v.minLength(3, 'Username must be at least 3 characters long.'),
  v.maxLength(30, 'Username cannot exceed 30 characters.'),
  v.regex(
    /^[a-zA-Z0-9_]+$/,
    'Username can only contain letters, numbers, and underscores.',
  ),
);

export const passwordSignUpSchema = v.pipe(
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
);
