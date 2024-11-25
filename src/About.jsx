import React from "react";
import "./about.css";

function About(){
    return (
        <div className="AboutPage">
            <div className="Description">
                <h1>About Marveleyes</h1>
                <p>Founded in 2019, Marveleyes brings a background spanning 
                    Graphic Design, Product Development, and a foundation in Healthcare education, 
                    bringing a blend of creativity and expertise to the beauty industry. 
                    The journey has been marked by a relentless pursuit of excellence, driven 
                    by passion for design and commitment to enhancing lives.</p>

                <p>Marveleyes started in Toronto where the brand and services were deveoped and grown, 
                    performing over 2000 procedures over 5+ years 
                    and achieving a loyal following of hundreds of customers. After moving to Calgary, 
                    We are eager to bring our unique vision to a new audience. Our ambition doesn't 
                    end with relocation, we are an ongoing commitment to innovation and education.</p>

                ​<p>We are devoted to pushing the boundaries of beauty, continually seeking new 
                    knowledge and techniques to deliver nothing but the best for our clients. 
                    Beyond serving clients, our mission is to empower individuals to discover their 
                    inner artist. Together, let's embark on this journey to make a more beautiful world!</p>
            </div>
            <div className="LashCertifications">
                <h2>Lash Training & Certifications</h2>
                <ul>
                    <li>Xtreme Lashes Canada - Classic Lashing</li>
                    <li>Xtreme Lashes Canada - Advance Styling </li>
                    <li>Xtreme Lashes Canada - Russian Volume Lashing</li>
                    <li>Lash Pro Academy (Debbie Vo) - Russian Volume</li>
                    <li>Bombchelle Beauty - The Art of Styling</li>
                    <li>Lashlikha - The Art of Styling</li>
                    <li>Lash Pro Academy - Lash Lift 360°</li>
                    <li>BKO Lash Club (Vicki Zhang) - Advance Signature Styling 1:1</li>
                </ul>
            </div>
            <div className="TattooCertifications">
                <h2>PMU Tattoo Training & Certifications</h2>
                <ul>
                    <li>The Lash Shop - Brow Lift (Lamination) and Tint</li>
                    <li>Permanent Beauty By Lili - Nano, Powder Ombré, Combo Brow Training</li>
                    <li>Permanent Beauty By Lili - Advance Brow Creation</li>
                    <li>Hennatician -  Henna Brows</li>
                    <li>Hoi - Nano Mastery</li>
                    <li>Buona Beauty - Lip Blush</li>
                    <li>Tessa Hoang - 1:1 Hyper Realism with Nano Brows</li>
                </ul>
            </div>
            <div className="Awards">
                <h2>Awards</h2>
                <ul>
                    <li>Xtreme Lashes Canada - 1st place in Lash Contest Challenge 2019</li>
                </ul>
            </div>
            <footer>
                <h2>Got any questions? Contact us:</h2>
                <p>contact: info@marveleyes.ca</p>
                <p>ig: @marveleyes</p>
            </footer>
        </div>
    )
}
export default About;