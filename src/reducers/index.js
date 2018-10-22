import authentication from './authentication';
import image from './image';
import userimageinfo from './userimageinfo';
import { combineReducers } from 'redux';

export default combineReducers({
  authentication,
  image,
  userimageinfo
});
