import Login from '../components/Login';
import * as auth from '../actions/authentication';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  status: state.authentication.login.status
});

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (id, pw) => dispatch(auth.loginRequest(id,pw))
});

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
