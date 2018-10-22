import * as types from '../actions/ActionTypes';

const initialState = {
  imageinfo: {
    status: 'INIT',
    imagelist: ''
  },
  searchname: '',
  pagenum: 1,
  imagedown_status: 'INIT',
  imagesave_status: 'INIT'
}

function image(state = initialState, action){
  switch(action.type) {
    case types.IMAGE_GET:
      return {
        ...state,
        imageinfo: {
          ...state.imageinfo,
          status: 'WAITING'
        }
      };
    case types.IMAGE_GET_SUCCESS:
    let next_imagelist;

    if(typeof state.imageinfo.imagelist==='undefined'){
      next_imagelist = action.imagelist
    } else {
      next_imagelist = [...state.imageinfo.imagelist, ...action.imagelist]
    }
      return {
        ...state,
        imageinfo: {
          status: 'SUCCESS',
          imagelist: next_imagelist
        }
      };
    case types.IMAGE_GET_SEARCH_SUCCESS:
      return {
        ...state,
        imageinfo: {
          status: 'SUCCESS',
          imagelist: action.imagelist
        }
      };
    case types.IMAGE_GET_FAILURE:
      return {
        ...state,
        imageinfo: {
          ...state.imageinfo,
          status: 'FAILURE'
        }
     };
     case types.IMAGE_SEARCHNAME_SET:
      return {
        ...state,
        searchname: action.searchname
      };
    case types.IMAGE_DOWNLOAD:
      return {
        ...state,
        imagedown_status: 'WAITING'
      };
    case types.IMAGE_DOWNLOAD_SUCCESS:
      return {
        ...state,
        imagedown_status: 'SUCCESS'
      };
    case types.IMAGE_DOWNLOAD_FAILURE:
      return {
        ...state,
        imagedown_status: 'FAILURE'
      };
    case types.IMAGE_PAGENUM_SET:
      let next_pagenum = state.pagenum + 1;
      return {
        ...state,
        pagenum: next_pagenum
      };
    case types.IMAGE_SAVETO_SERVER:
      return {
        ...state,
        imagesave_status: 'WAITING'
      };
    case types.IMAGE_SAVETO_SERVER_SUCCESS:
      return {
        ...state,
        imagesave_status: 'SUCCESS'
      };
    case types.IMAGE_SAVETO_SERVER_FAILURE:
      return {
        ...state,
        imagesave_status: 'FAILURE'
      };
    default:
      return state;
  }
}

export default image;
