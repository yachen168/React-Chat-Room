import React from 'react';

import UsersIcon from '../../../images/users.png';
import './index.scss';

const RoomCard = ({ roomName, SumOfUsers, onClick }) => {
  return (
    <div className="room_card" onClick={onClick}>
      <h2 className="room_name"># {roomName}</h2>
      <h3 className="sum_users">
        <img className="sum_users_icon" src={UsersIcon} alt="users" />
        <span>目前 {SumOfUsers} 人</span>
      </h3>
    </div>
  );
};

export default RoomCard;
