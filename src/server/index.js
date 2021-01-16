const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { addUser, removeUser, getUsersInRoom, getExistRooms } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../../build'))

io.on('connect', (socket) => {
  console.log('用戶已連接');

  socket.on('joinRoom', ({ userInfo, roomInfo }) => {
    const userInfoWithSocketId = {...userInfo, id: socket.id};
    const { usersInLobby, usersInNormal } = addUser({ userInfo: userInfoWithSocketId, roomInfo });
    
    socket.userInfo = userInfoWithSocketId;
    socket.roomInfo = roomInfo

    socket.join(roomInfo.room);
    io.to(roomInfo.room).emit('receiveMessage', {userInfo: userInfoWithSocketId, isSystemMessage: true, message: `${userInfo.username} 加入聊天室`});
    io.to(socket.id).emit('receiveUserInfoWithSocketId', userInfoWithSocketId);

    if (roomInfo.mode === 'lobby'){
      io.to(roomInfo.room).emit('receiveUserList', {userList: usersInLobby});
    } else {
      io.to(roomInfo.room).emit('receiveUserList', {userList: usersInNormal});
    }
  });

  socket.on('getExistRoomList', () => {
    const existRooms = getExistRooms();
    const usersInRoom = getUsersInRoom();

    io.to(socket.id).emit('receiveExistRoomList', { existRooms, usersInRoom });
  })

  socket.on('sendMessage', ({userInfo, roomInfo, message}) => {
    io.to(roomInfo.room).emit('receiveMessage', { userInfo, isSystemMessage: false, message });
  })
  

  socket.on('sendImage', ({userInfo, roomInfo, message}) => {
    io.to(roomInfo.room).emit('receiveImage', { userInfo, isSystemMessage: false, message });
  })

  socket.on('exitRoom', ({userInfo, roomInfo}) => {
    const userList = removeUser(userInfo, roomInfo);

    io.to(roomInfo.room).emit('receiveUserList', {userList});
    io.to(roomInfo.room).emit('receiveMessage', { userInfo, isSystemMessage: true, message: `${userInfo.username} 離開聊天室` });
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
    const { userInfo, roomInfo } = socket;
    const userList = removeUser(userInfo, roomInfo);

    io.to(roomInfo.room).emit('receiveUserList', {userList});
    io.to(roomInfo.room).emit('receiveMessage', { userInfo, isSystemMessage: true, message: `${userInfo.username} 離開聊天室`});

    socket.removeAllListeners();
  })
});



server.listen(PORT, () => console.log(`Server has started.`));