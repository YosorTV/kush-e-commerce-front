import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  validation?: boolean;
  label?: string;
  labelStyle?: string;
  containerClass?: HTMLInputElement['className'];
  isLoading?: boolean;
}
