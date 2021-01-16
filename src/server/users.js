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
  console.log(userInfo)
  if (roomInfo.mode === 'lobby') {
    usersInLobby = usersInLobby.filter(user => user.userInfo.id !== userInfo.id);
    console.log(usersInLobby)
    return usersInLobby;
  }else{
    usersInNormal = usersInNormal.filter(user => user.userInfo.id !== userInfo.id);
    return usersInNormal;
  }
}

const getExistRooms = () => usersInNormal;

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = () => {
  let roomSet = new Set();

  if (usersInNormal.length>0){
    return usersInNormal.reduce( (acc, curr) => {

      roomSet.add(curr.roomInfo.room)
      if (curr.roomInfo.room in roomSet) {
        acc[curr.roomInfo.room]++;
      }else {
        acc[curr.roomInfo.room] = 1;
      }
      return acc;
    }, {});
  }else{
    return {};
  }
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getExistRooms };