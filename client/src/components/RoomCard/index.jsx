import React from 'react';

import UsersIcon from '../../images/users.png';
import './index.scss';

const RoomCard = ({ roomInfo, usersInRoom }) => {
  return (
    <div className="room_card">
      <h2 className="room_name"># {roomInfo.room}</h2>
      <h3 className="sum_users">
        <img className="sum_users_icon" src={UsersIcon} alt="users" />
        <span>目前 {usersInRoom} 人</span>
      </h3>
    </div>
  );
};

export default RoomCard;
