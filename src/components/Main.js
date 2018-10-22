import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import './Main.css';

class Main extends Component{
  render(){
    return(
      <div className="main-wrapper">
        <HeaderContainer />
        <main>{this.props.children}</main>
        <footer>Copyright &copy; lovelymh & pixabay</footer>
      </div>
    );
  }
}
export default Main;
