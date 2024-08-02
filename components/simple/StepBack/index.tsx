import React from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { Button } from '@/components/elements';

export const StepBack = () => {
  return (
    <Button
      icon={{ before: <IoArrowBack className='h-6 w-6 fill-base-200' /> }}
    >
      Step Back
    </Button>
  );
};
