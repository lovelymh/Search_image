import React, { Component } from 'react';
import './DownloadImage.css'
import * as images from '../actions/image';
import * as userimage from '../actions/userimageinfo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DownloadImage extends Component {
  constructor(props){
    super(props);
    this.state = {
      good_image: false,
      img_setting: false
    }
  }

  componentDidMount(){
    if(this.props.status.userID){
      const { id } = this.props.match.params;
      this.props.userImageRequest(this.props.status.userID, id)
        .then(() => {
          if(this.props.userimage.status == 'SUCCESS') {
            this.setState({
              good_image: true
            });
          }
        })
    }
  }

  handleDownimage = (url, id) => {
    this.props.imageDownload(url, id);
  }

  handleSaveimage = () => {
    if(!this.props.status.userID){
      alert('좋아요를 누르려면 로그인을 해주세요.');
      this.props.history.push('/login')
    }
    const { id } = this.props.match.params;
    if(this.state.good_image){
      this.props.userImagedelRequest(this.props.status.userID, id);
      this.setState({
        good_image: false
      });
    } else {
       this.props.userImagesaveRequest(this.props.status.userID, id);
       this.setState({
         good_image: true
       });
     }
  }


  render(){
     const { id } = this.props.match.params;
     return(
      <div className="download-image-wrapper">
        <div className="image-download">
        <img src={(this.props.location.state ? this.props.location.state.webformatURL : '' ) || `./images/${id}_S.jpg`}
             className="show-image"/>
        <div className="down-image">
            <div className={`good ${this.state.good_image}`} onClick={this.handleSaveimage}>
              {this.state.good_image ? '좋아요 취소 :(' : '좋아요 :)'}
            </div>
            <div className="image-down small"
                 onClick={()=>this.handleDownimage(`./images/${id}_S.jpg`, `${id}_S`)}>작은 이미지 다운</div>
            <div className="image-down large"
                 onClick={()=>this.handleDownimage(`./images/${id}_L.jpg`, `${id}_L`)}>큰 이미지 다운</div>
            </div>
       </div>
     </div>
    );
  }
}

const mapStateToProps = (state) => ({
  imagelist: state.image.imageinfo.imagelist,
  status: state.authentication.status,
  userimage: state.userimageinfo.userimage
});

const mapDispatchToProps = (dispatch) => ({
  imageDownload: (url, id) => dispatch(images.imageDownload(url, id)),
  userImagesaveRequest: (userid, img_id) => dispatch(userimage.userImagesaveRequest(userid, img_id)),
  userImageRequest: (userid, img_id) => dispatch(userimage.userImageRequest(userid, img_id)),
  userImagedelRequest: (userid, img_id) => dispatch(userimage.userImagedelRequest(userid, img_id))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DownloadImage));
