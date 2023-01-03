import './App.css';
import Navbar from './common/header/NavBar'
import Footer from './common/footer/Footer';
import Home from './home/Home'
import Product from './home/Product'
import Account from './cart/Account'
import Cart from './cart/Cart'
import Detail from './home/Detail'
import Information from './cart/Information';
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import axios from "axios"
import Order from './cart/Order';
import OrderDetail from './cart/OrderDetail';
import { variables } from './Variables';




function App() {
  useEffect(() => {
    const url = variables.AUTH + "check-authen"
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.defaults.headers.post['Accept'] = 'application/json';
    axios.interceptors.request.use(function (config) {
      const token = localStorage.getItem('JWT');

      config.headers.Authorization = token ? `Bearer ${token}` : '';
      return config;
    });
    axios.get(url).then((result) => {
      console.log(result.status)
    }).catch((error) => {
      if (error.response.status == 401) {
        localStorage.removeItem('JWT')
      }
    })

  })
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Detail' element={<Detail />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/Account' element={<Account />}></Route>
          <Route path='/Information' element={<Information />}></Route>
          <Route path='/Cart' element={<Cart />}></Route>
          <Route path='/Order' element={<Order />}></Route>
          <Route path='/Order/:id' element={<OrderDetail />}></Route>
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
