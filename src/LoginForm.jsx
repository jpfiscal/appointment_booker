import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';

function LoginForm({login}){
    const navigate = useNavigate();
    const INITIAL_STATE = {
        email: '',
        password : ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = (e) => {
        const {name, value} = e.target;
        
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        login(formData.email, formData.password);
        setFormData(INITIAL_STATE);
        navigate("/"); //go back to the homepage after submitting the login form
    }
    return(
        <div className="LoginForm">
            <form onSubmit={handleSubmit}>
                <div className="InputGroup">
                    <label>Email: </label>
                    <input 
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
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
                <button id="btn_LoginSubmit" type="submit">Submit</button>
            </form>
        </div>
        
    )
}

export default LoginForm;