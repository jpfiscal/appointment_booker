import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/SignUpForm.css';

function SignUpForm({signup}){
    const navigate = useNavigate();
    const INITIAL_STATE = {
        name: '',
        password : '',
        email : '',
        phone : ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const validatePhoneNumber = (phoneNum) => {
        const phoneRegex = /\(\d{3}\) \d{3}-\d{4}/;
        return phoneRegex.test(phoneNum);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        //reset errors array and errorMessages before checking the fields again
        setErrorMessages([]);
        let errors = [];

        //validate that Fullname is filled out
        if (formData.name.length < 1){
            errors.push("Full name field is blank");
        }

        //validate password:
        if (!validatePassword(formData.password)) {
            errors.push("Password must be at least 8 characters long and include at least one letter and one number");
        }

        //validate email
        if (!validateEmail(formData.email)){
            errors.push("Email is required and must be a valid email format e.g.) user@email.com");
        }

        //validate phone number is in the right format
        if (!validatePhoneNumber(formData.phone)) {
            errors.push("Phone number is required in the following format: (###) ###-####");
        }
        console.log(errors);

        //check if there are any error messages in the error messages array
        if (errors.length > 0){
            setErrorMessages(errors);
            return;
        }

        await signup(formData.name, formData.password, formData.email, formData.phone, "client");
        setFormData(INITIAL_STATE);
        navigate("/accountInfo"); //go to the account info to create a client/provider entry
    }
    return(
        <div className="SignupForm">
            <h1>Sign Up</h1>
            {errorMessages && <ul className="error">{errorMessages.map((errorMsg)=><li>{errorMsg}</li>)}</ul>}
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