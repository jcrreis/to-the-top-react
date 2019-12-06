import React, { Component } from "react";

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography'

import styled from 'styled-components';
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
  text-align: center;
`
const StyledCard = styled(Card)`
  margin: auto;
  max-width: 500px;
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


export default class CreateAccount extends Component{

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      email: "",
      passwordConfirmation: "",
      invalidInput: false,
      invalidAddress: false,
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

  handlePasswordConfirmationChange = e =>{
    e.preventDefault()
    this.setState({passwordConfirmation:e.target.value})
  }

  handleEmailChange = e =>{
    e.preventDefault()
    this.setState({email:e.target.value})
  }

  

  handleOnClick = (event) =>{
    event.preventDefault()
    if(this.state.username === "" || this.state.password === "" || this.state.email === "")
      this.setState({
        invalidInput: true
      })
    else if(this.state.password !== this.state.passwordConfirmation){
    }
    else{
        const userData = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        }
        const response =  axios.post('http://localhost:8000/register/', userData);
        response.then( () => {
            const data = {
                username: this.state.username,
                password: this.state.password,
            }
            this.props.history.push("/login");
        })
        .catch(error => {
          this.setState({
            invalidAddress: true
          })
        })
      }
    }
      
  render(){

      let error; 

      if(this.state.invalidInput) error =  <Typography color="error" > All fields are mandatory</Typography>

      if(this.state.invalidAddress) error =  <Typography color="error" > This username/email is already in use</Typography>

      return(
        <>
          <Header/>
          <StyledCard>
            <StyledAvatar><LockOutlinedIcon /></StyledAvatar>
            <StyledCardHeader title="Sign Up"/>
            <CardContent>
              <StyledContainer component="main" maxWidth="xs">
                <StyledFormControl>
                  <TextField  variant="outlined" id="username" label="Username"  value={this.state.username} onChange={this.handleUsernameChange} />
                </StyledFormControl>
                <StyledFormControl>
                  <TextField  variant="outlined" id="email" label="Email Address" value={this.state.email} onChange={this.handleEmailChange} />
                </StyledFormControl>
                <StyledFormControl>
                  <TextField variant="outlined" id="password" label="Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                </StyledFormControl>
                <StyledFormControl>
                  <TextField  variant="outlined" id="password2" label="Password Confirmation" type="password" value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmationChange} />                    
                </StyledFormControl>
                <DivWrapper>
                  <StyledButton type="submit" variant="contained" color="primary" onClick={this.handleOnClick}>Sign Up</StyledButton> 
                </DivWrapper>
              </StyledContainer>
            </CardContent>
            {error}
          </StyledCard>     
          </>
                  
      )
  
  }
}
