import { createGlobalStyle } from 'styled-components';
import Reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
${Reset}
  * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto,
    'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR',
    'Malgun Gothic', sans-serif;
    font-weight: 400;
    font-size: 14px;
    max-width: 720px;
    min-width: 320px;
    margin: 0 auto;
    color: #111828;
    line-height: 21px;
    letter-spacing: -0.14px;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    background: transparent;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px; 
    letter-spacing: -0.16px;
    color: #fff;
    cursor: pointer;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
  }

  ol, ul, li {
    list-style: none;
  }

  select, option {
    background: transparent;
    appearance:none;
    font-size: 15px;
    -webkit-appearance:none; /* for chrome */
    -moz-appearance:none; /*for firefox*/
  }

  a, button, input, textarea {
    appearance: none;
    outline:none;
    border: none;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    -webkit-tap-highlight-color: transparent;

    &:disabled {
      cursor: default;
    }
  }
`;

export default GlobalStyles;
