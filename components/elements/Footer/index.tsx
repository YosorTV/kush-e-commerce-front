import { NextLink as Link } from '@/components/elements';
import { FooterProps } from '@/types/components';

export const Footer = (props: FooterProps) => {
  return (
    <footer className='fixed bottom-0 flex min-h-14 w-full items-center bg-slate-200 px-5'>
      <div className='flex w-full justify-between'>
        <Link href={props.logoText?.url} className='link text-black'>
          {props.logoText.text}
        </Link>
      </div>
    </footer>
  );
};
