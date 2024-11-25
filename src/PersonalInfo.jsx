import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "./userContext";
import ServerApi from './api/api';
import './personalInfo.css';

function PersonalInfo(){
    const currentUser = useContext(userContext);
    const navigate = useNavigate();

    const INITIAL_STATE = {
        name: '',
        gender: '',
        birthday: '',
        address: '',
        city: '',
        state: ''
    };
    
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchClientData() {
            try {
                const currClient = await ServerApi.getClient(currentUser.email);
                if (currClient) {
                    setFormData({
                        client_id: currClient.client_id || '',
                        name: currClient.name || '',
                        gender: currClient.gender || '',
                        birthday: currClient.birthday ? currClient.birthday.slice(0, 10) : '',
                        address: currClient.address || '',
                        city: currClient.city || '',
                        state: currClient.state || ''
                    });
                }
            } catch (err) {
                console.error("Error fetching client data:", err);
            } finally {
                setLoading(false); // Stop loading once data is fetched
            }
        }
        fetchClientData();
    }, [currentUser.email]);

    const handleChange = (e) => { 
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.client_id){
            // if it doesn't exist, call CreateClient
            const newClient = await ServerApi.createClient(
                currentUser.accountId
                , formData.gender
                , formData.birthday
                , formData.address
                , formData.city
                , formData.state
            )
            console.log(`Client Created: ${newClient}`);
        } else {
            // if exists, call UpdateClient
            const updateClient = await ServerApi.updateClient(
                formData.client_id
                ,formData.gender
                , formData.birthday
                , formData.address
                , formData.city
                , formData.state
            )
            console.log(`Client Updated: ${updateClient}`);
        }
        
        setFormData(INITIAL_STATE);
        navigate("/"); //go to the homepage after submitting the signup form
    }

    //display based on account type = "client"
    if (currentUser && !(currentUser.isProvider || currentUser.isAdmin)){
        return (
            <div className="PersonalInfo">
                <h1>Personal Info</h1>
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
                        <label>Gender: </label>
                        <input 
                            id="gender"
                            type="text"
                            name="gender"
                            placeholder="Enter Gender"
                            value={formData.gender}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="InputGroup">
                        <label>Birthday: </label>
                        <input 
                            id="birthday"
                            type="date"
                            name="birthday"
                            placeholder="Enter Birthday (YYYY-MM-DD)"
                            value={formData.birthday}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="InputGroup">
                        <label>Address: </label>
                        <input 
                            id="address"
                            type="text"
                            name="address"
                            placeholder="Enter Street Address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="InputGroup">
                        <label>City: </label>
                        <input 
                            id="city"
                            type="text"
                            name="city"
                            placeholder="Enter City"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="InputGroup">
                        <label>State: </label>
                        <input 
                            id="state"
                            type="text"
                            name="state"
                            placeholder="Enter State/Province"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </div>
                    <button>Submit</button>
                </form>

            </div>
        );
    //display based on account type = "provider" OR "admin"
    } else if (currentUser && (currentUser.isProvider || currentUser.isAdmin)){
        return (
            <div className="PersonalInfo">
                
            </div>
        );
    } else {
        navigate("/");
    }
    
}

export default PersonalInfo;