import React from 'react';

import emojiIcon from '../../images/smile_icon.png';
import pictureIcon from '../../images/picture_icon.png';
import sendIcon from '../../images/send_icon.png';

import './index.scss';

const MessageInput = ({ setMessage, sendMessage, message }) => (
  <div className="message_box_footer">
    <div className="icons">
      <div className="emoji">
        <img src={emojiIcon} alt="emoji" />
      </div>
      <div className="upload_img">
        <input type="file" />
        <img src={pictureIcon} alt="upload" />
      </div>
    </div>
    <input
      type="text"
      className="message_input"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
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

export default MessageInput;
