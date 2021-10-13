import React from 'react'
import './topnav.css'

const TopNav = () => {
    return (
        <div className = "topnav">
            <div>
               <a href = "http://localhost:3000/" className = "customStyle"> Home</a> 
            </div>
            <div className = "topnav__right">
                <div className = "topnav__right-item">
                    Username
                </div>
                <div className = "topnav__right-item">
                    <a className = "customStyle" >  logOut </a>
                </div>
            </div>
        </div>
    )
}

export default TopNav
