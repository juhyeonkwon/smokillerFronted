import React from 'react';
import { Link, Route } from 'react-router-dom';


//import './css/Sidenav.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container, Nav } from 'react-bootstrap';
import {BiChalkboard, BiPhotoAlbum} from "react-icons/bi";


function Sidenav() {
    


    return (
        <div className="side_nav">

            <div className="logo">Smokiller</div>

            <div>
                <ul>
                    <li>
                    <BiChalkboard />  
                        <Link to="/">Home</Link>        
                    </li>
                    <li>
                    <BiPhotoAlbum />
                        <Link to="/login">login</Link>      
                    </li>
                    <li>
                        <Link to="/signup">signup</Link>      
                    </li>

                </ul>
            </div>


            



        </div>
    );
};



export default Sidenav();



