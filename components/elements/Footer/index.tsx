import { FooterProps } from '@/types/components';
import { Title } from '../Title';
import { cn } from '@/lib';
import { cormorant } from '@/assets/fonts';

export const Footer = (props: FooterProps) => {
  return (
    <footer className='footer fixed bottom-0 z-20 flex min-h-16 w-full bg-base-100 px-5 py-6'>
      <nav>
        <Title level='6' className={cn('footer-title', cormorant.className)}>
          Quick Links
        </Title>
        <a className='link-hover link'>Branding</a>
        <a className='link-hover link'>Design</a>
        <a className='link-hover link'>Marketing</a>
        <a className='link-hover link'>Advertisement</a>
      </nav>
      <nav>
        <Title level='6' className={cn('footer-title', cormorant.className)}>
          Contact us
        </Title>
        <a className='link-hover link'>About us</a>
        <a className='link-hover link'>Contact</a>
        <a className='link-hover link'>Jobs</a>
        <a className='link-hover link'>Press kit</a>
      </nav>
      <nav>
        <Title level='6' className={cn('footer-title', cormorant.className)}>
          Social
        </Title>
        <a className='link-hover link'>Terms of use</a>
        <a className='link-hover link'>Privacy policy</a>
        <a className='link-hover link'>Cookie policy</a>
      </nav>
    </footer>
  );
};
