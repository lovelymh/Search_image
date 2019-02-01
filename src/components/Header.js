import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchname: '',
      usernameClicked: false,
    }
  }

  handleLogout = () => {
    let currentUser = this.props.status.currentUser
    this.props.logoutRequest().then(() => {
      alert(`good-bye, ${currentUser}`)
      this.setState({
        searchname: '',
      })
      this.props.history.push({
        pathname: '/',
        state: { from: '/logout' },
      })
    })
  }

  handleChangeinput = e => {
    this.setState({
      searchname: e.target.value,
    })
    this.props.set_searchname(e.target.value)
  }

  handleSearch = () => {
    this.props.imageRequest(this.state.searchname, 1, 1).then(() => {
      this.props.history.push({
        pathname: '/',
        state: { from: this.props.location.pathname },
      })
    })
  }

  handleKeyPress = e => {
    if (e.charCode == 13) {
      this.handleSearch()
    }
  }

  handleClickUsername = () => {
    this.setState({
      usernameClicked: !this.state.usernameClicked,
    })
  }

  handleClickgoodimg = () => {
    this.props.userImageallRequest(this.props.status.userID).then(() => {
      this.props.history.push({
        pathname: `/user/${this.props.status.userID}/collection`,
      })
      this.setState({
        searchname: '',
        usernameClicked: false,
      })
    })
  }

  handleClickeditinfo = () => {
    this.props.history.push({
      pathname: `/user/${this.props.status.userID}/edit`,
    })
    this.setState({
      searchname: '',
      usernameClicked: false,
    })
  }

  handleClickmain = () => {
    this.setState(
      {
        searchname: '',
      },
      () => {
        this.props.history.push({
          pathname: '/',
          state: { from: this.props.location.pathname },
        })
      }
    )
  }

  handleClicklogin = () => {
    this.setState({
      searchname: '',
    })
  }

  handleClickregister = () => {
    this.setState({
      searchname: '',
    })
  }

  render() {
    const userpage = (
      <div className="userpage">
        <li className="user-page editinfo" onClick={this.handleClickeditinfo}>
          정보 수정
        </li>
        <li className="user-page good" onClick={this.handleClickgoodimg}>
          좋아요한 사진
        </li>
      </div>
    )
    const notloggedin = (
      <ul>
        <li onClick={this.handleClicklogin}>
          <Link to="/login">Login</Link>
        </li>
        <li onClick={this.handleClickregister}>
          <Link to="/register">Signup</Link>
        </li>
      </ul>
    )

    const loggedin = (
      <ul>
        <li className="logout" onClick={this.handleLogout}>
          Logout
        </li>
        <div className="username-page">
          <li className="username" onClick={this.handleClickUsername}>
            {this.props.status.currentUser}
          </li>
          {this.state.usernameClicked ? userpage : ''}
        </div>
      </ul>
    )

    const common = (
      <nav>{this.props.status.isLoggedIn ? loggedin : notloggedin}</nav>
    )

    return (
      <div className="Header-wrapper">
        <li className="mainlink" onClick={this.handleClickmain}>
          Search Free Image
        </li>
        <div className="searchimg-form">
          <input
            type="text"
            onChange={this.handleChangeinput}
            onKeyPress={this.handleKeyPress}
            value={this.state.searchname}
            className="search-input"
            placeholder="저작권없는 이미지를 검색하고 사용하세요!"
          />
          <img
            src="/image/magnifying-glass-1083373_640.png"
            className="search-img"
            onClick={this.handleSearch}
          />
        </div>
        {common}
      </div>
    )
  }
}

export default withRouter(Header)
