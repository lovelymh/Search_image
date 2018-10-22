import { IMAGE_GET, IMAGE_GET_SUCCESS, IMAGE_GET_FAILURE,
         IMAGE_SEARCHNAME_SET, IMAGE_GET_SEARCH_SUCCESS,
         IMAGE_DOWNLOAD, IMAGE_DOWNLOAD_SUCCESS, IMAGE_DOWNLOAD_FAILURE,
         IMAGE_SAVETO_SERVER, IMAGE_SAVETO_SERVER_SUCCESS, IMAGE_SAVETO_SERVER_FAILURE} from './ActionTypes';
import axios from 'axios';
import FileSaver from 'file-saver';
import * as userimage from './userimageinfo';

export function imageRequest(searchname, pagenum, search_tag) {
  return (dispatch) => {
    dispatch(getimage());
    return axios.post('/api/image', ({searchname, pagenum}))
      .then(res => {
        if(search_tag==1){
          dispatch(getimagesearchSuccess(res.data.data.hits));
        }else if(search_tag==2){
          dispatch(getimageSuccess(res.data.data.hits));
        }else if(search_tag==3){
          dispatch(userimage.getuserimageSuccess(res.data.data.hits));
        }
      }).catch(err => {
        dispatch(getimageFailure());
      });
    }
}

export function getimage() {
    return {
        type: IMAGE_GET
    };
}

export function getimageSuccess(imagelist) {
    return {
        type: IMAGE_GET_SUCCESS,
        imagelist
    };
}

export function getimagesearchSuccess(imagelist) {
    return {
        type: IMAGE_GET_SEARCH_SUCCESS,
        imagelist
    };
}

export function getimageFailure() {
    return {
        type: IMAGE_GET_FAILURE
    };
}

export function set_searchname(searchname) {
  return {
    type: IMAGE_SEARCHNAME_SET,
    searchname
  };
}

export function imageDownload(url, id) {
  return (dispatch) => {
      dispatch(downloadimage());
      return axios.get(url, { responseType: 'blob' })
        .then(res => {
          FileSaver.saveAs(new Blob([res.data]), `${id}.jpg`);
          dispatch(downloadimageSuccess());
        }).catch(err => {
          dispatch(downloadimageeFailure());
        });
  }
}

export function downloadimage() {
    return {
        type: IMAGE_DOWNLOAD
    };
}

export function downloadimageSuccess() {
    return {
        type: IMAGE_DOWNLOAD_SUCCESS
    };
}

export function downloadimageeFailure() {
    return {
        type: IMAGE_DOWNLOAD_FAILURE
    };
}

export function imagesaveRequest(url, id, type) {
    return (dispatch) => {
      dispatch(saveimage());
      return axios.post('/api/image/server', {url, id, type})
        .then(res => {
          console.log(res);
          dispatch(saveimageSuccess());
        }).catch(err => {
          dispatch(saveimageFailure());
        });
    }
}

export function saveimage() {
    return {
        type: IMAGE_SAVETO_SERVER
    };
}

export function saveimageSuccess() {
    return {
        type: IMAGE_SAVETO_SERVER_SUCCESS
    };
}

export function saveimageFailure() {
    return {
        type: IMAGE_SAVETO_SERVER_FAILURE
    };
}
