import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as images from '../actions/image'
import * as userimage from '../actions/userimageinfo'
import styled from 'styled-components'

const ImgHover = styled.div`
  position: absolute;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  bottom: 1px;
  font-size: 30px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0,
    rgba(0, 0, 0, 0.6) 100%
  );
  color: #ffff;
  width: 100%;
`
class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isVisible: false,
      userimgflag: false,
    }
  }

  componentDidMount() {
    const { userimgflag } = this.props
    this.setState({
      userimgflag,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userimgflag !== prevProps.userimgflag) {
      const { userimgflag } = this.props
      this.setState({
        userimgflag,
      })
    }
  }

  handleSaveimage = (largeImageURL, webformatURL, id) => {
    this.props.imagesaveRequest(largeImageURL, id, 0)
    this.props.imagesaveRequest(webformatURL, id, 1).then(() => {
      if (this.props.imagesave_status == 'SUCCESS') {
        // this.props.history.push({
        //   pathname: '/image/'+id,
        //   state: { from: this.props.location.pathname }
        // })
      }
    })
  }

  handleClickHeart = () => {
    if (!this.props.userID) {
      alert('좋아요를 누르려면 로그인을 해주세요.')
      this.props.history.push('/login')
    }
    const { id } = this.props
    if (this.state.userimgflag) {
      this.props.userImagedelRequest(this.props.userID, id)
      this.setState({
        userimgflag: false,
      })
    } else {
      this.props.userImagesaveRequest(this.props.userID, id)
      this.setState({
        userimgflag: true,
      })
    }
  }

  render() {
    const {
      largeImageURL,
      webformatURL,
      title,
      id,
      userimgflag,
      userID,
    } = this.props
    return (
      <div
        className={`img ${id}`}
        onClick={() => this.handleSaveimage(largeImageURL, webformatURL, id)}
        id={id}
        onMouseOver={() => this.setState({ isVisible: true })}
        onMouseLeave={() => {
          this.setState({ isVisible: false })
        }}
      >
        <Link
          to={{
            pathname: '/image/' + id,
            state: { unique_id: id, webformatURL },
          }}
        >
          <img src={webformatURL} />
        </Link>
        <ImgHover visible={this.state.isVisible}>
          <div
            className="heart"
            style={{
              marginLeft: 'auto',
              marginRight: '5px',
              marginBottom: '5px',
            }}
            onClick={this.handleClickHeart}
          >
            {this.state.userimgflag ? '♥' : '♡'}
          </div>
        </ImgHover>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  imagesave_status: state.image.imagesave_status,
})

const mapDispatchToProps = dispatch => ({
  imagesaveRequest: (url, id, type) =>
    dispatch(images.imagesaveRequest(url, id, type)),
  userImagesaveRequest: (userid, img_id) =>
    dispatch(userimage.userImagesaveRequest(userid, img_id)),
  userImagedelRequest: (userid, img_id) =>
    dispatch(userimage.userImagedelRequest(userid, img_id)),
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Image)
)
