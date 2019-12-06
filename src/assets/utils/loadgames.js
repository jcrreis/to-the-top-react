import axios from "./axios"
import store from "./store"
import {LOADGAMES,LOADGAMESWITHERROR} from "./constants"


export default function loadGamesToStore(){

  axios.get('http://localhost:8000/games/')
    .then((response) => {
      store.dispatch({type: LOADGAMES,payload: {games: response.data,isLoaded: true, error: false}})    
    })
    .catch(() => {
      store.dispatch({type: LOADGAMESWITHERROR,payload: {isLoaded: false, error: true}}) 
    })

}



