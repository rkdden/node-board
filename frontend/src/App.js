import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import MainPage from './pages/MainPage';

const App = () => {
  return (
    <>
      <BrowserRouter>
          <Route component={MainPage} path="/" />
      </BrowserRouter>
    </>
  );
}

export default App;

