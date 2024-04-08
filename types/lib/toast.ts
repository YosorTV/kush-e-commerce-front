export type ToastKeys = 'success' | 'error' | 'info' | 'warning';

export type ToasterProps = {
  key: ToastKeys;
  message: string;
  description?: string;
};

export type ToastFunction = (message: string, description: string) => void;

export type ToastResponse = {
  [key in ToastKeys]: ToastFunction;
};
