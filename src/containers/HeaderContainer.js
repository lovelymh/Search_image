import Header from '../components/Header';
import * as auth from '../actions/authentication';
import * as images from '../actions/image';
import * as userimage from '../actions/userimageinfo';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  status: state.authentication.status,
  imageinfo: state.image.imageinfo,
  searchname: state.image.searchname
});

const mapDispatchToProps = (dispatch) => ({
  logoutRequest: () => dispatch(auth.logoutRequest()),
  imageRequest: (searchname, pagenum, search_tag) => dispatch(images.imageRequest(searchname, pagenum, 1)),
  set_searchname: (searchname) => dispatch(images.set_searchname(searchname)),
  // userImageallRequest: (userid) => dispatch(userimage.userImageallRequest(userid))
});

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
