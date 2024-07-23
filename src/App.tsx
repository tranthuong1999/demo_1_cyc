import React from 'react';
import IntroducePage from './component/Introduce';
import MenuPage from './component/Menu';
import MoviePage from './component/MoviePage';
import SystemCinema from './component/SystemCinema';
import ReviewPage from './component/Review';
import { FooterPage } from './component/Footer';
import { useTheme } from "@mui/material/styles";
import { Button, useMediaQuery } from "@mui/material";
// @ts-ignore
import { Element } from 'react-scroll';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './component/Register';
import LoginPage from './component/Login';
import PurchasePage from './component/Purchase';
import DownloadApp from './component/DonwloadApp';
import BookTicketPage from './component/BookTicket';
import HistoryTickerPage from './component/HistoryTicket';

const MainLayout = () => {
  const theme = useTheme();
  const isComputer = useMediaQuery(theme.breakpoints.up(900));
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  return (
    <>
      <MenuPage />
      {!isMobile && <IntroducePage />}
      <Element name="schedule">
        <MoviePage />
      </Element>
      {isComputer &&
        <Element name="cinemaSystem">
          <SystemCinema />
        </Element>
      }
      <Element name="news">
        <ReviewPage />
      </Element>
      <Element name="app">
        <DownloadApp />
      </Element>
      <FooterPage />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/ticket/:codeMovie" element={<PurchasePage />} />
        <Route path="/book-ticket/:code" element={<BookTicketPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/account" element={<HistoryTickerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
