import React, { Component } from "react";
import axios from "../assets/utils/axios"
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom'


import { TextField } from '@material-ui/core';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';


import styled from 'styled-components';

import store from '../assets/utils/store';
import {UPVOTE,DOWNVOTE} from "../assets/utils/constants";
import {SORTBYUPVOTEDESCENDING,SORTBYUPVOTEASCENDING} from "../assets/utils/constants";

const StyledCard = styled(Card)`
  max-width: 345px !important;
  margin-left: 30px !important;
  margin-top: 28px !important;
`

const StyledCardHeader = styled(CardHeader)`
  text-align: center;
`
const UpvotesNumberDiv = styled.div`
  padding: 0 0 10px 10px;
`

const DivOptions = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 20px;
  margin-right: 20px;
`
const StyledFormControl = styled(FormControl)`
  margin-right: 10px !important;
  min-width: 100px !important;
`

const StyledTypography = styled(Typography)`
  overflow-wrap: break-word;
`

const StyledButton = styled(Button)`
  margin-top: 20px !important;
  margin-left: 20px !important;
`

const DivDetails = styled.div`
  margin-top: 10px;
`

class GameList extends Component{

  constructor(props){
    super(props)
    this.state = {
      searchInput:  '',
      currentlyDisplayed: this.props.games,
      notLoggedIn: false,
    }
  }

  handleUpvote = (gameid) => {
    const data = {
      game: gameid[0],
    }
    const response =  axios.post('http://localhost:8000/upvotes/games/'+gameid[0],data);
      response.then(() => {
        store.dispatch({type: UPVOTE, payload: {gameid: gameid[0]}})
      })
      .catch(() => {
        const response2 = axios.delete('http://localhost:8000/upvotes/games/'+gameid[0],data);
        response2.then(()=>{
          store.dispatch({type: DOWNVOTE, payload: {gameid: gameid[0]}})
        })
        response2.catch(() => {
          this.setState({
            notLoggedIn: true,
          })
        })
    })
  }
  componentWillMount(){
  }

  handleSortingDescending = () => {         
    store.dispatch({type: SORTBYUPVOTEDESCENDING})    
  } 

  handleSortingAscending = () =>{
    store.dispatch({type: SORTBYUPVOTEASCENDING})    

  }

  handleSearchChange = e =>{
    const input = e.target.value.toLowerCase()
    this.setState({
      currentlyDisplayed: this.props.games.filter((g) => g.name.includes(input))
    })  
  }

  componentDidUpdate(prevProps) {
    if (this.props.games !== prevProps.games) {
      this.setState({
        currentlyDisplayed: this.props.games
      })
    }
  }
    
  handleUpvoteRender(gameid){
    if (this.props.upvotedGames.includes(gameid))
        return  <ThumbUpAltIcon onClick={this.handleUpvote.bind(this,[gameid])}/>    
    else 
        return <ThumbUpOutlinedIcon onClick={this.handleUpvote.bind(this,[gameid])}/>
  }

  handleChange = e => {
    if(e.target.value == 1)
      this.handleSortingDescending()
    else
      this.handleSortingAscending()
  }

  handleOnClick = () => {
    this.props.history.push({pathname: '/create',
      state: {
        parent: "GameList"
      }  
    })
  }

  routeRedirectOnClick = gameid => {
    this.props.history.push("/game/"+gameid);
  }

  
  render(){  

    if(!this.props.isLoaded){
      if(this.props.error)
        return <div>Server is down..Try again later</div>
      else
        return <div>Loading.....</div>
    }
    else{
      let error

      if(this.state.notLoggedIn) error = <Typography color="error" > You can't upvote as guest.Please login to do this operation.</Typography>

      return (
        <> 
          <StyledButton
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={this.handleOnClick}
          >
              Add Game
          </StyledButton>
          {error}
          <DivOptions>
            <TextField variant="outlined" id="search" label="Search" type="search"  onChange={this.handleSearchChange} />
            <StyledFormControl >
              <InputLabel id="input-select-order-label">Order By</InputLabel>
              <Select
              labelId="order-select-label"
              id="order-select"
              onChange={this.handleChange}
              >
              <MenuItem value={1}>Most Popular</MenuItem>
              <MenuItem value={0}>Least Popular</MenuItem>
              </Select>
            </StyledFormControl>
            </DivOptions>
            <Grid container alignItems="stretch">
              {this.state.currentlyDisplayed.map((game,i) => (
              <Grid item xs={4} key={i}>
                <StyledCard id={game.id}>
                  <div onClick={() => this.routeRedirectOnClick(game.id)}>
                    <StyledCardHeader title={game.name}/>
                    <CardContent >
                      <StyledTypography variant="body1" color="textSecondary" component="p">{game.description}</StyledTypography>
                      <DivDetails>
                        <StyledTypography variant="body2" color="textSecondary" component="p">Price: {game.price}</StyledTypography> 
                        <StyledTypography variant="body2" color="textSecondary" component="p">Trailer: {game.trailerUrl}</StyledTypography>                  
                        <StyledTypography variant="body2" color="textSecondary" component="p">Store: {game.storeLink}</StyledTypography>                  
                        <StyledTypography variant="body2" color="textSecondary" component="p">Posted by: {game.user}</StyledTypography>
                      </DivDetails>   
                    </CardContent> 
                  </div>
                  <CardActions>
                    {this.handleUpvoteRender(game.id)}
                  </CardActions>
                  <UpvotesNumberDiv>{game.upvotes}</UpvotesNumberDiv>                         
                </StyledCard>
              </Grid>
              ))}
            </Grid>
          </>
      )}

  }
}

const mapStateToProps = state => ({
  games: state.games,
  isLoaded: state.isLoaded,
  error: state.isLoaded,
  id: state.id,
  upvotedGames: state.upvotedGames
  });

export default withRouter(connect(mapStateToProps)(GameList));

