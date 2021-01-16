import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import queryString from 'query-string';

import './index.scss';

import Sidebar from '../../components/chat/Sidebar';
import MessagesBox from '../../components/chat/MessagesBox';

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
};

const Chat = ({ socket }) => {
  let history = useHistory();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState('');
  const [messagesInfo, setMessagesInfo] = useState([]);
  const [userList, setUserList] = useState([]);

  const { mode, room } = queryString.parse(location.search);

  useEffect(() => {
    setUserInfo(getLocalStorage());

    socket.emit('joinRoom', {
      userInfo: { ...getLocalStorage() },
      roomInfo: { mode, room },
    });

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

    return () => {
      console.log('userInfo', userInfo)
      console.log('roomInfo', { mode, room })
      socket.emit('exitRoom', { userInfo, roomInfo: { mode, room } });
    }
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

  return (
    <main className="chatroom">
      <Sidebar
        userInfo={userInfo}
        room={room}
        userList={userList}
        exitRoom={() =>  history.push('/mode')}
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
