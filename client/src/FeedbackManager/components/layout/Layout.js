import React from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../sidebar/Sidebar'
import Routes from '../Routes'
import './Layout.css'

import { BrowserRouter, Route } from 'react-router-dom'
import App from '../../../App'
import TopNav from '../topnav/TopNav'

const Layout = () => {
    return (
       <BrowserRouter>
            <Route render = {(props) => (
                <div className = "layout">
                    <Sidebar {...props} />
                    <div className = "layout_content">
                        <TopNav/>
                        <div className = "layout_content-main">
                            <Routes />

                        </div>
                    </div>

                    in layout
                </div>
            )} />
          

       </BrowserRouter>
    )
}

export default Layout

