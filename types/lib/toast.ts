export type ToastKeys = 'success' | 'error' | 'info' | 'warning';

export type ToasterProps = {
  key: ToastKeys;
  message: string;
};

export type ToastFunction = (message: string) => void;

export type ToastResponse = {
  [key in ToastKeys]: ToastFunction;
};
