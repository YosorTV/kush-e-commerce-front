'use client';

import { useTheme } from '@/store';

import { MoonIcon, SunIcon } from '@/assets/icons';

export const ThemeChanger = () => {
  const themeStore = useTheme();

  const handleTheme = () => {
    if (themeStore.theme === 'light') {
      themeStore.setTheme('sunset');
    } else {
      themeStore.setTheme('light');
    }
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
