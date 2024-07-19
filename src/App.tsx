import React from 'react';
import IntroducePage from './component/Introduce';
import MenuPage from './component/Menu';
import MoviePage from './component/MoviePage';
import TestDesign from './component/TestDesign';


function App() {

  return (
    <>
      <MenuPage />
      <IntroducePage />
      <MoviePage />
      {/* <TestDesign /> */}
    </>
  );
}

export default App;
