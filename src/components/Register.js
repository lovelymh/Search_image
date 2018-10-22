import React, { Component } from 'react';
import Authentication from './Authentication';

class Register extends Component {
  constructor(props){
    super(props);
  }

  handleRegister = (id, name, pw) => {
    return this.props.registerRequest(id, name, pw)
      .then(()=> {
        if(this.props.status === "SUCCESS") {
            this.props.history.push('/login');
            return 'SUCCESS';
        } else {

          let errorMessage = [
            '아이디는 영어 대/소문자, 숫자만 사용가능하며, 4자리 이상이어야 합니다.',
            '비밀번호는 6자리 이상이어야 합니다.',
            '이미 존재하는 아이디입니다.'
          ];

           return (errorMessage[this.props.errorCode.code-1]);
        }
      })
  }

    render() {
        return (
            <div className="register-wrapper">
              <Authentication mode={0} onRegister={this.handleRegister}/>
            </div>
        );
    }
}

export default Register;
