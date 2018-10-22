import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Notfound extends Component{
  render(){
    return(
      <div className="notfound-wrapper">
        <div>페이지를 찾을 수 없습니다</div>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(Notfound))
