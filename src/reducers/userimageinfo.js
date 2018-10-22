import * as types from '../actions/ActionTypes';

const initialState = {
  userimage: {
    status: 'INIT',
    imgid: '',
    imgquery: '',
  },
  save: {
    status: 'INIT'
  },
  delete: {
    status: 'INIT'
  },
  all_userimage: {
    status: 'INIT',
    userimageinfo: ''
  }
}

function image(state = initialState, action){
  switch(action.type) {
    case types.USER_GET_IMAGEINFO:
      return {
        ...state,
        userimage: {
          ...state.userimage,
          status: 'WAITING'
        }
      };
    case types.USER_GET_IMAGEINFO_SUCCESS:
      return {
      ...state,
        userimage: {
          ...state.userimage,
          status: 'SUCCESS',
          imgid: action.img_id,
          imgquery: action.img_query
        }
      };
    case types.USER_GET_IMAGEINFO_FAILURE:
      return {
      ...state,
        userimage: {
          ...state.userimage,
          status: 'FAILURE',
          imgid: '',
          imgquery: ''
        }
      };
      case types.USER_GET_ALL_IMAGEINFO:
        return {
          ...state,
          all_userimage: {
            ...state.all_userimage,
            status: 'WAITING'
          }
        };
      case types.USER_GET_ALL_IMAGEINFO_SUCCESS:
        return {
        ...state,
          all_userimage: {
            ...state.all_userimage,
            status: 'SUCCESS',
            userimageinfo: action.userimage
          }
        };
      case types.USER_GET_ALL_IMAGEINFO_FAILURE:
        return {
        ...state,
          all_userimage: {
            ...state.all_userimage,
            status: 'FAILURE',
            userimageinfo: ''
          }
        };
    case types.USER_SAVE_IMAGEINFO:
      return {
        ...state,
        save: {
          ...state.save,
          status: 'WAITING'
        }
      };
    case types.USER_SAVE_IMAGEINFO_SUCCESS:
      return {
      ...state,
        save: {
          ...state.save,
          status: 'SUCCESS'
        }
      };
    case types.USER_SAVE_IMAGEINFO_SUCCESS:
      return {
      ...state,
        save: {
          ...state.save,
          status: 'FAILURE'
        }
      };
      case types.USER_DEL_IMAGEINFO:
        return {
          ...state,
          delete: {
            ...state.delete,
            status: 'WAITING'
          }
        };
      case types.USER_DEL_IMAGEINFO_SUCCESS:
        return {
        ...state,
          delete: {
            ...state.delete,
            status: 'SUCCESS'
          }
        };
      case types.USER_DEL_IMAGEINFO_SUCCESS:
        return {
        ...state,
          delete: {
            ...state.delete,
            status: 'FAILURE'
          }
        };
    default:
      return state;
  }
}

export default image;
