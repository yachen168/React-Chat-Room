let usersInLobby = [];
let usersInNormal = [];

const addUser = ({ userInfo, roomInfo }) => {
  const user = { userInfo, roomInfo };

  if (roomInfo.mode === 'lobby'){
    usersInLobby.push(user);
  }else{
    usersInNormal.push(user)
  }

  return {usersInLobby, usersInNormal};
}

const removeUser = (userInfo, roomInfo) => {
  if (roomInfo.mode === 'lobby') {
    usersInLobby = usersInLobby.filter(user => user.userInfo.id !== userInfo.id);
    return usersInLobby;
  }else{
    usersInNormal = usersInNormal.filter(user => user.userInfo.id !== userInfo.id);
    return usersInNormal;
  }
}

const getExistRoomsInfo = () => [...usersInNormal];

const getSumOfUsersInExistRooms = () => {
  return usersInNormal.reduce( (obj, currObj) => {
    if (currObj.roomInfo.room in obj) {
      obj[currObj.roomInfo.room]++;
    }else {
      obj[currObj.roomInfo.room] = 1;
    }
    return obj;
  }, {});
};

module.exports = { addUser, removeUser, getSumOfUsersInExistRooms, getExistRoomsInfo };