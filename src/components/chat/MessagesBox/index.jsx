import React from 'react';
import PropTypes from 'prop-types';

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

MessagesBox.propTypes = {
  userInfo: PropTypes.object.isRequired,
  message: PropTypes.string.isRequired,
  messagesInfo: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
};

export default MessagesBox;
