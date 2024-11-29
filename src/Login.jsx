import React from "react"
import LoginForm from "./LoginForm"
import './login.css';

function Login({login, signup}){
    return(
        <div className="Login">
            <h1>Sign in</h1>
            <LoginForm login={login}/>
        </div>
    )
}

export default Login;