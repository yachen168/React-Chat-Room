import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const ModeOption = ({ option, onClick }) => {
  return (
    <h2 className="mode_option" onClick={onClick}>
      {option}
    </h2>
  );
};

ModeOption.propTypes = {
  option: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ModeOption;
