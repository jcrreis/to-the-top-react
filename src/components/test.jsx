import React, { Component } from "react";
import axios from "axios";
// function Message({message}){
//         return <div>{message}</div>
// }
// function Message({message}){
//     return <div>{message? (<div>{message}</div>):
//     (<div>No Message</div>)}</div>
// }

// function tick(){
//     const time = new Date().toLocaleTimeString();
//     const element = (<div>It is <input value={time}/></div>)
//     return element;
// }


// function Css({style,...rest}){
//     return (<div className="box box--small" style={{paddingLeft:20,...style}}{...rest}>Smallbox</div>)
// }
class NameForm extends Component{
        constructor(props){
            super(props)
            this.state = {
                username: "",
                password: "",
                email: ""
            }
        }

    handleSubmit = event => {
        event.preventDefault()
    }

    handleUsernameChange = e =>{
         e.preventDefault()
         console.log(e.target.value)
         this.setState({username:e.target.value})
    }

    handlePasswordChange = e =>{
        e.preventDefault()
        this.setState({password:e.target.value})
    }

    handleEmailChange = e =>{
        e.preventDefault()
        this.setState({email:e.target.value})
    }

    handleOnClick = (event) =>{
        event.preventDefault()
        if(this.state.username === "" || this.state.password === "" || this.state.email === "")
            alert("invalid fields")
        else{
            const userData = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            }
            const response =  axios.post('http://localhost:8000/register/', userData);
            response.then(response => {
                console.log(response.data)
                alert("registration was sucessfull")
            })
            .catch(error => {
                alert("bad request")
            })
            }
        }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/>
                <input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange}/>
                <input type="text" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                <button type="submit" onClick={this.handleOnClick}>Register</button>
            </form>
        )

    }
}

class LoginForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

    handleSubmit = event => {
        event.preventDefault()
    }

    handleUsernameChange = e =>{
        e.preventDefault()
        console.log(e.target.value)
        this.setState({username:e.target.value})
    }

    handlePasswordChange = e =>{
        e.preventDefault()
        this.setState({password:e.target.value})
    }

    handleOnClick = (event) =>{
        event.preventDefault()
        if(this.state.username === "" || this.state.password === "" )
            alert("invalid fields")
        else{
            const data = {
                username: this.state.username,
                password: this.state.password
            }

            const response =  axios.post('http://localhost:8000/login/', data);
            console.log(response.status)
            response.then(response => {
                alert("you are now logged in with key: " + response.data.key )
                console.log(response)
            })
            .catch(error => {
                alert("bad request")
                console.log(response)
                console.log(error.message)
            })
        }
    }
    
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/>
                <input type="text" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
                <button type="submit" onClick={this.handleOnClick}>Login</button>
            </form>
        )
    }
}

class GameList extends Component{



    constructor(props){
        super(props)
        let isLoaded = false;
        let games = null;
        
    }

    componentDidMount(){
        games = axios.get('http://localhost:8000/games/')
        .then(function (response) {
            this.setState({
                isLoaded = true,
            })  
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }





   render(){    
           return( <ul>
               {/* {this.state.listGames}                 listGames = this.state.games.map((g) => <li >{g.name}</li>),*/} 
                </ul>);

    }
}

class Game extends Component{

    constructor(props){
        super(props)
        this.state = {
            name: "",
            price: "",
            description: "",
            storeLink: "",
            trailerUrl: ""
        }
    }

handleSubmit = event => {
    event.preventDefault()
}

handleUsernameChange = e =>{
     e.preventDefault()
     console.log(e.target.value)
     this.setState({name:e.target.value})
}

handlePasswordChange = e =>{
    e.preventDefault()
    this.setState({price:e.target.value})
}

handleEmailChange = e =>{
    e.preventDefault()
    this.setState({description:e.target.value})
}

storeLinkChange = e =>{
    e.preventDefault()
    this.setState({storeLink:e.target.value})
}

trailerUrlChange = e =>{
    e.preventDefault()
    this.setState({trailerUrl:e.target.value})
}

handleOnClick = (event) =>{
    event.preventDefault()
    
        const userData = {
            name: this.state.username,
            price: this.state.password,
            description: this.state.email,
            trailerUrl: this.state.trailerUrl,
            storeUrl: this.state.storeLink

        }
        const response =  axios.post('http://localhost:8000/register/', userData);
        response.then(response => {
            console.log(response.data)
            alert("registration was sucessfull")
        })
        .catch(error => {
            alert("bad request")
        })
        }
render(){
    return(
        <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="username" value={this.state.username} onChange={this.handleUsernameChange}/>
            <input type="text" placeholder="email" value={this.state.email} onChange={this.handleEmailChange}/>
            <input type="text" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/>
            <input type="text" placeholder="trailerUrl" value={this.state.trailerUrl} onChange={this.trailerUrlChange}/>
            <input type="text" placeholder="storeLink" value={this.state.storeLink} onChange={this.storeLinkChange}/>
            <button type="submit" onClick={this.handleOnClick}>Register Game</button>
        </form>
    )

}

}

    export default class Test extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
       eventCount: 0,
      };
    }

    increment = () => {
        this.setState({eventCount: this.state.eventCount+1})
    }

    render() {
      return (
        //   <Message message="ola"/>
        // <Message />
        //tick()
        // setInterval(tick,1000)
        // <div>
        /* /* <p style={{padding:20}}> There have been {this.state.eventCount} events</p>
        <button style={{marginLeft:20}} onClick={this.increment}>Try this Button</button>
        <div/> * */
        //     <Css style={{backgroundColor:'lightblue'}}>smallbox</Css>
        // </div>
        <>
        <LoginForm/>
        <NameForm/>
        <GameList/>
        <Game/>
        </>
      )
    }
  }