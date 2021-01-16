import React, { useEffect } from 'react';

import Join from './views/Home';
import Chat from './views/Chat';
import Mode from './views/Mode';
import Navbar from './components/Navbar';

import io from 'socket.io-client';

import { BrowserRouter, Route } from 'react-router-dom';

const ENDPOINT = 'http://localhost:3000';
const socket = io(ENDPOINT);

const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Join} />
        <Route path="/mode" render={() => <Mode socket={socket} />} />
        <Route path="/chat" render={() => <Chat socket={socket} />} />
      </BrowserRouter>
    </>
  );
};

export default App;
