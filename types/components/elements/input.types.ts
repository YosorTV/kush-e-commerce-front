import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  labelStyle?: string;
  containerClass?: string;
  isLoading?: boolean;
}
