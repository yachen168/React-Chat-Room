import React from 'react';

import './index.scss';

const ModeOption = ({ option, isActive, onClick }) => {
  return (
    <h2 className={`mode_option ${isActive ? 'active' : ''}`} onClick={onClick}>
      {option}
    </h2>
  );
};

export default ModeOption;
