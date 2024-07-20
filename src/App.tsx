import React from 'react';
import IntroducePage from './component/Introduce';
import MenuPage from './component/Menu';
import MoviePage from './component/MoviePage';
import TestDesign from './component/TestDesign';
import SystemCinema from './component/SystemCinema';
import ReviewPage from './component/Review';
import DownloadApp from './component/DonwloadApp';
import { FooterPage } from './component/Footer';


function App() {

  return (
    <>
      <MenuPage />
      <IntroducePage />
      <MoviePage />
      <SystemCinema />
      <DownloadApp />
      <FooterPage />
      {/* <ReviewPage /> */}
      {/* <TestDesign /> */}
    </>
  );
}

export default App;
