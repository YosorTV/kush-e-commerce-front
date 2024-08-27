'use client';

import { FC } from 'react';

import { HeartIcon } from '@/assets/icons';
import { Button } from '@/components/elements';

import { cn } from '@/lib';
import addToWishlist from '@/services/actions/addToWishlist';
import { toast } from 'sonner';

interface IWishlist {
  token: string | null;
  userId?: number;
  productId: number;
  locale: string;
  inWishlist: boolean;
}

const Wishlist: FC<IWishlist> = async ({ productId, userId, locale, inWishlist = false, token }) => {
  const handleAdd = async () => {
    if (!Boolean(token)) {
      const dialog = document.getElementById('my_modal_3') as HTMLDialogElement;

      dialog.showModal();
    } else {
      const { message } = await addToWishlist({ access_token: token, productId, userId, locale });

      if (message) {
        toast.success(message);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleAdd}
        title='wishlist'
        aria-label='wishlist'
        icon={{
          before: (
            <HeartIcon width={20} height={20} className={cn('h-5 w-5', inWishlist ? 'fill-red-600' : 'fill-white')} />
          )
        }}
      />
    </>
  );
};

export default Wishlist;
