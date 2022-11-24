import './App.css';
import Navbar from './common/header/NavBar'
import Footer from './common/footer/Footer';
import Home from './home/Home'
import Product from './home/Product'
import Account from './cart/Account'
import Cart from './cart/Cart'
import Detail from './home/Detail'
import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";


function App() {
  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}
  const [user,setUser] = useState();
  useEffect(() => {
     setUser(parseJwt(sessionStorage.getItem("JWT")));
  
    },[]);
  return (
    <>
    <Router>
      <Navbar value={user}/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Detail' element={<Detail/>}></Route>
      <Route path='/product' element = {<Product/>}></Route>
      <Route path='/Account' element = {<Account/>}></Route>
      <Route path='/Cart' element = {<Cart/>}></Route>
      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
