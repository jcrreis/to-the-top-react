import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

import styled from 'styled-components';

import { FormControl } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography'

import axios from "../assets/utils/axios"
import Header from "./header"
import store from "../assets/utils/store"
import {EDITGAME} from "../assets/utils/constants"


const StyledContainer = styled(Container)`

  display: flex;
  flex-direction: column;
`
const StyledFormControl = styled(FormControl)`
  margin-top: 20px !important;
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
 class EditForm extends Component{

  constructor(props){
    super(props)
    this.state = {
      id: this.props.location.state.id,
      name: this.props.location.state.name,
      price: this.props.location.state.price,
      description: this.props.location.state.description,
      trailerurl: this.props.location.state.trailerurl,
      storelink: this.props.location.state.storelink,
      invalidInput: false,
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
        storeLink: this.state.storelink,
        trailerUrl: this.state.trailerurl,
      }
      const response =  axios.put('http://localhost:8000/games/'+this.state.id, gameData);
      response.then(() => {
          store.dispatch({type: EDITGAME, payload: {gameid: this.state.id,gameData: gameData}})
          this.props.history.push({pathname: '/myprofile'})
      })
      .catch(() => {
        this.setState({
          invalidInput: true,
        })

      })
    }

    render(){

      let error

      if(this.state.invalidInput) error = <Typography color="error" > Invalid input fields.Please Try again.</Typography>
      return(
        <>    
          <Header/>
          <StyledCard>
            <StyledCardHeader title="Edit Game">
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
                <ButtonDiv>
                  <Fab color="secondary" aria-label="add" onClick={this.handleOnClick}><AddIcon/></Fab>
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
    
});
export default withRouter(connect(mapStateToProps)(EditForm));
