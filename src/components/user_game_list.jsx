
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

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

 class UserGameList extends Component {

  constructor(props){
    super(props)
    this.state = {
      userGames: this.props.userGames
    }
  }


  handleDeleteButton = (gameid) => {
    const response =  axios.delete('http://localhost:8000/games/'+gameid)
    response.then(() => {
      store.dispatch({type: DELETEGAME, payload: {gameid: gameid}})
    })
  }

  handleEditButton = (game) => {
    this.props.history.push({pathname: '/edit',
      state: {
        id: game.id,
        name: game.name,
        price: game.price,
        description: game.description,
        storelink: game.storeLink,
        trailerurl: game.trailerUrl,
        user: this.props.id,
      }  
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.userGames !== prevProps.userGames) {
      this.setState({
        userGames: this.props.userGames
      })
    }
  }


  render(){
    return(
      <Grid container alignItems="stretch">
        {this.state.userGames.map((game,i) => (
        <Grid item xs={4} key={i}>
          <StyledCard id={game.id}>
          <StyledCardHeader
          title={game.name}
          />
          <CardContent>
            <StyledTypography>{game.description}</StyledTypography>
            <StyledTypography>Price: {game.price}</StyledTypography>
            <StyledTypography>Store Link: {game.storeLink}</StyledTypography>
            <StyledTypography>Trailer URL: {game.trailerUrl}</StyledTypography>
          </CardContent> 
          <CardActions>
            <Button variant="contained" color="secondary" startIcon={<DeleteIcon />} onClick={() => this.handleDeleteButton(game.id)}> Delete</Button>
            <Button variant="contained" color="secondary" startIcon={<EditIcon />} onClick={() => this.handleEditButton(game)}>Edit</Button>
          </CardActions>
          </StyledCard>
        </Grid>
          ))}
      </Grid>
    )
  }
}

export default withRouter(UserGameList)