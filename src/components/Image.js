import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as images from '../actions/image';

class Image extends Component {

  constructor(props){
    super(props);
  }

  handleSaveimage = (largeImageURL, webformatURL, id) => {
     this.props.imagesaveRequest(largeImageURL, id, 0);
     this.props.imagesaveRequest(webformatURL, id, 1)
      .then(() => {
        if(this.props.imagesave_status == 'SUCCESS') {
          // this.props.history.push({
          //   pathname: '/image/'+id,
          //   state: { from: this.props.location.pathname }
          // })
        }
      })
  }

  render(){
    const { largeImageURL, webformatURL, title, id } = this.props;
    return(
      <div className={`img ${id}`} onClick={()=>this.handleSaveimage(largeImageURL, webformatURL, id)}>
          <Link to={{ pathname: '/image/'+id, state: {unique_id: id, webformatURL}}}>
              <img src={webformatURL}/>
          </Link>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  imagesave_status: state.image.imagesave_status
});

const mapDispatchToProps = (dispatch) => ({
  imagesaveRequest: (url, id, type) => dispatch(images.imagesaveRequest(url, id, type))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Image))
