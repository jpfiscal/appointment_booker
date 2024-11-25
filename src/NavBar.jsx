import React, {useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import './NavBar.css';
import userContext from "./userContext";

function NavBar({ logout }) {

    const currentUser = useContext(userContext);
    const navigate = useNavigate();
    const handleLogout = () =>{
        logout();
        navigate("/");
    }
    if (currentUser && !(currentUser.isProvider || currentUser.isAdmin)){
         //Menu items in the navbar for clients
        return (
            <div className="NavBar">
                <Navbar >
                    <NavLink to="/" className="navbar-brand">
                        Appointment Booker 
                    </NavLink>
                    <div className="menu-and-logout">
                        <Nav className="menuItems">
                            <NavItem>
                                <NavLink to="/about">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/services">Book an Appointment</NavLink>
                            </NavItem>
                        </Nav>
                        <button onClick={handleLogout} className="nav-link">
                            Log Out
                        </button>
                    </div>
                </Navbar>
            </div>
        )
    } else if (currentUser && (currentUser.isProvider || currentUser.isAdmin)){
        //Menu items in the navbar for providers and Admins
        return (
            <div className="NavBar">
                <Navbar >
                    <NavLink to="/" className="navbar-brand">
                        Appointment Booker 
                    </NavLink>
                    <div className="menu-and-logout">
                        <Nav></Nav>
                        <button onClick={handleLogout} className="nav-link">
                            Log Out
                        </button>
                    </div>
                </Navbar>
            </div>
        )
    }else {
        return (
            //Navbar for anyone not logged in
            <div className="NavBar">
            </div>
        )
    }
    
}

export default NavBar;