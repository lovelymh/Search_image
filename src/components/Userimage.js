import React, { Component }  from 'react';
import { Link, withRouter } from 'react-router-dom';

class Userimage extends Component {
  render(){
    const {imgid, src} = this.props;
    return(
      <div className={`userimage ${imgid}`}>
          <Link to={{ pathname: '/image/'+imgid }}>
            <img src={src} className={`image ${imgid}`}/>
          </Link>
      </div>
    );
  }
}

export default withRouter(Userimage);
