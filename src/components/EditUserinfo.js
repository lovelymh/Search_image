import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Authentication from './Authentication';

class EditUserinfo extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    if(!this.props.status.isLoggedIn) {
      alert("로그인을 해주세요");
      this.props.history.push({
        pathname: '/login',
        state: { from: this.props.location.pathname }
      })
    }
  }

  handleEdituserinfo = (id, name, pw) => {

    return this.props.userinfo_EditRequest(id, name, pw)
      .then(()=> {
        if(this.props.edit_status === "SUCCESS") {
          //create session data
          let loginData = {
            isLoggedIn: true,
            username: name
          };

        document.cookie = `key=${btoa(JSON.stringify(loginData))}`;

        this.props.history.push({
          pathname: '/',
          state: { from: this.props.location.pathname }
        });
          return true;
        } else {
          return false;
        }
      })
  }

  render(){
    return(
          <div className="userinfo-edit-wrapper">
            <Authentication mode={2} onEditUserinfo={this.handleEdituserinfo}/>
          </div>
    );
  }
}


export default withRouter(EditUserinfo);
