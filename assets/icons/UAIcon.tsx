import { cn } from '@/lib';

export const UAIcon = ({ className }: { className: string }) => {
  return (
    <svg
      className={cn('rounded-full', className)}
      xmlns='http://www.w3.org/2000/svg'
      id='flag-icons-ua'
      viewBox='0 0 512 512'
      width={28}
      height={28}
    >
      <g fillRule='evenodd' strokeWidth='1pt'>
        <path fill='gold' d='M0 0h512v512H0z' />
        <path fill='#0057b8' d='M0 0h512v256H0z' />
      </g>
    </svg>
  );
};
