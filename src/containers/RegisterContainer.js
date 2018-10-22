import Register from '../components/Register';
import * as auth from '../actions/authentication';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  status: state.authentication.register.status,
  errorCode: state.authentication.register.error
});

const mapDispatchToProps = (dispatch) => ({
  registerRequest: (id, name, pw) => dispatch(auth.registerRequest(id, name, pw))
});

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default RegisterContainer;
