'use client';

import { useLocale } from 'next-intl';

import { createQueryString } from '@/lib';
import { useRouter } from 'next/navigation';
import { LOCALES } from '@/helpers/constants';

export const LangChanger = () => {
  const router = useRouter();
  const locale = useLocale();

  const handleChange = () => {
    const { pathname, search } = window.location;
    const url = createQueryString(`${pathname}${search}`);

    router.replace(url);
  };

  return (
    <div className='dropdown font-medium uppercase text-base-200'>
      <span
        tabIndex={0}
        role='button'
        className=' underline underline-offset-8'
      >
        {locale}
      </span>
      <ul
        tabIndex={0}
        className='menu dropdown-content z-[1] w-auto bg-base-100 p-2 shadow'
      >
        {LOCALES.map((lang) => (
          <li key={lang} onClick={handleChange} className='uppercase'>
            <span>{lang}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
