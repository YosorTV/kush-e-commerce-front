import { z } from 'zod';

type Locale = 'en' | 'uk' | string;

const PASSWORD_REG_EX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]\\|;:'",.<>/?-]).{8,}$/;

const normalizePhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/[^\d]/g, '');

const getEmailErrorMessage = (locale: Locale) => {
  const messages: Record<Locale, string> = {
    en: 'Invalid email format. ',
    uk: 'Не вірний формат пошти. ',
  };

  return messages[locale] || messages.en;
};

const requiredErrorMessage = (locale: Locale) => {
  const messages: Record<Locale, string> = {
    en: ' Required field. ',
    uk: ' Обовязкове поле. ',
  };

  return messages[locale] || messages.en;
};

const requiredPasswordLengthMessage = (locale: Locale) => {
  const messages: Record<Locale, string> = {
    en: 'Password must be at least 8 characters long. ',
    uk: 'Пароль має містити мінімум 8 символів. ',
  };

  return messages[locale] || messages.en;
};

const emailSchema = (locale: Locale) =>
  z.string().email(getEmailErrorMessage(locale));

const passwordSchema = (locale: Locale) =>
  z
    .string()
    .min(8, { message: requiredPasswordLengthMessage(locale) })
    .regex(PASSWORD_REG_EX, {
      message: requiredErrorMessage(locale),
    });

const loginSchema = (locale: Locale) => {
  return z.object({
    identifier: emailSchema(locale),
    password: passwordSchema(locale),
    remember: z.string(),
    locale: z.string().readonly(),
  });
};

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
    password: passwordSchema(locale),
    email: emailSchema(locale),
  });

export const forgotPasswordSchema = (locale: Locale) =>
  z.object({ email: emailSchema(locale) });

export const resetPasswordBaseSchema = (locale: Locale) =>
  z.object({
    password: passwordSchema(locale),
    passwordConfirmation: requiredTextField(locale),
    code: z.string().readonly(),
  });

export const resetPasswordSchema = (locale: Locale) => {
  const schema = resetPasswordBaseSchema(locale);

  return schema.refine((data) => data.password === data.passwordConfirmation, {
    message:
      locale === 'uk' ? 'Паролі не співпадають.' : "Passwords don't matched",
    path: ['passwordConfirmation'],
  });
};

export const updatePasswordScema = (locale: Locale) =>
  z.object({
    email: emailSchema(locale),
    password: passwordSchema(locale),
  });

export const subscriptionSchema = (locale: Locale) =>
  z.object({
    email: emailSchema(locale),
    locale: z.string().readonly(),
  });

export const schemas = {
  login: loginSchema,
  signup: signupSchema,
  profile: profileSchema,
  subscription: subscriptionSchema,
  resetPassword: resetPasswordSchema,
  'update-password': updatePasswordScema,
  forgotUserPassword: forgotPasswordSchema,
};
