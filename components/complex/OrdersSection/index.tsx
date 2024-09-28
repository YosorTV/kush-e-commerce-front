'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { OrderCardDesktop, OrderCardMobile } from '@/components/simple';
import { Lottie } from '@/components/elements';

import lottieAnim from '@/public/LottieEmplyList.json';
import { useScreen } from '@/lib/hooks';

const OrdersSection = ({ orders, emptyTitle = 'Не знайдено' }: any) => {
  const t = useTranslations('order');

  const { xl } = useScreen();

  if (!orders.length) {
    return <Lottie text={emptyTitle} src={lottieAnim} className='relative top-20' playerClassName='h-96 w-96' />;
  }

  const printDektopOrder = (order: any) => {
    return order.products.map((el: any) => {
      return (
        <>
          <OrderCardDesktop
            t={t}
            url={el.url}
            key={order.id}
            id={order.id}
            amount={order.amount}
            image={el.images.formats.medium}
            name={el.name}
            price={el.price}
            publishedAt={order.publishedAt}
            quantity={el.quantity}
            status={el.status}
            self_delivery={order.self_delivery}
          />
          <div className='divider my-0' />
        </>
      );
    });
  };

  const printMobileOrder = (order: any) => {
    return order.products.map((el: any) => {
      return (
        <OrderCardMobile
          t={t}
          url={el.url}
          key={order.id}
          id={order.id}
          amount={order.amount}
          image={el.images.formats.medium}
          name={el.name}
          price={el.price}
          publishedAt={order.publishedAt}
          quantity={el.quantity}
          status={el.status}
          self_delivery={order.self_delivery}
        />
      );
    });
  };

  if (xl) {
    return <section className='mx-4 mt-8 flex flex-col gap-y-10'>{orders.map(printDektopOrder)}</section>;
  }

  return <section className='flex flex-wrap justify-center gap-5'>{orders.map(printMobileOrder)}</section>;
};

export default OrdersSection;
