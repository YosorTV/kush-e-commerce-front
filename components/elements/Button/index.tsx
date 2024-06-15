import { FC } from 'react';
import { cn } from '@/lib';

export const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  disabled,
  className,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        className,
        !disabled && 'cursor-pointer',
        'btn no-animation m-0 rounded-none border-none !bg-transparent p-0 text-xl font-semibold uppercase text-base-200 no-underline underline-offset-8 !shadow-none !outline-none transition-all'
      )}
    >
      {children}
    </button>
  );
};
