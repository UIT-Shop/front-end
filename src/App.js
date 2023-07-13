import './App.css';

import Home from './routes/Home'
import Product, { loader as productLoader } from './routes/Product'
import Account from './routes/Account'
import Cart from './routes/Cart'
import Detail from './routes/Detail'
import UserInformation from './routes/UserInformation';
import Order from './routes/Order';
import Information from './components/cart/Information';
import OrderDetail from './components/order/OrderDetail';
import RootLayout from './routes/RootLayout';

import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import axios from "axios"


import { variables } from './Variables';



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        // children: [
        //   {
        //     path: '/product',
        //     element: <Product />,
        //     children: [
        //       {
        //         path: '/detail',
        //         element: <Detail />
        //       }
        //     ]
        //   }
        // ]
      },
      {
        path: '/product/:gender',
        element: <Product />,
        errorElement: <ErrorBoundary />,
        loader: productLoader,
      },
      {
        path: '/product/detail/:id',
        element: <Detail />,
      },
      {
        path: '/login',
        element: <Account />,
      },
      {
        path: '/userinformation',
        element: <UserInformation />,
      },
      {
        path: '/Cart',
        element: <Cart />
      },
      {
        path: '/Order',
        element: <Order />
      },
      {
        path: '/Order/:id',
        element: <OrderDetail />
      },
      {
        path: '/Information',
        element: <Information />
      },
      {
        path: "*",
        element: <p>There's nothing here: 404!</p>,
      },

    ],
  },
]);

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div>Dang!</div>;
}


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
      localStorage.removeItem('JWT')
    })

  }, [])
  return (
    <>
      <RouterProvider router={router} />


      {/* <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Detail' element={<Detail />}></Route>
          <Route path='/product' element={<Product />}></Route>
          <Route path='/Account' element={<Account />}></Route>
          <Route path='/Information' element={<Information />}></Route>
          <Route path='/Cart' element={<Cart />}></Route>
          <Route path='/Order' element={<Order />}></Route>
          <Route path='/Order/:id' element={<OrderDetail />}></Route>
          <Route path='/UserInformation' element={<UserInformation />}></Route>
        </Routes>
      </Router>
      <Footer /> */}
    </>
  );
}

export default App;
