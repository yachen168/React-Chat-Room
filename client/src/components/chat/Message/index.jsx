import React from 'react';

import './index.scss';

const Message = ({ userInfo, messageInfo }) => {
  return messageInfo.isSystemMessage ? (
    <div className="system_message">{messageInfo.message}</div>
  ) : (
    <div
      className={`message ${
        userInfo.username === messageInfo.username ? 'self' : ''
      }`}
    >
      <div className="user">
        <img className="avatar" src={messageInfo.avatar} alt="" />
        <h4 className="username">{messageInfo.username}</h4>
      </div>
      <div className="sentence">
        {messageInfo.message.type === 'text' ? (
          messageInfo.message.content
        ) : (
          <img src={messageInfo.message.content} alt="image" />
        )}
      </div>
      <span className="time">{messageInfo.message.time}</span>
    </div>
  );
};

export default Message;
