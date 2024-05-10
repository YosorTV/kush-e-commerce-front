'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@/assets/icons';

export const ThemeChanger = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handleTheme = () => {
    const theme = resolvedTheme === 'light' ? 'sunset' : 'light';

    setTheme(theme);
  };

  return (
    <label className='swap swap-rotate'>
      <input
        type='checkbox'
        value='synthwave'
        onClick={handleTheme}
        className='theme-controller'
        defaultChecked={resolvedTheme === 'light'}
      />
      <SunIcon className='swap-on fill-base-200' />
      <MoonIcon className='swap-off fill-base-200' />
    </label>
  );
};
