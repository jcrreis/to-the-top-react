import React,{Component} from 'react';
import { connect } from "react-redux";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import styled from 'styled-components';

import store from '../assets/utils/store';
import {LOGOUT,LOGIN} from "../assets/utils/constants";
import axios from "../assets/utils/axios"


const StyledButton = styled(Button)`

`



const RightElement = styled.div`
  margin-left: auto;
`

class Header extends Component{
  constructor(props){
    super(props)
  }

  rediretToUserPanel = () => {
    this.props.history.push("/myprofile");
  }

  handleLogoutButton = e => {
    axios.post('http://localhost:8000/logout/');
    store.dispatch({type: LOGOUT})
  }

  render(){
    var lButton
    var pButton;
    if(this.props.username === undefined )
      lButton =  <StyledButton href="/login" color="inherit">Login</StyledButton>
    else{
      lButton =  <StyledButton onClick = {this.handleLogoutButton} color="inherit">Logout</StyledButton>
      pButton = <StyledButton href="/myprofile" color="inherit">My Profile</StyledButton>
    }
    return(
        <AppBar  position="relative">
          <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="menu">
            </IconButton>
            <StyledButton href="/" color="inherit">Home</StyledButton>
            <RightElement>
              {pButton}
              {lButton}
            </RightElement>
          </Toolbar>
        </AppBar>)
  }
}

const mapStateToProps = state => ({
  username: state.username
});

export default connect(mapStateToProps)(Header);