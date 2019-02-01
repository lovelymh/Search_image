import React, { Component } from 'react';
import './App.css';
import ImageList from './ImageList';
import { connect } from 'react-redux';
import * as auth from '../actions/authentication';
import * as images from '../actions/image';
import * as userimage from '../actions/userimageinfo';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingState: false,
            page_num: 1,
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({
          isMounted: true
        })
        const { getStatusRequest, set_searchname, imageRequest, userImageallRequest } = this.props;
        
        getStatusRequest().then(()=>{
            if(this.props.status.userID) {
                userImageallRequest(this.props.status.userID);
            } 
        });

        //초기로드 or main 이동시 세팅
        if(!this.props.location.state||this.props.location.state.from=='/'){
            set_searchname('');
            imageRequest('', 1, 1);
        }

        $(window).scroll(() => {
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                  if(!this.state.loadingState){
                    if(this.state.isMounted){
                      let next_page_num = this.state.page_num + 1;
                      this.setState({
                         loadingState: true,
                         page_num: next_page_num
                      }, () => {
                         imageRequest(this.props.searchname, this.state.page_num, 2)
                          .then(() => {
                          //  console.log("요청",this.props.searchname, this.state.page_num)
                          })
                      });
                  }
               }
            } else {
                if(this.state.loadingState){
                  if(this.state.isMounted){
                    this.setState({
                        loadingState: false
                    });
                  }
                }
            }
        });
    }

  componentWillUnmount() {
    this.setState({
        isMounted: false
    });
    // $(window).unbind('scroll');
  }

  handleCheckUserIncluesImage = (imageid) => {
   console.log(...this.props.all_userimage.userimageinfo)
   if(this.props.all_userimage.userimageinfo.length > 0){
     if(this.props.all_userimage.userimageinfo.includes(imageid)){
         return true
     } else {
         return false
     }
   }
  }

  //유저 정보가 있을시, 데이터가 있는지 확인
  handleSetUserImage = () => {
    const imglist = this.props.imagelist.map((img, idx) => {
       let data = this.handleCheckUserIncluesImage(img.id)
       return ({...img, data});
    });

    console.log(imglist)
    return(<ImageList imagelist={this.props.imagelist} />)
  }

  render() {
        const { imagelist, status } = this.props;
        return (
          <div className="app-wrapper">
            {imagelist ? (status.userID ? this.handleSetUserImage() : <ImageList imagelist={imagelist} />) : ''}
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
  status: state.authentication.status,
  imagelist: state.image.imageinfo.imagelist,
  searchname: state.image.searchname,
  pagenum: state.image.pagenum,
  all_userimage: state.userimageinfo.all_userimage
});

const mapDispatchToProps = (dispatch) => ({
  getStatusRequest: () => dispatch(auth.getStatusRequest()),
  imageRequest: (searchname, pagenum, search_tag) => dispatch(images.imageRequest(searchname, pagenum, search_tag)),
  set_searchname: (searchname) => dispatch(images.set_searchname(searchname)),
  userImageallRequest: (userid) => dispatch(userimage.userImageallRequest(userid))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
