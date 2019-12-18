
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from  '@material-ui/core/Grid';

import styled from 'styled-components';

import axios from "../assets/utils/axios";
import store from "../assets/utils/store";
import {DELETEGAME} from "../assets/utils/constants";



const StyledCard = styled(Card)`
  max-width: 345px !important;
  margin-left: 30px !important;
  margin-top: 28px !important;
`

const StyledCardHeader = styled(CardHeader)`
  text-align: center;
`

const StyledTypography = styled(Typography)`
  overflow-wrap: break-word;
`



class GameDetail extends Component{

  constructor(props){
    debugger
    super(props)

    this.state = {
      gameId: this.props.match.params.id,
      game: undefined,
    }
  }
  componentDidMount(){
    axios.get('http://localhost:8000/games/'+this.state.gameId).then((response) => {
      this.setState({
        game: response.data,
      })
    })
  }

  render(){
    let delButton
    let editButton

    


    if(this.state.game!==undefined){

      if(this.state.game.user === this.props.userId){
        delButton = <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} 
        onClick={() => this.handleDeleteButton(this.state.game.id)}> Delete</Button>
  
        editButton = <Button variant="contained" color="secondary" startIcon={<EditIcon />} 
        onClick={() => this.handleEditButton(this.state.game.id)}>Edit</Button>
  
      }

      return(
        <StyledCard id={this.state.game.id}>
            <StyledCardHeader
            title={this.state.game.name}
            />
            <CardContent>
              <StyledTypography>{this.state.game.description}</StyledTypography>
              <StyledTypography>Price: {this.state.game.price}</StyledTypography>
              <StyledTypography>Store Link: {this.state.game.storeLink}</StyledTypography>
              <StyledTypography>Trailer URL: {this.state.game.trailerUrl}</StyledTypography>
            </CardContent> 
            <CardActions>
              {delButton}
              {editButton}
            </CardActions>
          </StyledCard>
      )
    }
    else return (<h1>Rendering...</h1>)
  }
}

const mapStateToProps = state => ({
  userId: state.id,
});

export default withRouter(connect(mapStateToProps)(GameDetail))


