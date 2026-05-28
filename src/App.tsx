import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import GlobalStyles from './styles/globalstyles';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

// components
import Home from './components/Home';

function App() {
  // 모바일 100vh
  function setScreenSize() {
    // footer 길이 맞춤
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();

    window.addEventListener('resize', setScreenSize);
    return () => window.removeEventListener('resize', setScreenSize);
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
