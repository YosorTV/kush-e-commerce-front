'use client';

import { FC } from 'react';
import { ThemeProvider as ThemeContext } from 'next-themes';

type ThemeProviderProps = { children: React.ReactNode };

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext
      enableSystem
      enableColorScheme
      defaultTheme='light'
      attribute='data-theme'
    >
      {children}
    </ThemeContext>
  );
};
