import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import brownDogImage from '../../images/dog-1.png';
import blackDogImage from '../../images/dog-2.png';
import blackWhiteDogImage from '../../images/dog-3.png';
import brownWhiteDogImage from '../../images/dog-4.png';
import brownCatImage from '../../images/cat-1.png';
import blackWhiteCatImage from '../../images/cat-2.png';
import orangeCatImage from '../../images/cat-3.png';
import blackCatImage from '../../images/cat-4.png';

import brownDogAvatar from '../../images/small/dog-1.png';
import blackDogAvatar from '../../images/small/dog-2.png';
import blackWhiteDogAvatar from '../../images/small/dog-3.png';
import brownWhiteDogAvatar from '../../images/small/dog-4.png';
import brownCatAvatar from '../../images/small/cat-1.png';
import blackWhiteCatAvatar from '../../images/small/cat-2.png';
import orangeCatAvatar from '../../images/small/cat-3.png';
import blackCatAvatar from '../../images/small/cat-4.png';

import './index.scss';

import SwitchButton from '../join/SwitchButton';
import RoleCard from '../join/RoleCard';

const roles = {
  cats: [brownCatImage, blackWhiteCatImage, orangeCatImage, blackCatImage],
  dogs: [brownDogImage, blackDogImage, blackWhiteDogImage, brownWhiteDogImage],
};

const avatars = {
  cats: [brownCatAvatar, blackWhiteCatAvatar, orangeCatAvatar, blackCatAvatar],
  dogs: [
    brownDogAvatar,
    blackDogAvatar,
    blackWhiteDogAvatar,
    brownWhiteDogAvatar,
  ],
};

const setLocalStorage = (userInfo) => {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

const SettingCard = () => {
  const [roleType, setRoleType] = useState('dogs');
  const [roleIndex, setRoleIndex] = useState(0);
  const [username, setUsername] = useState('');

  const chooseRole = (i) => {
    return () => {
      setRoleIndex(i);
    };
  };

  const submitHandler = (e) => {
    if (username) {
      setLocalStorage({
        username,
        avatar: avatars[roleType][roleIndex],
      });
    } else {
      e.preventDefault();
    }
  };

  return (
    <form className="setting_card" onSubmit={(e) => e.preventDefault()}>
      <div className="buttons">
        <SwitchButton
          buttonText="狗狗"
          isActive={roleType === 'dogs'}
          onClick={() => setRoleType('dogs')}
        />
        <SwitchButton
          buttonText="貓貓"
          isActive={roleType === 'cats'}
          onClick={() => setRoleType('cats')}
        />
      </div>
      <div className="setting_card_main">
        <h2 className="welcome">WELCOME</h2>
        <h1 className="brand">阿貓阿狗聊天室</h1>
        <img className="role" src={roles[roleType][roleIndex]} alt="role" />
        <input
          className="input_username"
          type="text"
          placeholder="輸入暱稱"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Link onClick={submitHandler} to={`/mode`} className="button_enter">
          進入聊天
        </Link>
      </div>
      <div>
        {roles[roleType].map((item, i) => {
          return (
            <RoleCard
              key={i}
              image={item}
              isActive={item === roles[roleType][roleIndex]}
              onClick={chooseRole(i)}
            />
          );
        })}
      </div>
    </form>
  );
};

export default SettingCard;
