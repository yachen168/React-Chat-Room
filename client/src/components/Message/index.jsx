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
      <div className="sentence">{messageInfo.message}</div>
      <span className="time">20:16</span>
    </div>
  );
};

export default Message;
