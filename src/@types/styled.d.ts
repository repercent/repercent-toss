import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: {
      700: string;
      10: string;
    };
    secondary: {
      700: string;
      50: string;
    };
    gray: {
      900: string;
      800: string;
      700: string;
      600: string;
      500: string;
      400: string;
      300: string;
      200: string;
      100: string;
      50: string;
    };
    red: {
      600: string;
    };
    pink: {
      500: string;
      400: string;
      200: string;
      100: string;
      50: string;
    };
  }
}
