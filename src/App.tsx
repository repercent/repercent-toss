import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globalstyles';
import theme from './styles/theme';

// components
import Home from './components/Home/Home';
import StepContainer from './container/StepContainer';
import PurchaseMultiComponent from './components/Multi/MultiComponent';
import GradeContainer from './container/GradeContainer';
import PickupTypeSelect from './components/Pickup/PickupTypeSelect';
import KitComponent from './components/Pickup/KitComponent';
import CsvComponent from './components/Pickup/CsvComponent';
import AgreementComponent from './components/Agreement/AgreementComponent';

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
          <Route path="/agreement" element={<AgreementComponent />} />
          <Route path="/csv" element={<CsvComponent />} />
          <Route path="/kit" element={<KitComponent />} />
          <Route path="/pickup" element={<PickupTypeSelect />} />
          <Route path="/grade" element={<GradeContainer />} />
          <Route path="/multi" element={<PurchaseMultiComponent />} />
          <Route path="/step" element={<StepContainer />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
