import { USER_GET_IMAGEINFO, USER_GET_IMAGEINFO_SUCCESS, USER_GET_IMAGEINFO_FAILURE,
         USER_GET_ALL_IMAGEINFO, USER_GET_ALL_IMAGEINFO_SUCCESS, USER_GET_ALL_IMAGEINFO_FAILURE,
         USER_SAVE_IMAGEINFO, USER_SAVE_IMAGEINFO_SUCCESS, USER_SAVE_IMAGEINFO_FAILURE,
         USER_DEL_IMAGEINFO, USER_DEL_IMAGEINFO_SUCCESS, USER_DEL_IMAGEINFO_FAILURE } from './ActionTypes';
import axios from 'axios';

export function userImageRequest(userid, img_id) {
  return (dispatch) => {
    dispatch(userImageget());
    return axios.get(`/api/userimage/${userid}/${img_id}`)
      .then(res => {
        dispatch(userImagegetSuccess(res.data.img_id, res.data.img_query));
      }).catch(err => {
        dispatch(userImagegetFailure());
      });
    }
}

export function userImageget(){
  return {
    type: USER_GET_IMAGEINFO
  };
}

export function userImagegetSuccess(img_id, img_query){
  return {
    type: USER_GET_IMAGEINFO_SUCCESS,
    img_id,
    img_query
  };
}

export function userImagegetFailure(){
  return {
    type: USER_GET_IMAGEINFO_FAILURE
  };
}

export function userImageallRequest(userid) {
  return (dispatch) => {
    dispatch(userImageallget());
    return axios.get(`/api/userimage/${userid}`)
      .then(res => {
        dispatch(userImageallgetSuccess(res.data.userimage));
      }).catch(err => {
        dispatch(userImageallgetFailure());
      });
    }
}

export function userImageallget(){
  return {
    type: USER_GET_ALL_IMAGEINFO
  };
}

export function userImageallgetSuccess(userimage){
  return {
    type: USER_GET_ALL_IMAGEINFO_SUCCESS,
    userimage
  };
}

export function userImageallgetFailure(){
  return {
    type: USER_GET_ALL_IMAGEINFO_FAILURE
  };
}

export function userImagesaveRequest(userid, img_id) {
  return (dispatch) => {
    dispatch(userImagesave());
    return axios.post('/api/userimage/'+userid, ({userid, img_id}))
      .then(res => {
        dispatch(userImagesaveSuccess());
      }).catch(err => {
        dispatch(userImagesaveFailure());
      });
    }
}

export function userImagesave(){
  return {
    type: USER_SAVE_IMAGEINFO
  };
}

export function userImagesaveSuccess(){
  return {
    type: USER_SAVE_IMAGEINFO_SUCCESS
  };
}

export function userImagesaveFailure(){
  return {
    type: USER_SAVE_IMAGEINFO_FAILURE
  };
}

export function userImagedelRequest(userid, img_id) {
  return (dispatch) => {
    dispatch(userImagedel());
    return axios.delete(`/api/userimage/${userid}/${img_id}`)
      .then(res => {
        dispatch(userImagedelSuccess());
      }).catch(err => {
        dispatch(userImagedelFailure());
      });
    }
}

export function userImagedel(){
  return {
    type: USER_DEL_IMAGEINFO
  };
}

export function userImagedelSuccess(){
  return {
    type: USER_DEL_IMAGEINFO_SUCCESS
  };
}

export function userImagedelFailure(){
  return {
    type: USER_DEL_IMAGEINFO_FAILURE
  };
}

export function getuserimageSuccess(data) {
    return {
        type: IMAGE_GET_USER_SUCCESS
    };
}
