import EditUserinfo from '../components/EditUserinfo';
import * as auth from '../actions/authentication';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  status: state.authentication.status,
  edit_status: state.authentication.edit_userinfo.status
});

const mapDispatchToProps = (dispatch) => ({
  userinfo_EditRequest: (id, name, password) => dispatch(auth.userinfo_EditRequest(id, name, password))
});

const EditUserinfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserinfo);

export default EditUserinfoContainer;
