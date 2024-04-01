import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classNames: ClassValue[]) => twMerge(clsx(classNames));
