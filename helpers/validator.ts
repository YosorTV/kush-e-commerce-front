import { IDeliveryForm } from '@/types/store';

export const isFormIncomplete = (data: IDeliveryForm) => {
  const { firstName, lastName, email, phone, self, novapostCity, novapostWarehouse } = data;

  if (self) {
    return !firstName || !lastName || !email || !phone;
  }

  return !firstName || !lastName || !email || !phone || !novapostCity?.value || !novapostWarehouse?.value;
};
