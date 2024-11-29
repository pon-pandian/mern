import React, { useEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/actionCreator/actionCreator';
import { ReactComponent as Sun } from "../assets/images/Sun.svg";
import { ReactComponent as Moon } from "../assets/images/Moon.svg";
import "../DarkMode.css";


const Login = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    console.log(jwtDecode(credentialResponse.credential));
                    const token = jwtDecode(credentialResponse.credential);
                    dispatch(loginAction(token));    
                    navigate("/home");
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />

        </div>
       
        </>
        
       
    );
}

export default Login;