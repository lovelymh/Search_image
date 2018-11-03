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
            page_num: 1,
            isMounted: false
        };
    }

    componentDidMount() {
        this.setState({
          isMounted: true
        })
        const { getStatusRequest, set_searchname, imageRequest } = this.props;
        getStatusRequest();

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
