
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
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';

import styled from 'styled-components';

import axios from "../assets/utils/axios";
import store from "../assets/utils/store";
import {DELETEGAME} from "../assets/utils/constants";
import {UPVOTE,DOWNVOTE} from "../assets/utils/constants";



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
const UpvotesNumberDiv = styled.div`
  padding: 0 0 10px 10px;
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

  handleDeleteButton = (gameid) => {
    const response =  axios.delete('http://localhost:8000/games/'+gameid)
    response.then(() => {
      store.dispatch({type: DELETEGAME, payload: {gameid: gameid}})
    })
    this.props.history.push({pathname:'/'})
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

  handleUpvoteRender(gameid){
    if (this.props.upvotedGames.includes(gameid))
        return  <ThumbUpAltIcon onClick={this.handleUpvote.bind(this,[gameid])}/>    
    else 
        return <ThumbUpOutlinedIcon onClick={this.handleUpvote.bind(this,[gameid])}/>
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
              <div>
              {delButton}
              {editButton}
              </div>
              {this.handleUpvoteRender(this.state.game.id)}
            </CardActions>
            <UpvotesNumberDiv>{this.state.game.upvotes}</UpvotesNumberDiv>
          </StyledCard>
      )
    }
    else return (<h1>Rendering...</h1>)
  }
}

const mapStateToProps = state => ({
  userId: state.id,
  upvotedGames: state.upvotedGames
});

export default withRouter(connect(mapStateToProps)(GameDetail))


