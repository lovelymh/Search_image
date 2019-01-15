import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

const UpButton = styled.div`
    top: ${({ scrolltop }) => (scrolltop ? `${scrolltop}px` : '0px')};
    right: 100px;
    border-radius: 100px;
    position: fixed;
    display: ${({ visible }) => (visible ? 'block' : 'none')};
    text-align: center;
    font-size: 2rem;
    cursor: pointer;
    background-color: #ffd8a8;
    padding: 0.333rem 0.7rem;
    color: #495057;

    @media (max-device-width: 480px) {
        font-size: 3.5rem;
        padding: 2rem 2.5rem;
        top: 99rem;
        right: 3rem;
    }
`

class ScrollupButton extends Component{

    constructor(props){
        super(props);
        this.state = {
            isMounted: false,
            isVisible: false,
            scrolltop: 0
        }
    }

    componentDidMount() {
        this.setState({
            isMounted: true
        }, ()=> {
            $(window).scroll(() => {
                if($(window).scrollTop() > 40){
                    if(this.state.isMounted){
                        this.setState({
                            isVisible: true,
                            scrolltop: $(window).height() - 100
                        })
                    }
                } else {
                    if(this.state.isMounted){
                        this.setState({
                            isVisible: false
                        })
                    }
                }
            })
        })
    }
 
    componentWillUnmount() {
        this.setState({
            isMounted: false
        }, () => {
            $(window).unbind();
        });
    }
    
    handleUpbuttonClick = () => {
        window.scrollTo(0, 0);
    }

    render(){
        return(
        <UpButton visible={this.state.isVisible} scrolltop={this.state.scrolltop} onClick={this.handleUpbuttonClick}>
             ▲
        </UpButton>
        )
    }
}

export default withRouter(ScrollupButton);