import { FC } from 'react';

import { Copyright, LangChanger, ListOfPages, SocialLink, ThemeChanger } from '@/components/simple';
import { SubscribeForm } from '@/components/forms/SubscribeForm';

import { NextLink } from '@/elements/Link';
import { Title } from '@/elements/Title';
import { Logo } from '@/elements/Logo';

import { FooterProps } from '@/types/components';

export const Footer: FC<FooterProps> = ({ data, locale }) => {
  return (
    <footer className='footer relative flex min-h-16 w-full border-t border-info-content bg-base-100 px-5 py-6 drop-shadow-md'>
      <div className='grid w-full grid-cols-1 gap-x-20 lg:grid-cols-4'>
        <div className='col-span-1 row-start-4 h-full w-full items-end gap-y-6 lg:row-start-1 lg:flex-col lg:items-start'>
          <div className='flex h-full flex-col justify-between lg:flex-col'>
            <div className='flex w-full items-center justify-between gap-y-3 py-5 lg:flex-col lg:items-start'>
              <Logo className='relative -left-5 top-0 lg:-top-2.5' />
              <div className='col-start-2 flex gap-x-6 lg:hidden'>
                <LangChanger className='dropdown-top lg:dropdown-bottom' />
                <ThemeChanger />
              </div>
            </div>
            <SubscribeForm className='w-full' formField={data.formField} locale={locale} />
            <Copyright />
          </div>
        </div>
        <nav className='flex w-full flex-col items-center gap-y-2.5 md:items-start'>
          <Title level='4' className='hidden md:block'>
            {data.linksGroupTitle}
          </Title>
          <ListOfPages
            isFooter
            categories={null}
            collections={null}
            pages={data.links}
            className='flex flex-wrap items-center gap-x-6 lg:flex-col lg:flex-nowrap lg:items-start'
          />
        </nav>
        <nav className='flex w-full flex-col items-center md:items-start'>
          <address className='my-2.5 flex w-full flex-col items-center gap-y-2.5 not-italic md:items-start'>
            <Title level='4' className='hidden md:block'>
              {data.contactGroupTitle}
            </Title>
            <ul className='flex flex-wrap items-center justify-center gap-x-6 md:flex-col md:flex-nowrap md:items-start md:justify-start'>
              <li className='flex flex-wrap gap-x-6 py-2.5'>
                <NextLink href={`tel:${data.primaryPhone}`}>{data.primaryPhone}</NextLink>
                <NextLink href={`tel:${data.secondaryPhone}`}>{data.primaryPhone}</NextLink>
              </li>
              <li className='py-2.5 sm:whitespace-nowrap lg:max-w-56'>
                <span>{data.address}</span>
              </li>
            </ul>
          </address>
        </nav>
        <nav className='flex w-full flex-col items-center gap-y-2.5 md:items-start'>
          <Title level='4' className='hidden md:block'>
            {data.socialGroupTitle}
          </Title>
          <ul className='flex gap-x-6'>
            {data.socialLinks.map((link: any) => (
              <li key={link.id} className='py-2.5'>
                <SocialLink id={link.id} format={link.format} url={link.url} isExternal={link.isExternal} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};
