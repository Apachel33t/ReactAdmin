import React, {Component} from 'react'
import './App.css'
import Auth from './Pages/Auth'
import MainPanel from './Pages/MainPanel'

const Globals = {
  isAuth: false,
  username: '',
  login: '',
  password: '',
  action: ''
};

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: false,
      action: '',
      login: '',
      password: '',
      username: '',
      rights: ''
    }
  }

  componentDidUpdate() {
    let password = String(this.state.password)
    let login = String(this.state.login)
    let username = String(this.state.username)
    if(Globals.isAuth === this.state.isAuth) {
      console.log("is auth?:" + Globals.isAuth)
    }
    else if(login.length >= 5 && password.length >= 5) {
      let object = ({login: login, password: password, username: username})
      let req = "http://test.ru/adminAuth/"+JSON.stringify(object)
      fetch(req, {
        method: "GET",
      })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data !== false) {
          this.setState({login: data.login, username: data.username, rights: data.rights})
          this.setState({isAuth:true})
          login = this.state.login
        } else {
          alert('Login or password is wrong.')
        }
      })
    }
  }

  logout = (data) => {
    this.setState(data)
    this.setState({login: ''})
    Globals.isAuth = false;
    Globals.username = '';
  }
  authentication = (data) => {
    this.setState({action: data.type, login: data.login, password: data.password})
    if(data.username) {
      this.setState({username: data.username})
    }
  }
  
  render() {
    const items = this.state
    Globals.username = items.username
    Globals.login = items.login
    Globals.isAuth = true
    return (
      <div className="wrapper">
        {this.state.isAuth ? <MainPanel login={this.state} logout={this.logout}/> : <Auth send={this.authentication}/>}
      </div>
    ) 
  }
}

export default App
