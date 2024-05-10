import { NextLink as Link } from '@/components/elements';
import { FooterProps } from '@/types/components';

export const Footer = (props: FooterProps) => {
  return (
    <footer className='fixed bottom-0 z-40 flex min-h-16 w-full items-center bg-base-100 px-5'>
      <div className='flex w-full justify-between'>
        {props.logoText && (
          <Link
            href={props.logoText?.url}
            className='link font-bold no-underline'
          >
            {props.logoText.text}
          </Link>
        )}
      </div>
    </footer>
  );
};
