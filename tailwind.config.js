/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors: {
      'base-black': '#000',
      'base-white': '#fff',
      'redis-red': '#ff4438',
      'hyper-04': '#fd736a',
      'hyper-05': '#ff4438',
      'hyper-07': '#e4291e',
      'hyper-09': '#8a221c',
      'hyper-10': '#351d22',
      'black-90': '#191919',
      'black-70': '#4c4c4c',
      'black-60': '#6d6e71',
      'black-50': 'grey',
      'black-30': '#b2b2b2',
      'black-10': '#e5e5e5',
      'grey-50': '#f9fafb',
      'grey-20': '#e9e9e9',
      'grey-10': '#fcfcfc',
      'light-gray': '#f8f8f8',
      'midnight': '#091a23',
      'dusk': '#163341',
      'dusk-01': '#f3f3f3',
      'dusk-09': '#0d212c',
      'dusk-90': '#2d4754',
      'dusk-70': '#5c707a',
      'dusk-50': '#8a99a0',
      'dusk-30': '#b9c2c6',
      'dusk-10': '#d9d9d9',
      'violet': '#c795e3',
      'violet-90': '#5925e8',
      'violet-50': '#e3caf1',
      'violet-10': '#f9f4fc',
      'sky-blue': '#80dbff',
      'sky-blue-50': '#bfedff',
      'sky-blue-10': '#f2fbff',
      'light-blue': '#f9fdff',
      'yellow': '#dcff1e',
      'yellow-06': '#d0f41d',
      'yellow-08': '#a9ca03',
      'yellow-50': '#f1ffa5',
      'yellow-10': '#fbffe8',
      // Semantic keys
      'primary-button-bg': '#e4291e', // hyper-07
      'primary-button-bg-hover': '#8a221c', // hyper-09
      'primary-button-border': '#e4291e', // hyper-07
      'primary-button-border-hover': '#8a221c', // hyper-09
      'primary-button-fg': '#fff', // base-white
      'primary-button-fg-hover': '#fff', // base-white
      'primary-button-border-active': '#e4291e', // hyper-07
      'primary-button-bg-active': '#e4291e', // hyper-07
      'primary-button-fg-active': '#fff', // base-white
      'secondary-button-bg': 'transparent',
      'secondary-button-bg-hover': 'transparent',
      'secondary-button-border': '#e4291e', // hyper-07
      'secondary-button-border-hover': '#8a221c', // hyper-09
      'secondary-button-fg': '#e4291e', // hyper-07
      'secondary-button-fg-hover': '#8a221c', // hyper-09
      'secondary-button-border-active': '#e4291e', // hyper-07
      'secondary-button-bg-active': 'transparent',
      'secondary-button-fg-active': '#e4291e', // hyper-07
      'tertiary-button-bg': 'transparent',
      'tertiary-button-bg-hover': 'transparent',
      'tertiary-button-fg': '#e4291e', // hyper-07
      'tertiary-button-fg-hover': '#8a221c', // hyper-09
      'tertiary-button-bg-active': 'transparent',
      'tertiary-button-fg-active': '#e4291e', // hyper-07
      'bg-default-hover': '#091a23', // midnight
      // Midnight theme keys
      'bg-default': '#091a23', // midnight
      'bg-muted': '#000', // base-black
      'bg-subtle': '#163341', // dusk
      'fg-tagline': '#b9c2c6', // dusk-30
      'fg-default': '#fff', // base-white
      'fg-body': '#b9c2c6', // dusk-30
      'fg-brand': '#dcff1e', // yellow
      'fg-muted': '#b8c2c6',
      'border': '#163341', // dusk
      'stroke-divider': '#8a99a0', // dusk-50
      'marketo-form-border': '#5c707a', // dusk-70
      'toggle-bg': '#d9d9d91a',
      'toggle-fg': '#e4291e', // hyper-07
      'form-input-bg': '#163341', // dusk
      'form-input-placeholder': '#8a99a0', // dusk-50
      'form-input-fg': '#d9d9d9', // dusk-10
      'form-input-border': '#2d4754', // dusk-90
      'form-input-focused-border': '#5c707a', // dusk-70
    },
    },
  plugins: [],
}