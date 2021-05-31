import React, { Component } from "react";
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from './login/login.component.js';
import Register from "./login/register.component";
import Home from './pages/home.js';
import Upload from './pages/upload'
import List from './components/tutorial-list.component'
import ListIcon from "@material-ui/icons/List";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

class App extends Component {

  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }


  state = {user:false}

  render() {

    const { currentUser } = this.state;

    return (
        <div>
          <div className="container mt-3">
            <BrowserRouter>
              <div className="header">
                <Link to='/home'>
                  <div className="logo"/>
                </Link>
                    {currentUser && (
                          <div className="margen">
                            {currentUser.username}
                          </div>
                    )}

                    {!currentUser && (
                        <div className="margen">
                          <Link to={"/login"} >
                              <p className="text-dark">Iniciar Sesión</p>
                          </Link>
                        </div>
                    )}

                    {!currentUser && (
                        <div className="margen">
                            <Link to={"/register"} >
                               <p className="text-dark">Registrar</p>
                            </Link>
                        </div>
                    )}

                    {currentUser && (
                        <Link to='/upload'>
                          <p className="text-dark">
                            <CloudUploadIcon fontSize="large" />
                          </p>
                        </Link>
                    )}
                  {currentUser && (
                        <div>
                          <Link to={"/list"}>
                           <p className="text-dark">
                             <ListIcon fontSize="large"/>
                           </p>
                          </Link>
                        </div>
                  )}

                    {currentUser && (
                          <a href="/login" className="text-dark"  onClick={this.logOut}>
                            <ExitToAppIcon fontSize="large"/>
                          </a>
                    )}
              </div>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/list" component={List}/>
                <Route exact path= "/upload" component={Upload}/>
              </Switch>
            </BrowserRouter>
          </div>
        </div>
    );
  }
}

export default App;

