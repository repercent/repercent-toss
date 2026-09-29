import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// styles
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/globalstyles';
import theme from './styles/theme';

// components
import ToastProvider from './components/Common/ToastProvider';
import HomeContainer from './container/HomeContainer';
import ServiceComponent from './components/Service/ServiceComponent';
import StepContainer from './container/StepContainer';
import PurchaseMultiComponent from './components/Multi/MultiComponent';
import GradeContainer from './container/GradeContainer';
import PickupTypeSelect from './components/Pickup/PickupTypeSelect';
import KitComponent from './components/Pickup/KitComponent';
import CsvComponent from './components/Pickup/CsvComponent';
import Address from './components/Pickup/Address';
import AgreementComponent from './components/Agreement/AgreementComponent';
import LogoutGuideComponent from './components/Agreement/LogoutGuideComponent';
import CompleteComponent from './components/Complete/CompleteComponent';
import HistoryContainer from './container/HistoryContainer';
import HistoryDetailContainer from './container/HistoryDetailContainer';
import CancelContainer from './container/CancelContainer';
import AccountContainer from './container/AccountContainer';

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
        <ToastProvider>
          <Routes>
            <Route path="/history/:purchaseId/account" element={<AccountContainer />} />
            <Route path="/history/:purchaseId/cancel" element={<CancelContainer />} />
            <Route path="/history/:purchaseId" element={<HistoryDetailContainer />} />
            <Route path="/history" element={<HistoryContainer />} />
            <Route path="/complete" element={<CompleteComponent />} />
            <Route path="/logout-guide" element={<LogoutGuideComponent />} />
            <Route path="/agreement" element={<AgreementComponent />} />
            <Route path="/address" element={<Address />} />
            <Route path="/csv" element={<CsvComponent />} />
            <Route path="/kit" element={<KitComponent />} />
            <Route path="/pickup" element={<PickupTypeSelect />} />
            <Route path="/grade" element={<GradeContainer />} />
            <Route path="/multi" element={<PurchaseMultiComponent />} />
            <Route path="/step" element={<StepContainer />} />
            <Route path="/service" element={<ServiceComponent />} />
            <Route path="/" element={<HomeContainer />} />
          </Routes>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
