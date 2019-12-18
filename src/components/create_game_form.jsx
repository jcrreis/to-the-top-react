import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter,Redirect} from 'react-router-dom'

import { FormControl } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components';

import axios from "../assets/utils/axios"
import {ADDGAME} from '../assets/utils/constants'
import store from '../assets/utils/store'
import Header from "./header"





const StyledContainer = styled(Container)`

  display: flex;
  flex-direction: column;
`
const StyledFormControl = styled(FormControl)`
  margin-top: 20px !important;
`

const DivWrapper = styled.div`
  text-align: center;
`
const StyledCard = styled(Card)`
  margin: auto;
  max-width: 500px;
  margin-top: 30px;
`

const StyledCardHeader = styled(CardHeader)`
  text-align: center;
`
const ButtonDiv = styled.div`
  text-align: end;
  margin-top: 20px;
`
 class GameForm extends Component{

  constructor(props){
    super(props)
      this.state = {
          name: "",
          price: "",
          description: "",
          storeLink: "",
          trailerUrl: "",
          parent: this.props.location.state.parent,
          error: false,
    }
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  handleNameChange = e =>{
    e.preventDefault()
    this.setState({name:e.target.value})
  }

  handlePriceChange = e =>{
    e.preventDefault()
    this.setState({price:e.target.value})
  }

  handleDescriptionChange = e =>{
    e.preventDefault()
    this.setState({description:e.target.value})
  }

  storeLinkChange = e =>{
    e.preventDefault()
    this.setState({storeLink:e.target.value})
  }

  trailerUrlChange = e =>{
    e.preventDefault()
    this.setState({trailerUrl:e.target.value})
  }


  handleOnClick = (event) =>{
    event.preventDefault()
    const gameData = {
        name: this.state.name,
        price: this.state.price,
        description: this.state.description,
        trailerUrl: this.state.trailerUrl,
        storeUrl: this.state.storeLink
    }
      const response =  axios.post('http://localhost:8000/games/', gameData);
      response.then(response => {
        store.dispatch({type: ADDGAME, payload: {game: response.data}})
        if(this.state.parent === "UserProfile")
          this.props.history.push({pathname: "/myprofile"})
        else
          this.props.history.push({pathname: "/" })
      })
      .catch(() => {
        alert("error")
          this.setState({
            
            error: true,
          })
      })
    }

  render(){

    let error;

    if(this.state.error) error = <Typography color="error" > Name and Price field cannot be empty</Typography>

    return(
    <>    
      <StyledCard>
        <StyledCardHeader title="Add Game">
          </StyledCardHeader>
          <CardContent>
            <StyledContainer component="main" maxWidth="xs">
              <StyledFormControl>
                <TextField  variant="outlined" id="gamename" label="Name"  value={this.state.name} onChange={this.handleNameChange} />
              </StyledFormControl>
              <StyledFormControl>
                <TextField  variant="outlined" id="price" label="Price" value={this.state.price} onChange={this.handlePriceChange} />
              </StyledFormControl>
              <StyledFormControl>
                <TextField variant="outlined" id="description" label="Description"  value={this.state.description} onChange={this.handleDescriptionChange} />
              </StyledFormControl>
              <StyledFormControl>
                <TextField  variant="outlined" id="trailer" label="Trailer"  value={this.state.trailerUrl} onChange={this.trailerUrlChange} />                    
              </StyledFormControl>
              <StyledFormControl>
                <TextField  variant="outlined" id="store" label="Store" value={this.state.storeLink} onChange={this.storeLinkChange} />                    
              </StyledFormControl>
              <ButtonDiv href="/myprofile">
                <Fab color="secondary" aria-label="add" onClick={this.handleOnClick} ><AddIcon/></Fab>
              </ButtonDiv>
            </StyledContainer>
          </CardContent>
          {error}
      </StyledCard>  
    </>   
    )

  }

}

const mapStateToProps = state => ({
  userGames: state.userGames
});


export default withRouter(connect(mapStateToProps)(GameForm))