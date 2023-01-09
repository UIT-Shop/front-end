import React, { useState } from 'react'
import { variables } from '../Variables.js'
import axious from "axios"
import { Navigate, useNavigate } from 'react-router-dom';
import jwt from "jwt-decode"
import { Button } from 'bootstrap';

const Account = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfimPassword] = useState('');

    let navigate = useNavigate();
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
            email: email,
            password: password,
        }
        axious.post(url, data).then((result) => {
            localStorage.setItem("JWT", result.data['data']);
            alert("Đăng nhập thành công")
            navigate('/')
            axious.defaults.headers.post['Content-Type'] = 'application/json';
            axious.defaults.headers.post['Accept'] = 'application/json';
            axious.interceptors.request.use(function (config) {
                const token = localStorage.getItem('JWT');

                config.headers.Authorization = token ? `Bearer ${token}` : '';
                return config;
            });
        }).catch((error) => {
            alert(error)
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();

        const url = variables.AUTH + "register";
        const urlLogin = variables.AUTH + "login"
        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        axious.post(url, data).then((result) => {

            const Logindata = {
                email: email,
                password: password,
            }
            axious.post(urlLogin, Logindata).then((resultLogin) => {
                localStorage.setItem("JWT", resultLogin.data['data']);
                alert("Đăng ký thành công!")
                axious.defaults.headers.post['Content-Type'] = 'application/json';
                axious.defaults.headers.post['Accept'] = 'application/json';
                axious.interceptors.request.use(function (config) {
                    const token = localStorage.getItem('JWT');

                    config.headers.Authorization = token ? `Bearer ${token}` : '';
                    return config;
                });
                navigate('/')

            })
        })
            .catch((error) => {
            })
    }

    function showForm(a, e) {
        e.preventDefault();
        switch (a) {
            case 1:
                document.getElementById("sign-in").style.display = "block";
                document.getElementById("sign-up").style.display = "none";
                break;
            case 2:
                document.getElementById("sign-in").style.display = "none";
                document.getElementById("sign-up").style.display = "block";
                break;
            default:
                document.getElementById("sign-in").style.display = "none";
                document.getElementById("sign-up").style.display = "none";
                break;
        }
    }

    function login() {
        var LoginForm = document.getElementById("LoginForm");
        var RegForm = document.getElementById("RegisterForm");
        var Indicator = document.getElementById("Indicator");
        RegForm.style.transform = "translateX(300px)";
        LoginForm.style.transform = "translate(300px)";
        Indicator.style.transform = "translate(0px)";
        setEmail("");
        setPassword("");
    }
    function register() {
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
            {/* <div className="account-page">
                <div className="container">
                    <div className="row">
                        <div className="col-2">
                            <img src="images/image1.png" width="100%" alt="" />
                        </div>
                        <div className="col-2">
                            <div className="form-container">
                                <div className="form-btn">
                                    <span onClick={login}>Login</span>
                                </div>
                                <form id='LoginForm' onSubmit={(e) => handleLogin(e)} action>
                                    <input type="email" placeholder='Email' onChange={(e) => handleEmailChange(e.target.value)} />
                                    <input type="password" placeholder='Password' onChange={(e) => handlePasswordChange(e.target.value)} />
                                    <button type='submit' className='btn btn-primary'>Login</button>
                                    <button className='btn'>Forgot password</button>
                                </form>
                                <form id='RegisterForm' onSubmit={(e) => handleRegister(e)} action>
                                    <input type="email" placeholder='Email' onChange={(e) => handleEmailChange(e.target.value)} />
                                    <input type="password" placeholder='Password' onChange={(e) => handlePasswordChange(e.target.value)} />
                                    <input type="password" placeholder='Confirm Password' onChange={(e) => handleConfirmPasswordChange(e.target.value)} />
                                    <button className='btn btn-primary' >Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="maincontainer">
                <div class="container-fluid">
                    <div class="row no-gutter">

                        <div class="col-md-6 ">
                            <div className='align-items-center py-5'>
                                <img className='w-75' src='images/thrift-shop-rafiki.png'></img>

                            </div>
                        </div>

                        <div class="col-md-6 bg-light">
                            <div class="login d-flex align-items-center py-5">

                                <div class="container mt-5 mb-5">
                                    <div class="row">
                                        <div class="col-lg-10 col-xl-7 mx-auto">
                                            <form id='sign-in' onSubmit={(e) => handleLogin(e)}>
                                                <h3 class="display-4">Đăng nhập</h3>
                                                <p class="text-muted mb-4">Đăng nhập vào hệ thống</p>
                                                <div class="mb-3">
                                                    <input id="inputEmail" onChange={(e) => handleEmailChange(e.target.value)} type="email" placeholder="Email" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                                </div>
                                                <div class="mb-3">
                                                    <input id="inputPassword" onChange={(e) => handlePasswordChange(e.target.value)} type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                                </div>
                                                {/* <div class="form-check">
                                                    <input id="customCheck1" type="checkbox" checked class="form-check-input" />
                                                    <label for="customCheck1" class="form-check-label">Remember password</label>
                                                </div> */}
                                                <div class="d-grid gap-2 mt-4">
                                                    <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Đăng nhập</button>
                                                </div>
                                                <div class="d-grid gap-2 mt-2">
                                                    <button className='btn' onClick={e => showForm(2, e)}>Đăng ký</button>
                                                </div>
                                                <div class="d-grid gap-2 mt-2">
                                                    <button className='btn'>Quên mật khẩu</button>
                                                </div>
                                            </form>

                                            <form id='sign-up' onSubmit={(e) => handleRegister(e)}>
                                                <h3 class="display-4">Đăng ký</h3>
                                                <p class="text-muted mb-4">Tạo một tài khoản mới cho bạn</p>
                                                <div class="mb-3">
                                                    <input id="inputEmail" onChange={(e) => handleEmailChange(e.target.value)} type="email" placeholder="Email" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                                </div>
                                                <div class="mb-3">
                                                    <input id="inputPassword" onChange={(e) => handlePasswordChange(e.target.value)} type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                                </div>
                                                <div class="mb-3">
                                                    <input id="inputPassword" onChange={(e) => handleConfirmPasswordChange(e.target.value)} type="password" placeholder="Confirm Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                                </div>
                                                {/* <div class="mb-3">
                                                    <input id="inputPassword" type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Phone number" required="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                                </div> */}
                                                {/* <div class="form-check">
                                                    <input id="customCheck1" type="checkbox" checked class="form-check-input" />
                                                    <label for="customCheck1" class="form-check-label">Remember password</label>
                                                </div> */}
                                                <div class="d-grid gap-2 mt-4">
                                                    <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Đăng ký</button>
                                                </div>
                                                <div class="d-grid gap-2 mt-2">
                                                    <button className='btn' onClick={e => showForm(1, e)}>Đăng nhập</button>
                                                </div>
                                                <div class="d-grid gap-2 mt-2">
                                                    <button className='btn'>Quên mật khẩu</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )

}

export default Account