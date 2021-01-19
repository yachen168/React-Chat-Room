// import { INCREAMENT, DECREAMENT } from '../action/constant';

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('userInfo'));
};

const initialState = getLocalStorage() || {};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_USER_INFO': {
      return { ...state, username: payload.username, avatar: payload.avatar };
    }

    default:
      return state;
  }
};

export default reducer;
