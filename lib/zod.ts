import { z } from 'zod';

const PASSWORD_REG_EX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$/;

const emailSchema = z.string().email('Invalid email format');

const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .regex(PASSWORD_REG_EX, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  });

const loginSchema = z.object({
  identifier: emailSchema,
  password: passwordSchema,
});

const signupSchema = z.object({
  username: z.string().trim().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email format'),
  password: passwordSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  passwordConfirmation: passwordSchema,
  code: z.string().readonly(),
});

export const updatePasswordScema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const schemas = {
  login: loginSchema,
  signup: signupSchema,
  'reset-password': resetPasswordSchema,
  'update-password': updatePasswordScema,
  'forgot-password': forgotPasswordSchema,
};
