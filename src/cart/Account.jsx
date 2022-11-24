import React, { useState } from 'react'
import {variables} from '../Variables.js'
import axious from "axios"
import { useNavigate } from 'react-router-dom';
import jwt from "jwt-decode"

const Account = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfimPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (value) => {
        setEmail(value);
    }
    const handlePasswordChange = (value) => {
        setPassword(value);
    }
    const handleConfirmPasswordChange = (value) => {
        setConfimPassword(value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const url = variables.AUTH + "login"
        const data = {
            email:  email,
            password: password,
        }
        axious.post(url,data).then((result) => {
            console.log(result.data)
            alert(result.status)
            sessionStorage.setItem("JWT",result.data);
        })
    }
    
    const handleRegister = (e) => {
        e.preventDefault();
        const url = variables.AUTH + "register";
        const urlLogin = variables.AUTH + "login"
        const data = {
            email:  email,
            password: password,
            confirmPassword: confirmPassword
        }

        axious.post(url,data).then((result) => {

                const Logindata = {
                    email:  email,
                    password: password,
                }
                axious.post(urlLogin,Logindata).then((resultLogin) => {
                    sessionStorage.setItem("JWT",resultLogin.data);
                    
                    navigate("/")
                })

            
        })
        .catch((error) => {
            console.log(error);
        })
    }


    function login(){
        var LoginForm = document.getElementById("LoginForm");
        var RegForm = document.getElementById("RegisterForm");
        var Indicator = document.getElementById("Indicator");
        RegForm.style.transform = "translateX(300px)";
        LoginForm.style.transform = "translate(300px)";
        Indicator.style.transform = "translate(0px)";
        setEmail("");
        setPassword("");
    }
    function register(){
        var LoginForm = document.getElementById("LoginForm");
        var RegForm = document.getElementById("RegisterForm");
        var Indicator = document.getElementById("Indicator");
        RegForm.style.transform = "translateX(0px)";
        LoginForm.style.transform = "translate(0px)";
        Indicator.style.transform = "translate(100px)";
        setEmail("");
        setPassword("");
        setConfimPassword("");
    }
  return (
    <>
    <div className="account-page">
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <img src="images/image1.png" width="100%" alt="" />
                </div>
                <div className="col-2">
                    <div className="form-container">
                        <div className="form-btn">
                            <span onClick={login}>Login</span>
                            <span onClick={register}>Register</span>
                            <hr id='Indicator'/>
                        </div>
                        <form id='LoginForm' onSubmit={(e) => handleLogin(e)} action>
                            <input type="email" placeholder='Email' onChange={(e) => handleEmailChange(e.target.value)} />
                            <input type="password" placeholder='Password' onChange={(e) => handlePasswordChange(e.target.value)}/>
                            <button type='submit' className='btn'>Login</button>
                            <button >Forgot password</button>
                        </form>
                        <form id='RegisterForm' onSubmit={(e) => handleRegister(e)} action>
                            <input type="email" placeholder='Email' onChange={(e) => handleEmailChange(e.target.value)}/>
                            <input type="password" placeholder='Password' onChange={(e) => handlePasswordChange(e.target.value)}/>
                            <input type="password" placeholder='Confirm Password' onChange={(e) => handleConfirmPasswordChange(e.target.value)}/>
                            <button className='btn' >Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )

}

export default Account