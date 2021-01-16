import React from 'react';

import './index.scss';

import Message from '../Message';
import MessageInput from '../MessageInput';

const MessagesBox = ({
  userInfo,
  message,
  messagesInfo,
  setMessage,
  sendMessage,
  uploadImage,
}) => {
  return (
    <div className="messages_box">
      {messagesInfo.map((messageInfo) => {
        return (
          <Message
            key={messageInfo.id}
            userInfo={userInfo}
            messageInfo={messageInfo}
          />
        );
      })}
      <MessageInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        uploadImage={uploadImage}
      />
    </div>
  );
};

export default MessagesBox;
