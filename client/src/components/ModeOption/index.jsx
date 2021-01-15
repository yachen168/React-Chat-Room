import React from 'react';

import './index.scss';

const ModeOption = ({ option, onClick }) => {
  return (
    <h2 className="mode_option" onClick={onClick}>
      {option}
    </h2>
  );
};

export default ModeOption;
