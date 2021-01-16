// const http = require('http');
// const express = require('express');
const socketIO = require('socket.io');
// const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom, getExistRooms } = require('./users');

const router = require('./router');

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

// app.use(cors());

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

app.use(router);

io.on('connect', (socket) => {
  console.log('用戶已連接');

  socket.on('join', ({ userInfo, roomInfo }) => {
    const userInfoWithSocketId = {...userInfo, id: socket.id};
    const { usersInLobby, usersInNormal } = addUser({ userInfo: userInfoWithSocketId, roomInfo });
    
      socket.join(roomInfo.room);
      io.to(roomInfo.room).emit('message', {userInfo: userInfoWithSocketId, isSystemMessage: true, message: `${userInfo.username} 加入聊天室`});

      if (roomInfo.mode === 'lobby'){
        io.to(roomInfo.room).emit('userList', {userList: usersInLobby});
      } else {
        io.to(roomInfo.room).emit('userList', {userList: usersInNormal});
      }
  });

  socket.on('getExistRoomList', () => {
    const existRooms = getExistRooms();
    const usersInRoom = getUsersInRoom();

    io.to(socket.id).emit('receiveExistRoomList', { existRooms, usersInRoom });
  })

  socket.on('sendMessage', ({userInfo, roomInfo, message}) => {
    io.to(roomInfo.room).emit('message', { userInfo, isSystemMessage: false, message });
  })
  

  socket.on('sendImage', ({userInfo, roomInfo, message}) => {
    io.to(roomInfo.room).emit('receiveImage', { userInfo, isSystemMessage: false, message });
  })

  socket.on('exitRoom', ({userInfo, roomInfo}) => {
    console.log('離線')

    const userList = removeUser(userInfo, roomInfo);

      io.to(roomInfo.room).emit('message', { userInfo, isSystemMessage: true, message: `${userInfo.username} 離開聊天室` });

      if (roomInfo.mode === 'lobby'){
        io.to(roomInfo.room).emit('userList', {userList});
      } else {
        io.to(roomInfo.room).emit('userList', {userList});
      }
      // io.to(roomInfo.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    // }
  })

  socket.on('disconnect', () => {
    const userList = removeUser(userInfo, roomInfo);

    // const user = removeUser(socket.id);

    // if(user) {
    //   io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
    //   io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    // }
    socket.removeAllListeners();
  })
});



// server.listen(process.env.PORT || 3000, () => console.log(`Server has started.`));