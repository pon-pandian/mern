import React, { useEffect, useState } from "react";
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { persistor } from "../redux/store/store"
import { logoutAction } from '../redux/actionCreator/actionCreator';
import { ReactComponent as Sun } from "../assets/images/Sun.svg";
import { ReactComponent as Moon } from "../assets/images/Moon.svg";
import "../DarkMode.css";
import Upload from "./upload";


const Home = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    const handleLogout = () => {
        googleLogout();
        navigate("/");
        persistor.purge();
        dispatch(logoutAction());
    }

    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
      });
    
      useEffect(() => {
        localStorage.setItem("theme", theme);
      }, [theme]);
    
      const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      };

    return (
        <>
      
        <div className={`App ${theme}`}>
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
            <p>Iam Home</p>
            <button onClick={()=> handleLogout()}>Logout</button> 
            <Upload />  
        </div>
        <Upload />  
       
        </>
        
       
    );
}

export default Home;