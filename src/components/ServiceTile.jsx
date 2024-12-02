import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/serviceTile.css';

function ServiceTile({ id, name, group, description, price, duration }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${id}/availability`);
    };
    
    return (
        <div className="ServiceTile" id={"service_" + id} onClick={handleClick} style={{ cursor: 'pointer' }}>
            <h2>{name}</h2>
            <p><span>Service Type: </span>{group}</p>
            <p><span>Description: </span>{description}</p>
            <p><span>Price: </span>${price}</p>
            <p><span>Duration: </span>{duration} hours</p>
        </div>
    );
}

export default ServiceTile;