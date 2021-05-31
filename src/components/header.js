import React from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import ListIcon from '@material-ui/icons/List';

const Header = () => {
    return (
        <div className="header">
          <Link to='/home'>
            <div className="logo"/>
          </Link>
          <div className="upload-container">
            <div className="section">
              <Link to='/upload'>
                <div className="upload" />
              </Link>
            </div>
          </div>
          <div className="navbar-nav mr-auto">
            <li className="list-btn">
              <Link to={"/list"} className="nav-link">
              <ListIcon fontSize="large"/>
              </Link>
            </li>
          </div>

        </div>
      )
}
 export default Header
