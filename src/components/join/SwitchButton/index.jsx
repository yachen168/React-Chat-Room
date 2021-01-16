import React from 'react';

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

export default SwitchButton;
