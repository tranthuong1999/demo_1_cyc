import React from 'react';
import IntroducePage from './component/Introduce';
import MenuPage from './component/Menu';
import MoviePage from './component/MoviePage';
import TestDesign from './component/TestDesign';
import SystemCinema from './component/SystemCinema';
import ReviewPage from './component/Review';
import DownloadApp from './component/DonwloadApp';
import { FooterPage } from './component/Footer';
import { useTheme } from "@mui/material/styles";
import { Button, useMediaQuery } from "@mui/material";
// @ts-ignore
import { Element } from 'react-scroll';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterPage from './component/Register';
import LoginPage from './component/Login';

function App() {

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
      <Router>
        <Routes>
          <Route path="/sign-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
