import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginForm from './components/signin'
import CreateAccount from "./components/signup"
import Home from "./components/home"
import GameForm from "./components/create_game_form"
import loadUserToStore from "./assets/utils/loaduser"
import ChangePassword from "./components/change_password_form"
import UserProfile from "./components/user_profile"
import EditForm from "./components/edit_game_form"
import loadGamesToStore from './assets/utils/loadgames';
import Header from "./components/header"
import GameDetail from "./components/game_detail"

function Routes(){

   loadGamesToStore()
   loadUserToStore()

    return (
      <>
        <Header/>
        <Router>
            <Switch>
                <Route path="/game/:id" component={GameDetail}/>
                <Route path="/login" component={LoginForm}/>
                <Route path="/signup" component={CreateAccount}/>
                <Route path="/create" component={GameForm}/>
                <Route path="/changepassword" component={ChangePassword}/>
                <Route path="/myprofile" component={UserProfile}/>
                <Route path="/edit" component={EditForm}/>
                <Route path="/" component={Home}/>
            </Switch>
        </Router>
      </>

    )

}

export default Routes;
