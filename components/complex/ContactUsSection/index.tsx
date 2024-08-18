import GoogleMap from '@/components/simple/GoogleMap';

import { ContactUsBlock } from '@/components/simple';
import { ContactUsForm } from '@/components/forms/ContactUsForm';

import { Title } from '@/components/elements';

import { FC } from 'react';

interface IContactUs {
  data: any;
}

export const ContactUsSection: FC<IContactUs> = async ({ data }) => {
  const { title, map, formFields, locale, submitBtn } = data;

  return (
    <section className='flex w-full flex-col gap-x-6 p-6 lg:flex-row'>
      {map && map.coordinates && (
        <div className='order-2 flex h-96 w-full lg:order-1 lg:h-screen lg:flex-1'>
          <GoogleMap center={map.coordinates} />
        </div>
      )}
      <div className='order-1 flex flex-1 flex-col lg:order-2'>
        <Title level='1' variant='heading' className='text-center'>
          {title}
        </Title>
        <div className='flex w-full flex-col lg:gap-x-16 xl:gap-x-36'>
          <ContactUsForm data={formFields} locale={locale} submit={submitBtn} />
          <ContactUsBlock locale={locale} address={map?.address} />
        </div>
      </div>
    </section>
  );
};
