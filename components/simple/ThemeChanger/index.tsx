'use client';

import { useTheme } from '@/store';

import { MoonIcon, SunIcon } from '@/assets/icons';

export const ThemeChanger = () => {
  const themeStore = useTheme();

  const handleTheme = () => {
    const theme = themeStore.theme === 'light' ? 'sunset' : 'light';

    themeStore.setTheme(theme);
  };

  return (
    <label className='swap swap-rotate'>
      <input
        type='checkbox'
        value='synthwave'
        onClick={handleTheme}
        className='theme-controller'
        defaultChecked={themeStore.theme === 'light'}
      />
      <SunIcon className='swap-on fill-base-200' />
      <MoonIcon className='swap-off fill-base-200' />
    </label>
  );
};
