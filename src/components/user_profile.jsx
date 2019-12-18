import React, { Component } from "react";
import { connect } from "react-redux";
import UserDetails from "./user_details"
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import axios from "../assets/utils/axios";

import { withRouter } from 'react-router-dom';

import UserGameList from './user_game_list.jsx'
import UserUpvoteList from "./user_upvotes_list";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import AddIcon from '@material-ui/icons/Add';


const StyledButton = styled(Button)`
  position: absolute !important;
  right: 0px;
  margin: 20px !important;

`

const Div = styled.div`
  display: flex;
`

const Container = styled.div`
`


class UserProfile extends Component{

  constructor(props){
    super(props)
    this.state = {
      userUpvotes: [],
      showVal: 1,      
    }
  }


  componentDidUpdate(){

    if(this.state.userUpvotes === []){
      const response = axios.get('http://localhost:8000/upvotes/users/'+this.props.id)
      response.then(response => {
          this.setState({
            userUpvotes: response.data
          })
      })
    }
  }

    handleChange = e => { 
      if(e.target.value == 1)
        this.setState({
          showVal: 1
        })
      else
        this.setState({
            showVal: 0
          })
    }

    handleOnClick = () => {
      this.props.history.push({pathname: '/create',
      state: {
        parent: "UserProfile"
      }  
      })
    }
    render(){

      let selectedRender;

      if(this.state.showVal === 1) 
          selectedRender = <UserGameList userGames={this.props.userGames}/>
      else   
          selectedRender = <UserUpvoteList userUpvotes={this.props.userUpvotes}/>

      return(
          <>
            <Container>
              <Div>                    
                <UserDetails username={this.props.username} id={this.props.id} email={this.props.email}/>
                <StyledButton
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={this.handleOnClick}
                >
                    Add Game
                </StyledButton>
              </Div>
              <FormControl >
                <InputLabel id="input-select-order-label">Show</InputLabel>
                <Select
                labelId="order-select-label"
                id="order-select"
                onChange={this.handleChange}
                >
                <MenuItem value={1}>My Games</MenuItem>
                <MenuItem value={0}>Favorite Games</MenuItem>
                </Select>
              </FormControl>
              {selectedRender}
            </Container>       
          </>
      )
  }
}

const mapStateToProps = state => ({
  username: state.username,
  id: state.id,
  email: state.email,
  userGames: state.userGames,
  userUpvotes: state.upvotedGames
});

export default withRouter(connect(mapStateToProps)(UserProfile));

