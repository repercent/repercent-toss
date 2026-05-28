const breakpoints = {
  desktop: 1000,
};

const media = {
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
};

const theme = {
  primary: {
    700: '#004EDB',
    10: '#F4F8FF',
  },
  secondary: {
    700: '#269BFF',
    50: '#DEF1FF',
  },
  gray: {
    900: '#111828',
    800: '#202938',
    700: '#384152',
    600: '#4C5564',
    500: '#6B7380',
    400: '#9CA2AE',
    300: '#D1D4DB',
    200: '#E6E7EB',
    100: '#F3F4F6',
    50: '#F9FAFC',
  },
  red: {
    600: '#F00',
  },
  pink: {
    500: '#FF1951',
    400: '#FF4772',
    200: '#FF7696',
    100: '#FF9EB5',
    50: '#FFEBEF',
  },
  breakpoints,
  media,
};

export default theme;
