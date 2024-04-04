import * as Zod from 'zod';

export interface FormProps<T> {
  children: any;
  state?: Partial<T> | null;
  className?: string;
  schema?: Zod.ZodObject<any>;
  onSubmit?: () => void;
  action?: any;
  method?: any;
  id?: string;
}
