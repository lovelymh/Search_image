import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as userimage from '../actions/userimageinfo';
import * as images from '../actions/image';
import './Userimagepage.css';
import Userimage from './Userimage';

class Userimagepage extends Component{

  componentDidMount(){
    if(!this.props.status.isLoggedIn) {
      alert("로그인을 해주세요");
      this.props.history.push({
        pathname: '/login',
        state: { from: this.props.location.pathname }
      })
    }
  }

  render(){
       let userimagelist = this.props.all_userimage.userimageinfo;
       if(userimagelist){
         const userimage_list = userimagelist.map((userimage, idx) => (
          <Userimage
             imgid={userimage.imageid}
             src={`./images/${userimage.imageid}_S.jpg`}
             key={userimage.imageid}
           />));
       }
        const nothing = (
          <div className="nothing-userimage">
            좋아요를 누른 이미지가 없어요!
          </div>
        )
    return(
      <div className="userimage-page-wrapper">
        <div className="userimage-user">{this.props.status.currentUser}님의 좋아요 리스트</div>
        <div className="userimage-list">
          {userimagelist.length > 0 ? userimage_list : nothing }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: state.authentication.status,
  userimage: state.userimageinfo.userimage,
  all_userimage: state.userimageinfo.all_userimage
});

const mapDispatchToProps = (dispatch) => ({
  imageRequest: (searchname, pagenum, search_tag) => dispatch(images.imageRequest(searchname, pagenum, search_tag)),
  getuserimageSuccess: (data) => dispatch(userimage.getuserimageSuccess(data))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userimagepage));
