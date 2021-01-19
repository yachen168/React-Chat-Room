import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import closeIcon from '../../images/close.svg';

import './index.scss';

import ModeOption from '../../components/Mode/ModeOption';
import RoomSettings from '../../components/Mode/RoomSettings';
import RoomCard from '../../components/Mode/RoomCard';
import Modal from '../../components/common/Modal';


const Mode = ({socket}) => {
  let history = useHistory();

  const [mode, setMode] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [isRoomSettingsModalShow, setIsRoomSettingsModalShow] = useState(false);
  const [isRoomsModalShow, setIsRoomsModalShow] = useState(false);
  const [sumOfUsersInRooms, setSumOfUsersInRooms] = useState({});

  useEffect(() => {
    socket.emit('getExistRoomList');

    socket.on('receiveExistRoomList', ({ sumOfUsersInRooms }) => {
      setSumOfUsersInRooms({...sumOfUsersInRooms});
    });
  }, []);

  const chooseMode = (mode) => {
    return () => {
      setMode(mode);
      history.push(`/chat?mode=${mode}&room=${mode}`);
    };
  };

  const createNewRoom = () => {
    setNewRoomName('');

    if (newRoomName in sumOfUsersInRooms) {
      alert('該名稱房間已存在');
    } else {
      history.push(`/chat?mode=${mode}&room=${newRoomName}`);
    }
  };

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
          onClick={() => setIsRoomsModalShow(true)}
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
          {Object.keys(sumOfUsersInRooms).length > 0
            ? Object.keys(sumOfUsersInRooms).map((room, i) => {
                return (
                  <RoomCard
                    key={i}
                    roomName={room}
                    SumOfUsers={sumOfUsersInRooms[room]}
                    onClick={(room) => () => {
                        history.push(`/chat?mode=normal&room=${room}`);
                      }
                    }
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
