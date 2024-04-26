/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    minWidth: {
      btn: 240,
    },
    extend: {
      scrollbar: {
        width: '12px',
        trackColor: 'white',
        thumbColor: 'black',
        thumbHoverColor: '#333',
        cornerColor: 'white',
      },
      gridTemplateColumns: {
        hero: 'auto 1fr',
        fluid: 'repeat(auto-fit, minmax(20rem, 1fr))',
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#41A139',
          secondary: '#f6d860',
          neutral: '#747474',
          'base-100': '#ECECEC',
          'base-200': '#3B3B3B',
          'base-300': '#0A0A0A',
        },
      },
      {
        sunset: {
          primary: '#41A139',
          secondary: '#f6d860',
          neutral: '#747474',
          'base-100': '#202020',
          'base-200': '#CECECE',
          'base-300': '#0A0A0A',
        },
      },
    ],
    themeRoot: ':root',
    styled: true,
    base: true,
    utils: true,
    prefix: '',
  },
};
