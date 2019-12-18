import React, { Component } from "react";

import Header from "./header"
import GameList from "./game_list"

export default class Home extends Component{

  render(){
    return(
      <>
        <GameList/>
      </>
    )
  }
}
