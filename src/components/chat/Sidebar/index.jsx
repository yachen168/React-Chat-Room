import React from 'react';

import './index.scss';

const Sidebar = ({ userInfo, room, userList, exitRoom, onLoad }) => {
  return (
    <div className="sidebar">
      <div className="user_info">
        <img 
          className="avatar" 
          src={userInfo.avatar} 
          onLoad={onLoad}
          alt="avatar" />
        <h2 className="username">{userInfo.username}</h2>
      </div>
      <div className="this_room_info">
        <h2>
          {room}聊天室 ({userList.length} 人)
        </h2>
        <ul>
          {userList.map((user) => {
            return (
              <li key={user.id} className="user">
                <img src={user.userInfo.avatar} alt="" />
                <span>{user.userInfo.username}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="exit_button" onClick={exitRoom}>
        退出該聊天室
      </div>
    </div>
  );
};

export default Sidebar;
