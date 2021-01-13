import React from 'react';

import Join from './views/Join';
import Chat from './views/Chat';
import Mode from './views/Mode';
import Navbar from './components/Navbar';

import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
        <Route path="/mode" component={Mode} />
      </BrowserRouter>
    </>
  );
};

export default App;
