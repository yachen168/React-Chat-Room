import React from 'react';

import './index.scss';

const RoleCard = ({ image, isActive, onClick }) => {
  return (
    <div className={`role_card ${isActive ? 'active' : ''}`} onClick={onClick}>
      <img src={image} alt="role" />
    </div>
  );
};

export default RoleCard;
