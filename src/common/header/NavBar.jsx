import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import './NavBar.module.css'
import axious from "axios"
import { variables } from '../../Variables'

const NavBar = () => {
    const [Authenticated, setAuth] = useState(false)
    const [json, setJson] = useState({})
    const [user, setUser] = useState({})
    const [categories, setCategories] = useState({})
    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };


    const FetchUser = (userID) => {
        const url = variables.API_URL + "User/" + userID
        const data = { "userID": parseInt(userID) }
        axious.get(url, data).then((result) => {
            setUser({ "email": result.data['data']['email'] }
            )
        })
    }
    const logOut = (e) => {

        localStorage.removeItem('JWT')
        window.location.reload()

    }
    const FetchCategory = () => {
        const url = variables.API_URL + "Category"
        axious.get(url).then((result) => {
            setCategories(result.data)
        }).catch((error) => {
            console.log(error)
        })
    }




    useEffect(() => {
        if (localStorage.getItem("JWT") != null) {
            setAuth(true)
        }
        FetchCategory()

    }, [])



    return (
        <>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary p-0    ">
                <div className="container-fluid">
                    <Link to="/"><a className="navbar-brand" href="#">UIT Shop</a></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav me-auto">
                            {/* <li className="nav-item">
                                <a className="nav-link active" href="#">Home
                                    <span className="visually-hidden">(current)</span>
                                </a>
                            </li> */}
                            <li className="nav-item">
                                <Link to="/product/Nam" state={categories}><a className="nav-link" href="#">Nam</a></Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/product/Nữ" state={categories}><a className="nav-link" href="#">Nữ</a></Link>
                            </li>
                            {/* <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Separated link</a>
                                </div>
                            </li> */}
                        </ul>



                        {Authenticated ?
                            <ul className="navbar-nav mr-5">
                                <li class="dropdown">
                                    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-user fa-2x"></i></a>
                                    <div class="dropdown-menu">
                                        <Link to="/userinformation"><a class="dropdown-item" href="#">Thông tin người dùng</a></Link>
                                        <Link to="/Order"><a class="dropdown-item" href="#">Đơn đặt hàng</a></Link>
                                        <button class="btn" onClick={(e) => logOut(e)}>Đăng xuất</button>
                                    </div>
                                </li>
                                <li><span style={{ paddingLeft: "20px" }}></span></li>
                                <li ><Link className='nav-link' to="/Cart"><i class="fa fa-shopping-cart fa-2x" aria-hidden="true"></i></Link></li>
                                <li><span style={{ paddingRight: "100px" }}></span></li>
                            </ul>

                            :
                            <ul className="navbar-nav mr-5">
                                <li className='container d-flex align-items-center justify-content-center'>

                                    <Link to="/login"> <button type="button" class="btn btn-light align-middle">Đăng nhập</button></Link>
                                </li>
                            </ul>
                        }



                    </div>
                </div>
            </nav>
            {/* <!-- Sidenav --> */}

            {/* <div className="container">
                <div className='navbar'>
                    <nav>
                        <ul id='MenuItems'>
                            <li><Link to="/"><h2>UIT Shop</h2></Link></li>
                            <li><Link to="/product" state={categories}>Man</Link></li>
                            <li><Link to="/product">Woman</Link></li>
                            <li><Link to="/product">Baby</Link></li>
                        </ul>
                        
                    </nav>
                    <nav className='RightSide'>
                        <ul id='rightMenu'>
                            <li>
                            {Authenticated ? <h4>{user['email']}</h4>
                            : <Link to="/Account"><img src="images/user.png" width="20px" height="20px" alt="" /></Link>}
                            
                            </li>
                            <li><Link to="/Cart"><img src="images/cart.png" width="20px" height="20px" alt="" /></Link></li>
                            <li><Link to="/Search"><img src="images/search.png" width="20px" height="20px" alt="" /></Link></li>
                            <li></li>
                        </ul>
                    </nav>
                    <img src="images/menu.png" alt='' className='menu-icon' onClick={() => {

                        // if(MenuItems.style.maxHeight === "0px")
                        // {
                        //     MenuItems.style.maxHeight = "200px";
                        // }
                        // else
                        // {
                        //     MenuItems.style.maxHeight = "0px"
                        // }
                    }} />
                </div>
            </div> */}
        </>
    )
}

export default NavBar