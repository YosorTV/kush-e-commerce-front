type ThemeVariant = 'light' | 'sunset';

export type ThemeState = {
  theme: ThemeVariant;
  setTheme: (value: ThemeVariant) => void;
};
