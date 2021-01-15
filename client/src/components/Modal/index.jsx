import React from 'react';

import './index.scss';

const Modal = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal_box">{children}</div>
    </div>
  );
};

export default Modal;
