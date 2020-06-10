module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./public/**/*.html', './src/**/*.vue'],
  },
  theme: {
    extend: {
      screens: {
        sm: '600px',
        md: '980px',
        lg: '1200px',
        xl: '1600px',
      },
    },
  },
  variants: {},
  plugins: [],
};
