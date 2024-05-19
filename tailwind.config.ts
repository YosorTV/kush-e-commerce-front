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
        fluid: 'repeat(auto-fit, minmax(10rem, 1fr))',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('daisyui'), require('tailwind-scrollbar')],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#41A139',
          secondary: '#f6d860',
          neutral: '#747474',
          'base-100': '#E9E8D5',
          'base-200': '#242424',
        },
      },
      {
        sunset: {
          primary: '#41A139',
          secondary: '#f6d860',
          neutral: '#747474',
          'base-100': '#242424',
          'base-200': '#FFFFFF',
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
