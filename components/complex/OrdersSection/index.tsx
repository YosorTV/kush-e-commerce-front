import React from 'react';
import OrderCard from '@/components/simple/OrderCard';
import lottieAnim from '@/public/LottieEmplyList.json';
import { Lottie } from '@/components/elements/Lottie';

const OrdersSection = ({ orders, emptyTitle = 'Не знайдено' }: any) => {
  if (!orders.length) {
    return <Lottie text={emptyTitle} src={lottieAnim} className='relative top-20' playerClassName='h-96 w-96' />;
  }

  const printOrder = (order: any) =>
    order.products.map((el: any) => {
      return (
        <OrderCard
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

  return <section className='mx-4 mt-8 flex flex-col gap-y-5'>{orders.map(printOrder)}</section>;
};

export default OrdersSection;
