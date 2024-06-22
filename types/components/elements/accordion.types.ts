import { ReactNode } from 'react';

export type TAccordionItem = {
  title: string;
  component: ReactNode;
};

export interface IAccordion {
  data: TAccordionItem[];
}
