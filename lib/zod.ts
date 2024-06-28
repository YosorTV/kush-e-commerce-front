import { z } from 'zod';

type Locale = 'en' | 'uk' | string;

const PASSWORD_REG_EX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$/;

const emailSchema = z.string().email('Invalid email format');

const getEmailErrorMessage = (locale: Locale) => {
  const messages: Record<Locale, string> = {
    en: 'Invalid email format',
    uk: 'Не вірний формат пошти',
  };

  return messages[locale] || messages.en;
};

const requiredErrorMessage = (locale: Locale) => {
  const messages: Record<Locale, string> = {
    en: 'Required field',
    uk: 'Обовязкове поле',
  };

  return messages[locale] || messages.en;
};

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

const normalizePhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/[^\d]/g, '');

const requiredTextField = (locale: Locale) =>
  z.string().refine((val) => val.trim() !== '', {
    message: requiredErrorMessage(locale),
  });

const requiredPhoneField = (locale: Locale) =>
  z.string().refine(
    (val) => {
      const normalizedPhoneNumber = normalizePhoneNumber(val);

      return (
        normalizedPhoneNumber.trim() !== '' &&
        /^\d{6,}$/.test(normalizedPhoneNumber)
      );
    },
    {
      message: requiredErrorMessage(locale),
    }
  );

const profileSchema = z.object({
  firstName: z.string().refine((val) => val.trim() !== '', {
    message: 'First name cannot be empty',
  }),
  lastName: z.string().refine((val) => val.trim() !== '', {
    message: 'Last name cannot be empty',
  }),
  delivery: z.string().refine((val) => val.trim() !== '', {
    message: 'Delivery address cannot be empty',
  }),
  billing: z.string().refine((val) => val.trim() !== '', {
    message: 'Billing address cannot be empty',
  }),
  contactNumber: z.string().refine((val) => val.trim() !== '', {
    message: 'Contact number cannot be empty',
  }),
  email: z.string().email().readonly(),
  username: z.string().readonly(),
  userId: z.string().readonly(),
});

const signupSchema = (locale: Locale) =>
  z.object({
    firstName: requiredTextField(locale),
    lastName: requiredTextField(locale),
    username: z.string().readonly(),
    phoneNumber: requiredPhoneField(locale),
    password: passwordSchema,
    email: z.string().email(getEmailErrorMessage(locale)),
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

export const subscriptionSchema = (locale: Locale) =>
  z.object({
    email: z.string().email(getEmailErrorMessage(locale)),
    locale: z.string().readonly(),
  });

export const schemas = {
  login: loginSchema,
  signup: signupSchema,
  profile: profileSchema,
  subscription: subscriptionSchema,
  'reset-password': resetPasswordSchema,
  'update-password': updatePasswordScema,
  'forgot-password': forgotPasswordSchema,
};
