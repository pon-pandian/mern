import React, { useEffect, useLayoutEffect, useState } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/actionCreator/actionCreator';
import { ReactComponent as Sun } from "../assets/images/Sun.svg";
import { ReactComponent as Moon } from "../assets/images/Moon.svg";
import LoginImage from "../assets/images/LoginImage.png"
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
         <div className={`container-fluid login_outer_box ${theme === "light" ? "bg_light_blue" : "bg-secondary" }`}>
         <div className={`container pt-1 pb-2 login_inner_box ${theme === "light" ? "bg-light text-dark" : "bg-dark text-light" }`}>
         <div className="row">
         <div className="col-4">
         <div className='dark_mode m-4'>
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
            <div className="fs-2 mt-5 pb-5 fw-b d-flex-center">
                Sign In to Upload the XLS, PDF, Image 
            </div>
            <div className="fs-5 mt-1 ms-5 fw-b d-flex-center">
              To See the Datas and generate the Invoices...
            </div>
        </div>
        </div>
        <div className="col-4">
        <div className="mt-5">
                <img src={LoginImage} alt="LoginImage"/>
            </div>
        </div>
        <div className="col-4 d-flex align-items-end">
          <div className="ms-5 ps-5 mb-5">
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
       

         </div>
         </div>
        </div>
        </div>
       
        </>
        
       
    );
}

export default Login;