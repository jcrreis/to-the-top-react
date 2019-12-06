import React, { Component } from "react";
import { connect } from "react-redux";

import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Grid from "@material-ui/core/Grid"
import Link from "@material-ui/core/Link"
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import loadUserToStore from "../assets/utils/loaduser"
import Header from "./header"
import axios from "../assets/utils/axios"

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`
const StyledFormControl = styled(FormControl)`
  margin-top: 20px !important;
`
const StyledButton = styled(Button)`
  margin-top: 30px !important;
  width: 93px;
`

const DivWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledGrid = styled(Grid)`
  margin-left: auto !important;
  margin-top: 36px !important;
        
`

const StyledCard = styled(Card)`
  margin: auto;
  max-width: 500px;
  max-height: 500px;
  margin-top: 50px;
`

const StyledCardHeader = styled(CardHeader)`
  text-align: center;
`
const StyledAvatar = styled(Avatar)`
  margin: auto;
  background-color: rgb(220, 0, 78)  !important;
  margin-top: 25px;

`

class LoginForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      error: false,
      invalidInput: false,
    }
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  handleUsernameChange = e =>{
    e.preventDefault()
    this.setState({username:e.target.value})
  }

  handlePasswordChange = e =>{
    e.preventDefault()
    this.setState({password:e.target.value})    
  }

  handleOnClick = (event) =>{
    event.preventDefault()
    if(this.state.username === "" || this.state.password === "" )
      this.setState({
        invalidInput: true
      })
    else{
      const data = {
        username: this.state.username,
        password: this.state.password
      }
      const response =  axios.post('http://localhost:8000/login/', data)
      response.then(() => {
        this.props.history.push("/");
        loadUserToStore()
      })
      .catch(()=>{
        this.setState({
          error: true
        })
      })
    }
  }

    render(){

      let error;
 
      if(this.state.invalidInput) error = <Typography color="error" > Your username/password cannot be empty</Typography>

      if(this.state.error) error = <Typography color="error" > Your credentials are wrong</Typography>

      return(
        <>
          <Header/>
          <StyledCard>
            <StyledAvatar><LockOutlinedIcon /></StyledAvatar>
            <StyledCardHeader title="Login">
            </StyledCardHeader>
            <CardContent>
              <StyledContainer component="main" maxWidth="xs">
                <StyledFormControl>
                  <TextField  variant="outlined" id="username" label="Username"  value={this.state.username} onChange={this.handleUsernameChange} />
                </StyledFormControl>
                <StyledFormControl>
                  <TextField variant="outlined" id="password" label="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </StyledFormControl>
                <DivWrapper>
                  <StyledButton type="submit" variant="contained" color="primary" onClick={this.handleOnClick}>Login</StyledButton> 
                  <StyledGrid item><Link href="/signup" variant="body2">{"Don't have an account? Sign Up"}</Link></StyledGrid>
                </DivWrapper>
              </StyledContainer>
            </CardContent>
            {error}
          </StyledCard>
        </>          
      )
    }
}

const mapStateToProps = state => ({
  username: state.username
});

export default connect(mapStateToProps)(LoginForm)