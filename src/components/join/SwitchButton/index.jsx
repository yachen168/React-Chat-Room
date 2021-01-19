import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const SwitchButton = ({ buttonText, isActive, onClick }) => {
  return (
    <button
      className={`switch_button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

SwitchButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SwitchButton;
