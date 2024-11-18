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
                <Navbar expand="md">
                    <NavLink to="/" className="navbar-brand">
                        Appointment Booker 
                    </NavLink>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink to="/about">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/services">Book an Appointment</NavLink>
                        </NavItem>
                        <NavItem>
                            <button onClick={handleLogout} className="nav-link">
                                Log Out
                            </button>
                            {/* <NavLink to="#" onClick={handleLogout}>Log Out</NavLink> */}
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    } else if (currentUser && (currentUser.isProvider || currentUser.isAdmin)){
        //Menu items in the navbar for providers and Admins
        return (
            <div className="NavBar">
                <Navbar expand="md">
                    <NavLink to="/" className="navbar-brand">
                        Appointment Booker 
                    </NavLink>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <button onClick={handleLogout} className="nav-link">
                                Log Out
                            </button>
                            {/* <NavLink to="#" onClick={handleLogout}>Log Out</NavLink> */}
                        </NavItem>
                    </Nav>
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