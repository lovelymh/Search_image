import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Authentication.css';

class Authentication extends Component {
    constructor(props){
      super(props);
      this.state = {
        userid: "",
        name: (this.props.mode===2 ? this.props.status.currentUser : ''),
        password: "",
        errorMessage: ""
      };
    }

    handleChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin = () => {
      let id = this.state.userid;
      let pw = this.state.password;
      this.props.onLogin(id, pw)
        .then((success) => {
        if(!success) {
            this.setState({
              password: '',
              errorMessage: '아이디와 비밀번호를 다시 확인해주세요.'
            });
          } else {
            this.setState({
              errorMessage: ''
            });
          }
        })
    }

    handleRegister = () => {
      let id = this.state.userid;
      let name = this.state.name;
      let pw = this.state.password;

      this.props.onRegister(id, name, pw)
        .then((result)=> {
          if(result!=='SUCCESS') {
            this.setState({
                userid: '',
                name: '',
                password: '',
                errorMessage: result
            });
          } else {
            this.setState({
              errorMessage: ''
            });
          }
        });

    }

    handleEdituserinfo = () => {
      let id = this.props.status.userID;
      let name = this.state.name;
      let pw = this.state.password;
      this.props.onEditUserinfo(id, name, pw)
        .then((result)=> {
          if(!result) {
            this.setState({
                name: '',
                password: '',
                errorMessage: '비밀번호를 다시 확인해주세요'
            });
          } else {
            this.setState({
              errorMessage: ''
            });
          }
        })
    }

    handleKeyPress = (e) => {
      if(e.charCode==13){
        if(this.props.mode===0) {
          this.handleRegister();
        } else if(this.props.mode===1) {
          this.handleLogin();
        } else if(this.props.mode===2) {
          this.handleEdituserinfo();
        }
      }
    }

    render() {
      const { userid, name, password } = this.state;
      const { handleChange, handleLogin, handleKeyPress, handleRegister, handleEdituserinfo } = this;
        const inputform = (
          <div className="inputform-wrapper">
            {this.props.mode!==2 ?
                        <input type="text" placeholder="아이디 or 이메일 주소"
                               value={userid} onChange={handleChange} name="userid"/>
                             : ''}
            {this.props.mode!==1 ?
                         <input type="text" placeholder="이름"
                                value={name} onChange={handleChange} name="name"/>
                             : ''}
            <input type="password" placeholder="비밀번호"
                   value={password} onChange={handleChange} name="password"/>

          </div>
        );

        const loginform = (
          <div className="input-form">
            <div className="type login">로그인</div>
            <div className={`error-message ${this.state.errorMessage ? 'visible' : 'none'}`}>{this.state.errorMessage}</div>
            {inputform}
            <div className="login submit" onClick={handleLogin}>
              로그인
            </div>
            <Link to="/register" className="to register">가입을 원하시나요?</Link>
          </div>
        );

        const registerform = (
          <div className="input-form">
            <div className="type register">회원가입</div>
            <div className={`${this.state.errorMessage ? 'visible' : 'none'} error-message`}>{this.state.errorMessage}</div>
            {inputform}
            <div className="register submit" onClick={handleRegister}>
              가입
            </div>
            <Link to="/login" className="to login">이미 가입이 되어있나요?</Link>
          </div>
        );

        const editform = (
          <div className="input-form">
            <div className="type editinfo">정보 수정</div>
            <div className={`error-message ${this.state.errorMessage ? 'visible' : ''}`}>{this.state.errorMessage}</div>
            {inputform}
            <div className="userinfo-edit submit" onClick={handleEdituserinfo}>
              수정
            </div>
          </div>
        )

        return (
            <div className="login-register-wrapper">
                { this.props.mode ? ( this.props.mode===1 ? loginform : editform ) : registerform }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  status: state.authentication.status
});

export default withRouter(connect(mapStateToProps, null)(Authentication));
