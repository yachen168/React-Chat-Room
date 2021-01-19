import * as types from './constant';

export const joinRoom = data => ({type: types.JOIN_ROOM, data});
export const exitRoom = data => ({type: types.EXIT_ROOM, data});

export const sendMessage = data => ({type: types.SEND_MESSAGE, data});
export const receiveMessage = data => ({type: types.RECEIVE_MESSAGE, data});
export const sendImage = data => ({type: types.SEND_IMAGE, data});
export const receiveImage = data => ({type: types.RECEIVE_IMAGE, data});