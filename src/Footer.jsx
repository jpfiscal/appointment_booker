import React, {useContext} from "react";
import './NavBar.css';
import userContext from "./userContext";
import InstagramIcon from '@mui/icons-material/Instagram';
import './footer.css';

function Footer(){
    const currentUser = useContext(userContext);

    
        if (currentUser){
            return (
                <footer>
                    <h3>Got any questions? Contact us:</h3>
                    <p><span>contact: </span>info@marveleyes.ca</p>
                    <p><span>IG:</span><a href="https://www.instagram.com/"><InstagramIcon fontSize="large"></InstagramIcon></a></p>
                </footer>
            )
        } else {
            <div className="Footer"></div>
        }
        
}

export default Footer;