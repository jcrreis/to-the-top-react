
import React, { Component } from "react";
import { connect } from "react-redux";


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

import styled from 'styled-components';


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

class UserUpvoteList extends Component {
    
    render(){
      let upvotedGamesList = this.props.games.filter(game => this.props.upvotedGames.includes(game.id))
      return(
          <Grid container alignItems="stretch">
            {upvotedGamesList.map((game,i) => (
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
                  <StyledTypography>Posted by: {game.user}</StyledTypography>
                </CardContent> 
              </StyledCard>
            </Grid>
            ))}
          </Grid>)
}
}


const mapStateToProps = state => ({
  games: state.games,
  upvotedGames: state.upvotedGames,
});

export default connect(mapStateToProps)(UserUpvoteList)