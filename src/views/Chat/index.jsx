import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import queryString from 'query-string';

import io from 'socket.io-client';

import './index.scss';

import Sidebar from '../../components/chat/Sidebar';
import MessagesBox from '../../components/chat/MessagesBox';

// let socket;

// const ENDPOINT = 'http://localhost:3000';

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
};

const Chat = ({ socket }) => {
  let history = useHistory();
  const location = useLocation();
  console.log(socket, location)

  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState('');
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [userList, setUserList] = useState([]);

  const { mode, room } = queryString.parse(location.search);

  useEffect(() => {
    // socket = io(ENDPOINT);
    setUserInfo(getLocalStorage());

    socket.emit('joinRoom', {
      userInfo: { ...getLocalStorage() },
      roomInfo: { mode, room },
    });
  }, []);

  useEffect(() => {
    socket.on('receiveMessage', ({ userInfo, isSystemMessage, message }) => {
      setMessagesInfo((messagesInfo) => [
        ...messagesInfo,
        { ...userInfo, isSystemMessage, message },
      ]);
    });

    socket.on('receiveUserList', ({ userList }) => {
      setUserList(userList);
    });

    socket.on('receiveImage', ({ userInfo, isSystemMessage, message }) => {
      setMessagesInfo((messagesInfo) => [
        ...messagesInfo,
        { ...userInfo, isSystemMessage, message },
      ]);
    });

    socket.on('receiveUserInfoWithSocketId', (userInfo) => {
      setUserInfo(userInfo);
    })
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit('sendMessage', {
        userInfo,
        roomInfo: { mode, room },
        message: {
          type: 'text',
          content: message,
          time: new Date().toLocaleTimeString(),
        },
      });
      setMessage('');
    }
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      socket.emit('sendImage', {
        userInfo,
        roomInfo: { mode, room },
        message: {
          type: 'image',
          content: reader.result, // base64
          time: new Date().toLocaleTimeString(),
        },
      });
    };
  };

  const exitRoom = () => {
    history.push('/mode');
    socket.emit('exitRoom', { userInfo, roomInfo: { mode, room } });
  };

  return (
    <main className="chatroom">
      <Sidebar
        userInfo={userInfo}
        room={room}
        userList={userList}
        exitRoom={exitRoom}
      />
      <MessagesBox
        userInfo={userInfo}
        message={message}
        setMessage={setMessage}
        messagesInfo={messagesInfo}
        sendMessage={sendMessage}
        uploadImage={uploadImage}
      />
    </main>
  );
};

export default Chat;
