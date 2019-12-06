import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {UPVOTE,LOADGAMESWITHERROR,LOADGAMES,DOWNVOTE,LOGIN,LOGOUT,SORTBYUPVOTEDESCENDING,SORTBYUPVOTEASCENDING,DELETEGAME,EDITGAME,ADDGAME} from './constants'



Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


const initialState = {games:[],user: undefined,upvotedGames: [],userGames: []}

function reducer(state=initialState, action){

  switch(action.type){

    case UPVOTE:{
      return{
        ...state,
        games: state.games.map((game) => (game.id == action.payload.gameid ? {...game, upvotes: game.upvotes + 1}: game)),
        upvotedGames: [...state.upvotedGames,action.payload.gameid]
      }
    }

    case LOADGAMES:{
      return {
        ...state,
        games: action.payload.games,
        isLoaded: action.payload.isLoaded,
        error: action.payload.error
      }
    }

    case LOADGAMESWITHERROR:{

      return {
        ...state,
      }
    }

    case DOWNVOTE:{
      return{
        ...state,
        games: state.games.map((game) => (game.id == action.payload.gameid ? {...game, upvotes: game.upvotes - 1}: game)),
        upvotedGames: state.upvotedGames.slice(0).remove(action.payload.gameid)
      }
    }

    case LOGIN:{
      return{
        ...state,
        username: action.payload.username,
        id: action.payload.id,
        email: action.payload.email,
        upvotedGames: action.payload.upvotedGames,
        userGames: action.payload.userGames,
      }
    }

    case LOGOUT:{
      return{
        ...state, 
        username: undefined,
      }
    }

    case SORTBYUPVOTEDESCENDING:{
      return{
        ...state,
        games: state.games.slice(0).sort((g1, g2) => g2.upvotes - g1.upvotes),
      }
    }

    case SORTBYUPVOTEASCENDING:{
      return{
        ...state,
        games: state.games.slice(0).sort((g1, g2) => g1.upvotes - g2.upvotes),
      }
    }

    case DELETEGAME:{
      return{
          ...state,
          games: state.games.filter(game => game.id != action.payload.gameid) ,
          upvotedGames: state.upvotedGames.filter(game => game.id != action.payload.gameid),
          userGames: state.userGames.filter(game => game.id != action.payload.gameid),
      }
    }
    case EDITGAME:{
      return{
          ...state,
          userGames: state.userGames.map((game)=> game.id === action.payload.gameid ? {...game,...action.payload.gameData} : game )
      }
    }
    case ADDGAME:{
      return{
          ...state,
          games: [...state.games, action.payload.game],
          userGames: [...state.userGames, action.payload.game],
      }
    }
  }

  return state
}

const store = createStore(reducer,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));




export default store