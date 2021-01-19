import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import io from 'socket.io-client';

import Home from './views/Home';
import Chat from './views/Chat';
import Mode from './views/Mode';
import Navbar from './components/common/Navbar';

const ENDPOINT = 'https://yachen-chatroom.herokuapp.com/';
const socket = io(ENDPOINT);

const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/mode" render={() => <Mode socket={socket} />} />
        <Route path="/chat" render={() => <Chat socket={socket} />} />
      </BrowserRouter>
    </>
  );
};

export default App;
