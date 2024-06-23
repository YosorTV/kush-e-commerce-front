import { cn } from '@/lib';
import { InputProps } from '@/types/components';

const textInputTypes = (type: HTMLInputElement['type']) => {
  const customTypesStyles = ['radio', 'checkbox', 'range', 'file', 'date'];

  return !customTypesStyles.includes(type);
};

export const Input = ({
  name,
  className,
  error,
  placeholder,
  type,
  label,
  labelStyle,
  containerClass,
  isLoading,
  children,
  id,
  ...rest
}: InputProps) => {
  const isTextType = textInputTypes(type);

  return (
    <div
      className={cn('relative flex w-full flex-col gap-y-2', containerClass)}
    >
      {label && (
        <label htmlFor={id} className={cn('label label-text', labelStyle)}>
          {label}
        </label>
      )}
      <div className='relative flex'>
        <input
          {...rest}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            isTextType
              ? 'input input-bordered w-full cursor-pointer'
              : className,
            error && 'input-error'
          )}
        />
        {children}
      </div>
      {isLoading && (
        <span className='loading loading-dots loading-md absolute right-3 top-10 md:right-20 md:top-3 lg:right-3' />
      )}
      {error && <span className={`relative text-xs text-error`}>{error}</span>}
    </div>
  );
};
