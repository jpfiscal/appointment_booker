import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUpForm.css';

function SignUpForm({signup}){
    const navigate = useNavigate();
    const INITIAL_STATE = {
        name: '',
        password : '',
        email : '',
        phone : ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData.name, formData.password, formData.email, formData.phone, "client");
        setFormData(INITIAL_STATE);
        navigate("/accountInfo"); //go to the account info to create a client/provider entry
    }
    return(
        <div className="SignupForm">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="InputGroup">
                    <label>Full Name: </label>
                    <input 
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter Full Name"
                        value={formData.name}
                        onChange={handleChange}
                    />    
                </div>
                <div className="InputGroup">
                    <label>Password: </label>
                    <input 
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                    />    
                </div>
                <div className="InputGroup">
                    <label>Email: </label>
                    <input 
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />    
                </div>
                <div className="InputGroup">
                    <label>Phone: </label>
                    <input 
                        id="phone"
                        type="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                    />    
                </div>
                <button>Submit</button>
            </form>
        </div>   
    )
}

export default SignUpForm;