import OrderCard from '@/components/simple/OrderCard';
import React from 'react';

const OrdersSection = ({ orders }: any) => {
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
