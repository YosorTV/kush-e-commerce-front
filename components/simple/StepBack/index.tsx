'use client';

import { IoArrowBack } from 'react-icons/io5';
import { useTranslations } from 'use-intl';
import { useRouter } from '@/lib/navigation';

import { Button } from '@/components/elements';
import { FC } from 'react';

interface IStepBack {
  className?: string;
}

export const StepBack: FC<IStepBack> = ({ className }) => {
  const router = useRouter();
  const t = useTranslations('system');

  const handleBack = () => router.back();

  return (
    <Button
      onClick={handleBack}
      className={className}
      icon={{ before: <IoArrowBack className='h-6 w-6 fill-base-200' /> }}
    >
      {t('stepBack')}
    </Button>
  );
};
