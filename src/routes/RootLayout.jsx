import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../common/footer/Footer'
import NavBar from '../common/header/NavBar'

function RootLayout() {
    return (<>
        <NavBar />
        <Outlet />
        <Footer />
    </>

    )
}

export default RootLayout