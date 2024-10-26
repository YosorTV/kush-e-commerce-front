'use client';

import { useTranslations } from 'next-intl';

import { Lottie, Title } from '@/components/elements';
import { OrderCardMobile, Price } from '@/components/simple';

import lottieAnim from '@/public/LottieEmplyList.json';

const OrdersSection = ({ orders, emptyTitle = 'Не знайдено' }: any) => {
  const t = useTranslations('order');

  if (!orders.length) {
    return <Lottie text={emptyTitle} src={lottieAnim} className='relative top-20' playerClassName='h-96 w-96' />;
  }

  const printMobileOrder = (order: any) => {
    return (
      <>
        <div className='flex w-full flex-col items-center justify-between md:flex-row'>
          <Title level='3'> {t('order', { number: order.id })}</Title>
          <span className='flex items-baseline gap-x-2.5 whitespace-nowrap'>
            {t('total')} <Price price={parseFloat(order.amount)} currency={1} className='!text-xs' />
          </span>
        </div>

        {order.products.map((el: any) => {
          return (
            <OrderCardMobile
              t={t}
              url={el.url}
              key={el.id}
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
        })}
      </>
    );
  };

  return (
    <section className='flex flex-wrap justify-center gap-5 md:justify-start'>{orders.map(printMobileOrder)}</section>
  );
};

export default OrdersSection;
