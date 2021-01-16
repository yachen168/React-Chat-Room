import React from 'react';

import './index.scss';

const RoomSettings = ({
  newRoomName,
  onChange,
  confirmHandler,
  cancelHandler,
}) => {
  return (
    <div className="room_settings_bg">
      <div className="room_settings">
        <h2 className="title">房間設定</h2>
        <input
          type="text"
          placeholder="請輸入房間名稱"
          value={newRoomName}
          onChange={onChange}
        />
        <button onClick={confirmHandler}>建立房間</button>
        <button onClick={cancelHandler}>取消</button>
      </div>
    </div>
  );
};

export default RoomSettings;
