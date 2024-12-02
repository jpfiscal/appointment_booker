import React from "react";
import "../styles/notFound.css";
import { useNavigate } from "react-router-dom";

function NotFound(){
    const navigate = useNavigate();
    const goHome = () => {navigate("/")};    

    return(
        <div className="NotFound">
            <img className="logo" src="assets/logo.jpg" alt="logo"></img>
            <h1>Page Not Found</h1>
            <h3>Sorry, we can't find that page. Head to the home page and see if we've got what you're looking for.</h3>
            <button onClick={goHome}>Marveleyes Home</button>
        </div>
    )
}

export default NotFound;