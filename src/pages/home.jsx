import React, { useEffect, useState } from "react";
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../redux/store/store"
import { logoutAction } from '../redux/actionCreator/actionCreator';
import { ReactComponent as Sun } from "../assets/images/Sun.svg";
import { ReactComponent as Moon } from "../assets/images/Moon.svg";
import "../DarkMode.css";
import Upload from "./upload";
import { Button } from 'react-bootstrap';


const Home = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Selector = useSelector((item) => item.token.token.email);
    const { Name , Email } = Selector;
    console.log(Selector)
   
   
    const handleLogout = () => {
        googleLogout();
        navigate("/");
        persistor.purge();
        dispatch(logoutAction());
    }

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
      });

      const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      };

      useEffect(() => {
        localStorage.setItem("theme", theme);
      }, [theme]);

    return (
        <>
      
        <div className={`container-fluid  login_home_box ${theme === "light" ? "bg_light_blue" : "bg-secondary" }`}>
        <div className={`container pt-1 pb-2 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light" }`}>
    
        <div className="row bg-success mt-3 mb-3 ms-2 me-2">
   

        <div className="col-3">
          <a>Upload</a>

        </div>
        <div className="col-3">
          <a>Generate</a>

        </div>
        <div className="col-3">
          <a>Visualization</a>

        </div>
        <div className="col-3">
          <a>Carousel</a>

        </div>
      </div>

        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                checked={theme === "dark"}
                onChange={(e)=> toggleTheme(e)}
                
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
             <p>{Name}</p>
             <p>{Email}</p>
             <Button className="bg-dark btn btn-outline-danger" onClick={()=> handleLogout()}>Logout</Button> 
            <Upload />  




        </div>
        </div>
        
          
        </>
        
       
    );
}

export default Home;