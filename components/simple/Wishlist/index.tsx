'use client';

import { FC } from 'react';

import { HeartIcon } from '@/assets/icons';
import { Button } from '@/components/elements';

import { cn } from '@/lib';
import addToWishlist from '@/services/actions/addToWishlist';
import { toast } from 'sonner';
import { Session } from 'next-auth';

interface IWishlist {
  session: Session;
  productId: number;
  locale: string;
  inWishlist: boolean;
  text?: string;
}

export const Wishlist: FC<IWishlist> = ({ productId, text, locale, inWishlist = false, session }) => {
  const handleAdd = async () => {
    if (!Boolean(session?.accessToken)) {
      const dialog = document.getElementById('my_modal_3') as HTMLDialogElement;

      dialog.showModal();
    } else {
      const { message } = await addToWishlist({
        locale,
        productId,
        userId: Number(session.user.id),
        access_token: session.accessToken
      });

      if (message) {
        toast.success(message);
      }
    }
  };

  const setColor = (added: boolean) => {
    if (text) {
      return added ? 'fill-red-600' : 'fill-base-100';
    }

    return added ? 'fill-red-600' : 'fill-base-300';
  };

  return (
    <Button
      onClick={handleAdd}
      className={cn(text && 'btn btn-block !bg-base-200 !text-base-100')}
      title='wishlist'
      aria-label='wishlist'
      icon={{
        before: text ? null : <HeartIcon width={20} height={20} className={cn('h-5 w-5', setColor(inWishlist))} />
      }}
    >
      {text && text}
    </Button>
  );
};
