import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Authentication from './Authentication';

class Login extends Component {

  constructor(props){
    super(props);
  }

  handleLogin = (id, pw) => {
    return this.props.loginRequest(id, pw)
      .then(()=> {
        if(this.props.status === "SUCCESS") {
          this.props.history.push({
            pathname: '/',
            state: { from: this.props.location.pathname }
          })
          return true;
        } else {
          return false;
        }
      })
  }

  render() {
      return (
              <div className="login-wrapper">
                <Authentication mode={1} onLogin={this.handleLogin}/>
              </div>
      );
  }
}

export default withRouter(Login);
