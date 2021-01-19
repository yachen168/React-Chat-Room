const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { addUser, removeUser, getSumOfUsersInExistRooms, getExistRoomsInfo } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../../build'));
app.set('port', PORT);

io.on('connect', (socket) => {
  let objUserInfo;
  let objRoomInfo;

  socket.on('joinRoom', ({ userInfo, roomInfo }) => {
    const userInfoWithSocketId = {...userInfo, id: socket.id};
    const { usersInLobby, usersInNormal } = addUser({ userInfo: userInfoWithSocketId, roomInfo });

    objUserInfo = userInfo;
    objRoomInfo = roomInfo;

    socket.join(roomInfo.room);

    io.to(roomInfo.room).emit('receiveMessage', {userInfo: userInfoWithSocketId, isSystemMessage: true, message: `${userInfo.username} 加入聊天室`});
    io.to(socket.id).emit('receiveUserInfoWithSocketId', userInfoWithSocketId);

    if (roomInfo.mode === 'lobby'){
      io.to(roomInfo.room).emit('receiveUserList', { userList: usersInLobby });
    } else {
      io.to(roomInfo.room).emit('receiveUserList', { userList: usersInNormal });
    }

    const sumOfUsersInRooms = getSumOfUsersInExistRooms();
    socket.broadcast.emit('receiveExistRoomList', { sumOfUsersInRooms });
  });

  socket.on('getExistRoomList', () => {
    const existRooms = getExistRoomsInfo();
    const sumOfUsersInRooms = getSumOfUsersInExistRooms();

    io.to(socket.id).emit('receiveExistRoomList', { existRooms, sumOfUsersInRooms });
  })

  socket.on('sendMessage', ({ userInfo, roomInfo, message }) => {
    io.to(roomInfo.room).emit('receiveMessage', { userInfo, isSystemMessage: false, message });
  })
  

  socket.on('sendImage', ({ userInfo, roomInfo, message }) => {
    io.to(roomInfo.room).emit('receiveImage', { userInfo, isSystemMessage: false, message });
  })

  socket.on('exitRoom', ({ userInfo, roomInfo }) => {
    const userList = removeUser(userInfo, roomInfo);
    const sumOfUsersInRooms = getSumOfUsersInExistRooms();

    socket.leave(roomInfo.room);

    objRoomInfo.room = '';
    
    io.to(roomInfo.room).emit('receiveUserList', { userList });
    io.to(roomInfo.room).emit('receiveMessage', { userInfo, isSystemMessage: true, message: `${userInfo.username} 離開聊天室 exitRoom` });

    socket.broadcast.emit('receiveExistRoomList', { sumOfUsersInRooms });
  })

  socket.on('disconnect', () => {
    if (!objRoomInfo.room) {
      const userList = removeUser(objUserInfo, objRoomInfo);
      const sumOfUsersInRooms = getSumOfUsersInExistRooms();

      socket.leave(objRoomInfo.room);

      io.to(objRoomInfo.room).emit('receiveUserList', { userList });
      io.to(objRoomInfo.room).emit('receiveMessage', { userInfo: objUserInfo, isSystemMessage: true, message: `${objUserInfo.username} 離開聊天室 disconnect`});
      socket.broadcast.emit('receiveExistRoomList', { sumOfUsersInRooms });
    }
  })
});



server.listen(PORT, () => console.log(`Server has started.`));