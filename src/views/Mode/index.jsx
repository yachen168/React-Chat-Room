import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import closeIcon from '../../images/close.svg';

import './index.scss';

import ModeOption from '../../components/Mode/ModeOption';
import Modal from '../../components/Modal';
import RoomSettings from '../../components/Mode/RoomSettings';
import RoomCard from '../../components/Mode/RoomCard';


const Mode = ({socket}) => {
  let history = useHistory();
  
  const [mode, setMode] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [isRoomSettingsModalShow, setIsRoomSettingsModalShow] = useState(false);
  const [isRoomsModalShow, setIsRoomsModalShow] = useState(false);
  const [existRoomList, setExistRoomList] = useState([]);
  const [usersInRoom, setUsersInRoom] = useState({});

  useEffect(() => {
    socket.emit('getExistRoomList');

    socket.on('receiveExistRoomList', ({ existRooms, usersInRoom }) => {
      setExistRoomList(existRooms);
      setUsersInRoom(usersInRoom);
    });
  }, []);

  const chooseMode = (mode) => {
    return () => {
      setMode(mode);
      history.push(`/chat?mode=${mode}&room=${mode}`);
    };
  };

  const joinExistRoomHandler = () => {
    setIsRoomsModalShow(true);
  };

  const createNewRoom = () => {
    setNewRoomName('');

    if (newRoomName in usersInRoom) {
      alert('該名稱房間已存在');
    } else {
      history.push(`/chat?mode=${mode}&room=${newRoomName}`);
    }
  };

  const enterExistRoom = (roomInfo) => {
    return () => {
      history.push(`/chat?mode=${roomInfo.mode}&room=${roomInfo.room}`);
    }
  }

  return (
    <main>
      <h1 className="mode_page_title">選擇聊天室模式</h1>
      <div className="mode">
        <ModeOption
          option="大廳模式"
          isActive={mode === 'lobby'}
          onClick={chooseMode('lobby')}
        />
        <ModeOption
          option="加入房間"
          isActive={mode === 'normal'}
          onClick={joinExistRoomHandler}
        />
        <ModeOption
          option="創建房間"
          isActive={mode === 'newRoom'}
          onClick={() => {
            setIsRoomSettingsModalShow(true);
            setMode('normal');
          }}
        />
      </div>
      {isRoomsModalShow ? (
        <Modal>
          {existRoomList.length > 0
            ? existRoomList.map((item, i) => {
                return (
                  <RoomCard
                    key={i}
                    roomInfo={item.roomInfo}
                    usersInRoom={usersInRoom[item.roomInfo.room]}
                    onClick={enterExistRoom(item.roomInfo)}
                  />
                );
              })
            : '目前無任何房間，建立一個吧!'}
          <img
            src={closeIcon}
            className="close_button"
            onClick={() => setIsRoomsModalShow(false)}
          />
        </Modal>
      ) : null}
      {isRoomSettingsModalShow ? (
        <Modal>
          <RoomSettings
            newRoomName={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            confirmHandler={createNewRoom}
            cancelHandler={() => {
              setNewRoomName('');
              setIsRoomSettingsModalShow(false);
            }}
          />
        </Modal>
      ) : null}
    </main>
  );
};

export default Mode;
