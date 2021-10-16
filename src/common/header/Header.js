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

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShow(prev=>!prev)
    }
    
    const isLoggedIn =false;
    
    return( 
            <div className="header">
            <img src={logo} className="rotate"/>
            {   
                !isLoggedIn &&
                <Button 
                    className="loginBtn rightBtn" 
                    variant="contained" 
                    name="Login" 
                    onClick={openModal}
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
                    onClick={openModal}
                >
                    LOGOUT
                </Button>
            }
            {
                show && 
                    <Button 
                        style={{marginRight:"1em"}} 
                        className="bookShowBtn rightBtn" 
                        variant="contained" color="primary" 
                        name="Book Show"
                    >
                        BOOK SHOW
                    </Button>
            }
            <Login show={show} setShow={setShow}></Login>
            </div> 
    );
}

