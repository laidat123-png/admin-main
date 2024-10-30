import { GET_ALL_USER, DELETE_ONE_USER, SET_TOTAL_USERS } from '../action/index';

const initialState = {
  users: [],
  totalUsers: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        users: action.payload,
        totalUsers: action.payload.length,
      };
    case DELETE_ONE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
        totalUsers: state.totalUsers - 1,
      };
    case SET_TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;