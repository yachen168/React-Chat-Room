import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const RoleCard = ({ image, isActive, onClick }) => {
  return (
    <div className={`role_card ${isActive ? 'active' : ''}`} onClick={onClick}>
      <img src={image} alt="role" />
    </div>
  );
};

RoleCard.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default RoleCard;
