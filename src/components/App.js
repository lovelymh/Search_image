import React, { Component } from 'react';
import './App.css';
import ImageList from './ImageList';
import { connect } from 'react-redux';
import * as auth from '../actions/authentication';
import * as images from '../actions/image';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingState: false,
            page_num: 1
        };
    }

    componentDidMount() {
        const { getStatusRequest, set_searchname, imageRequest, searchname } = this.props;
        getStatusRequest();
         //이전경로가 /image로 시작하는 경우는 새로 세팅하지 않는다
        if(!this.props.location.state||!String(this.props.location.state.from).includes("/image")){
            set_searchname('');
            imageRequest(searchname, 1, 1);
        }

        $(window).scroll(() => {
            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
               if(this.props.history.location.pathname=='/'){
                  if(!this.state.loadingState){
                    let next_page_num = this.state.page_num + 1;
                    this.setState({
                       loadingState: true,
                       page_num: next_page_num
                    }, () => {
                       imageRequest(searchname, this.state.page_num, 2)
                        .then(() => {
                        //  console.log("요청",this.props.searchname, this.state.page_num)
                        })
                    });
                  }
                }
            } else {
              if(this.props.history.location.pathname=='/'){
                if(this.state.loadingState){
                    this.setState({
                        loadingState: false
                    });
                }
              }
            }
        });
    }

  componentWillUnMount() {
    $(window).unbind();
  }

  render() {
        const { imagelist } = this.props;
        return (
          <div className="app-wrapper">
            {imagelist ? (<ImageList imagelist={imagelist} />) : ''}
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
  status: state.authentication.status,
  imagelist: state.image.imageinfo.imagelist,
  searchname: state.image.searchname,
  pagenum: state.image.pagenum
});

const mapDispatchToProps = (dispatch) => ({
  getStatusRequest: () => dispatch(auth.getStatusRequest()),
  imageRequest: (searchname, pagenum, search_tag) => dispatch(images.imageRequest(searchname, pagenum, search_tag)),
  set_searchname: (searchname) => dispatch(images.set_searchname(searchname))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
