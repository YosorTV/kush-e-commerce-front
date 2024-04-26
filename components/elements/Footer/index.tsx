import { NextLink as Link } from '@/components/elements';
import { FooterProps } from '@/types/components';

export const Footer = (props: FooterProps) => {
  return (
    <footer className='fixed bottom-0 z-50 flex min-h-14 w-full items-center bg-base-100 px-5'>
      <div className='flex w-full justify-between'>
        {props.logoText && (
          <Link href={props.logoText?.url} className='link text-black'>
            {props.logoText.text}
          </Link>
        )}
      </div>
    </footer>
  );
};
