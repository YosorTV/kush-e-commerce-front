'use client';

import { Button } from '@/components/elements';
import { useCart } from '@/store';
import { DeliveryForm, PeronalCheckoutForm } from '@/components/forms';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { getMe } from '@/services/api/get-me';
import { useTranslations } from 'next-intl';
import { isFormIncomplete } from '@/helpers/validator';
import { useScrollLock } from '@/lib/hooks';

export const CartDelivery = () => {
  const [user, setUser] = useState(null);

  const t = useTranslations();
  const cartStore = useCart();

  const handleBack = () => {
    cartStore.setForm('cart');
    cartStore.resetDelivery();
  };

  useScrollLock(cartStore.isOpen);

  const session = useSession();

  const fetchProfileData = async () => {
    const { data } = await getMe({ token: session.data.accessToken });

    setUser(data);
  };

  useEffect(() => {
    if (session.status === 'authenticated' && !user) {
      fetchProfileData();
    }
  }, [session.status]);

  return (
    <div className='form-control w-full px-5'>
      <Button onClick={handleBack} className='btn btn-link justify-start px-0 text-lg normal-case'>
        {t('system.stepBack')}
      </Button>
      <div className='form-control gap-y-2.5 py-10'>
        <PeronalCheckoutForm data={user} title={t('cart.personal')} />
        <div className='divider mb-2.5' />
        <DeliveryForm data={user} title={t('cart.delivery')} />
        <div className='divider' />
        <button
          disabled={isFormIncomplete(cartStore.delivery)}
          onClick={() => cartStore.setForm('checkout')}
          className='btn btn-primary w-full text-base-100 disabled:opacity-50'
        >
          {t('checkout.payments')}
        </button>
      </div>
    </div>
  );
};
