import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE,
         AUTH_REGISTER, AUTH_REGISTER_SUCCESS, AUTH_REGISTER_FAILURE,
         AUTH_GET_STATUS, AUTH_GET_STATUS_SUCCESS, AUTH_GET_STATUS_FAILURE,
         AUTH_EDIT_USERINFO, AUTH_EDIT_USERINFO_SUCCESS, AUTH_EDIT_USERINFO_FAILURE,
         AUTH_LOGOUT } from './ActionTypes';
import axios from 'axios';

/* LOGIN */
export function loginRequest(userid, password) {
  return (dispatch) => {
    dispatch(login());
    return axios.post('/api/account/signin', { userid, password })
      .then(res => {
        dispatch(loginSuccess(res.data.username));
      }).catch(err => {
        dispatch(loginFailure());
      });
    }
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* REGISTER */
export function registerRequest(userid, name, password){
  return (dispatch) => {
    dispatch(register());
    return axios.post('/api/account/signup', {userid, name, password})
      .then(res => {
        dispatch(registerSuccess());
      }).catch(err => {
        dispatch(registerFailure(err.response.data));
      })
  };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS,
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}

/*GET STATUS*/
export function getStatusRequest() {
  return (dispatch) => {
    dispatch(getStatus());
    return axios.get('/api/account/getInfo')
      .then((res)=> {
        dispatch(getStatusSuccess(res.data.info.username, res.data.info.userid))
      }).catch(err => {
        dispatch((getStatusFaileure()));
      });
  };
}

export function getStatus() {
  return {
    type: AUTH_GET_STATUS
  };
}

export function getStatusSuccess(username, userid){
  return {
    type: AUTH_GET_STATUS_SUCCESS,
    username,
    userid
  };
}

export function getStatusFaileure() {
  return {
    type: AUTH_GET_STATUS_FAILURE
  };
}

/*LOGOUT*/
export function logoutRequest() {
  return (dispatch) => {
    return axios.post('/api/account/logout')
      .then(res => {
        dispatch(logout());
      });
  };
}

export function logout() {
  return{
    type: AUTH_LOGOUT
  };
}

/*EDIT USERINFO*/
export function userinfo_EditRequest(userid, username, password) {
  return (dispatch) => {
    dispatch(userinfo_Edit());

    return axios.put(`/api/account/user/${userid}`, { userid, username, password })
      .then(res => {
        dispatch(userinfo_EditSuccess(username));
      }).catch(err => {
        dispatch(userinfo_EditFailure());
      });
    }
}

export function userinfo_Edit() {
  return{
    type: AUTH_EDIT_USERINFO
  };
}

export function userinfo_EditSuccess(username) {
  return{
    type: AUTH_EDIT_USERINFO_SUCCESS,
    username
  };
}

export function userinfo_EditFailure() {
  return{
    type: AUTH_EDIT_USERINFO_FAILURE
  };
}
