export interface FormProps<T> {
  children: React.ReactNode;
  state?: Partial<T> | null;
  className?: string;
  schema?: any;
  onSubmit?: () => void;
  action?: any | Promise<any>;
  method?: string;
  id?: string;
}
