import { RuleCard } from '@/components/simple/RuleCard';
import { getDeliveryData } from '@/services/api/get-delivery';
import React, { FC } from 'react';

interface IDeliveryRules {
  locale: string;
}

export const DeliveryRules: FC<IDeliveryRules> = async ({ locale = 'uk' }) => {
  const { data } = await getDeliveryData({ locale });

  const printRule = (rule: any) => (
    <RuleCard key={rule.id} icon={rule.icon} title={rule.title} description={rule.description} />
  );

  return (
    <section className='mt-6 flex flex-col gap-y-6 bg-neutral p-6 xl:flex-row'>{data.rules.map(printRule)}</section>
  );
};
