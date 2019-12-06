import axios from "./axios"
import store from "./store"
import {LOGIN} from "./constants"


export default function loadUserToStore(){

  const response =  axios.get('http://localhost:8000/user/')
  response.then(response => {
    const data = response.data
    axios.get('http://localhost:8000/upvotes/users/'+data['pk']).then(upvotedGamesResponse => {
      const upvotedGames = upvotedGamesResponse.data.map(function (obj) {return obj.game;})
        axios.get('http://localhost:8000/users/' + data['pk'] + '/games').then(getUserGamesResponse => {
          const userGames = getUserGamesResponse.data
          store.dispatch({type: LOGIN, payload: {username: data['username'],id: data['pk'],email: data['email'],upvotedGames: upvotedGames,userGames: userGames}})
        })
      })
  }) 
}

