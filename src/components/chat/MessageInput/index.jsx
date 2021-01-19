import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Picker from 'emoji-picker-react';

import emojiIcon from '../../../images/smile_icon.png';
import pictureIcon from '../../../images/picture_icon.png';
import sendIcon from '../../../images/send_icon.png';

import './index.scss';

const MessageInput = ({ setMessage, sendMessage, message, uploadImage }) => {
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    const input = document.querySelector('.message_input');
    
    setIsShowEmojiPicker(false);
    setMessage(`${message}${emojiObject.emoji}`);
    input.focus();
  };

  return (
    <div className="message_box_footer">
      <div className="icons">
        {isShowEmojiPicker ? <Picker onEmojiClick={onEmojiClick} /> : null}
        <div
          className="emoji"
          onClick={() => setIsShowEmojiPicker(!isShowEmojiPicker)}
        >
          <img src={emojiIcon} alt="emoji" />
        </div>
        <div className="upload_img">
          <input type="file" accept="image/x-png" onChange={uploadImage} />
          <img src={pictureIcon} alt="upload" />
        </div>
      </div>
      <input
        type="text"
        className="message_input"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <button
        type="submit"
        className="send_button"
        onClick={(e) => sendMessage(e)}
      >
        <img src={sendIcon} alt="send" />
      </button>
    </div>
  );
};

MessageInput.propTypes = {
  setMessage: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default MessageInput;
