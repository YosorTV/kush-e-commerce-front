'use client';

import { FC } from 'react';
import { ThemeProvider as ThemeContext } from 'next-themes';

type ThemeProviderProps = { children: React.ReactNode };

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext attribute='class' defaultTheme='system' enableSystem>
      {children}
    </ThemeContext>
  );
};
