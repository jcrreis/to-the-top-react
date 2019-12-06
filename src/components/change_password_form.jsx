import React, { Component } from "react";

import styled from 'styled-components';

import Header from "./header"
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


export default class ChangePassword extends Component{

  constructor(props){
    super(props)
    this.state = {
        oldpassword: "",
        password: "",
        passwordConfirmation: "",
        invalidFields: false,
        passwordError: false,
        oldPasswordError: false,
    }
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  handleOldPasswordChange= e =>{
    e.preventDefault()
    this.setState({oldpassword:e.target.value})
  }

  handlePasswordChange = e =>{
    e.preventDefault()
    this.setState({password:e.target.value})
  }

  handlePasswordConfirmationChange = e =>{
    e.preventDefault()
    this.setState({passwordConfirmation:e.target.value})
  }

  handleOnClick = (event) =>{
    event.preventDefault()
    if (this.state.oldpassword === "" || this.state.password === "" || this.state.passwordConfirmation === "")
        this.setState({
          invalidFields: true,
        })
    else if (this.state.password !== this.state.passwordConfirmation){
        this.setState({
          passwordError: true,
        })
    }
    else{
        const userData = {
          oldpassword: this.state.oldpassword,
          new_password1: this.state.password,
          new_password2: this.state.password
    }
      const response =  axios.post('http://localhost:8000/password/change/', userData);
      response.then(() => {
          this.props.history.push("/myprofile");
      })
      .catch(() => {
          this.setState({
            oldPasswordError: true,
          })
      })
    }
  }
       
  render(){

    let error;

    if(this.state.invalidFields) error = <Typography color="error" > Fields cannot be empty</Typography>

    if(this.state.passwordError) error = <Typography color="error" > Passwords doesn't match</Typography>

    if(this.state.oldPasswordError) error = <Typography color="error" > Current password is wrong</Typography>

    return(

      <>
        <Header/>
        <StyledCard>
          <StyledAvatar><LockOutlinedIcon /></StyledAvatar>
          <StyledCardHeader title="Change Password">
            </StyledCardHeader>
          <CardContent>
              <StyledContainer component="main" maxWidth="xs">
                  <StyledFormControl>
                    <TextField  variant="outlined" id="oldpassword" label="Password" type="password"  value={this.state.oldpassword} onChange={this.handleOldPasswordChange} />
                  </StyledFormControl>
                  <StyledFormControl>
                    <TextField variant="outlined" id="newpassword1" label="New Password" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                  </StyledFormControl>
                  <StyledFormControl>
                    <TextField  variant="outlined" id="newpassword2" label="New Password Confirmation" type="password" value={this.state.passwordConfirmation} onChange={this.handlePasswordConfirmationChange} />                    
                  </StyledFormControl>
                  <DivWrapper>
                    <StyledButton type="submit" variant="contained" color="primary" onClick={this.handleOnClick}>Change Password</StyledButton> 
                    </DivWrapper>
              </StyledContainer>
          </CardContent>
          {error}
        </StyledCard>     
      </>
    )
  }
}
