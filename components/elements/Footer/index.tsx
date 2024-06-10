// import { FooterProps } from '@/types/components';
import { Title } from '../Title';
import { cn } from '@/lib';
import { cormorant } from '@/assets/fonts';
import {
  LangChanger,
  ListOfPages,
  SocialLink,
  ThemeChanger,
} from '@/components/simple';
import { NextLink } from '../Link';
import { Logo } from '../Logo';
import { SubscribeForm } from '@/components/forms/SubscribeForm';

export const Footer = (data: any) => {
  return (
    <footer className='footer relative z-20 flex min-h-16 w-full bg-base-100 px-5 py-6'>
      <div className='grid w-full grid-cols-1 gap-x-20 lg:grid-cols-4'>
        <div className='col-span-1 row-start-1 h-full w-full items-end gap-y-6 lg:row-start-1 lg:flex-col lg:items-start'>
          <div className='flex h-full flex-col justify-between lg:flex-col'>
            <div className='flex w-full items-center justify-between gap-y-3 lg:flex-col lg:items-start'>
              <Logo className='relative -left-5' />
              <div className='col-start-2 flex gap-x-6'>
                <LangChanger className='dropdown-top lg:dropdown-bottom' />
                <ThemeChanger />
              </div>
            </div>
            <div className='divider lg:hidden' />
            <SubscribeForm
              className='flex w-full min-w-btn'
              formField={data.formField}
            />
            <div className='divider lg:hidden' />
          </div>
        </div>
        <nav>
          <Title level='6' className={cn('footer-title', cormorant.className)}>
            {data.linksGroupTitle}
          </Title>
          <ListOfPages
            pages={data.links}
            className='grid grid-cols-4 gap-x-2 xs:grid-cols-4 lg:grid-cols-1'
          />
        </nav>
        <nav>
          <address className='flex flex-col not-italic'>
            <Title
              level='6'
              className={cn('footer-title', cormorant.className)}
            >
              {data.contactGroupTitle}
            </Title>
            <ul className='flex flex-wrap items-center gap-x-6 lg:flex-col lg:flex-nowrap lg:items-start'>
              <li className='py-2.5'>
                <NextLink href={`tel:${data.primaryPhone}`}>
                  {data.primaryPhone}
                </NextLink>
              </li>
              <NextLink href={`tel:${data.secondaryPhone}`}>
                {data.primaryPhone}
              </NextLink>
              <li className='break-words py-2.5 lg:max-w-56'>
                <span>{data.address}</span>
              </li>
            </ul>
          </address>
        </nav>
        <nav>
          <Title level='6' className={cn('footer-title', cormorant.className)}>
            {data.socialGroupTitle}
          </Title>
          <ul className='flex gap-x-6'>
            {data.socialLinks.map((link: any) => (
              <li key={link.id} className='py-2.5'>
                <SocialLink
                  id={link.id}
                  format={link.format}
                  url={link.url}
                  isExternal={link.isExternal}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
