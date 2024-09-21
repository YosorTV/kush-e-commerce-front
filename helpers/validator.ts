import { IDeliveryForm } from '@/types/store';

export const isFormIncomplete = (data: IDeliveryForm): boolean => {
  const { firstName, lastName, email, phone, self, novapostCity, novapostWarehouse } = data;

  const isBasicInfoIncomplete = !firstName || !lastName || !email || !phone;

  if (self) {
    return isBasicInfoIncomplete;
  }

  return isBasicInfoIncomplete || !novapostCity?.value || !novapostWarehouse?.value;
};
