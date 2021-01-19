import React from 'react';
import PropTypes from 'prop-types';

import UsersIcon from '../../../images/users.png';
import './index.scss';

const RoomCard = ({ roomName, sumOfUsers, onClick }) => {
  return (
    <div className="room_card" onClick={onClick}>
      <h2 className="room_name"># {roomName}</h2>
      <h3 className="sum_users">
        <img className="sum_users_icon" src={UsersIcon} alt="users" />
        <span>目前 {sumOfUsers} 人</span>
      </h3>
    </div>
  );
};

RoomCard.propTypes = {
  roomName: PropTypes.string.isRequired,
  sumOfUsers: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RoomCard;
