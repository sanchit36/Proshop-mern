import {
  USER_CHANGE_PASSWORD_FAIL,
  USER_CHANGE_PASSWORD_REQUEST,
  USER_CHANGE_PASSWORD_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RESET_SUCCESS_STATE,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_DETAILS_REQUEST:
    case USER_UPDATE_PROFILE_REQUEST:
    case USER_CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, success: false, error: null };

    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload },
      };

    case USER_UPDATE_PROFILE_SUCCESS:
    case USER_CHANGE_PASSWORD_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: { ...state.userInfo, ...action.payload },
      };

    case USER_DETAILS_FAIL:
    case USER_UPDATE_PROFILE_FAIL:
    case USER_CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };

    case USER_RESET_SUCCESS_STATE:
      return { ...state, success: false };

    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
