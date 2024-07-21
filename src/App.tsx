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

function App() {

  const theme = useTheme();
  const isComputer = useMediaQuery(theme.breakpoints.up(1024));
  const isMobile = useMediaQuery(theme.breakpoints.down(600));

  return (
    <>
      <MenuPage />
      {!isMobile && <IntroducePage />}
      <MoviePage />
      {isComputer && <SystemCinema />}
      <ReviewPage />
      <DownloadApp />
      <FooterPage />
    </>
  );
}

export default App;
