import logo from "../../assets/logo.svg";
import "./Header.css";
import Button from '@material-ui/core/Button';
import {Router, Link, Route, Switch } from 'react-router-dom';
import { useState } from "react";
import BookShow from "../../screens/bookshow/BookShow";
import Modal from "react-modal";
import Login from "../../screens/login/Login";

export default function Header() {

    const [show, setShow] = useState(false);
    
    const isLoggedIn =false;
    
    return(
        // <Router> 
            <div className="header">
            <img src={logo} className="rotate"/>
            {   
                !isLoggedIn &&
                <Button 
                    className="loginBtn rightBtn" 
                    variant="contained" 
                    name="Login" 
                    onClick={() => setShow(prev => !prev)}
                >
                    LOGIN
                </Button>
            }
            {   
                isLoggedIn &&
                <Button 
                    className="logoutBtn rightBtn" 
                    variant="contained" 
                    name="Logout"
                    onClick={() => setShow(prev => !prev)}
                >
                    LOGOUT
                </Button>
            }
            {
                show && 
                // <Link to="/show">
                    <Button 
                        style={{marginRight:"1em"}} 
                        className="bookShowBtn rightBtn" 
                        variant="contained" color="primary" 
                        name="Book Show"
                    >
                        BOOK SHOW
                    </Button>
                // </Link>
            }
             {/* <Switch>
                <Route exact path="/login" render={(props)=><Login {...props}/>}/>
                {   isLoggedIn && 
                    <Route exact path="/show" render={(props)=><BookShow {...props}/>}/>
                }
            </Switch> */}
            </div> 
        // </Router>  
    );
}