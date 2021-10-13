import React, { useContext, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { DataContext } from '../../GlobalStateD'
import StatusCard from '../components/status-card/StatusCard'
import Table from '../components/table/Table'
import CommentHistory from './commentHistory/CommentHistory'

import '../assets/css/indexAdmin.css'
import '../components/table/table.css'

function Dashboard() {

    const state = useContext(DataContext)
    const [products] = state.products


    return (
        <div>
            <h2 style = {{paddingLeft:" 20px"}}>Comments History</h2>
     
            <div className = "card">
                <div className = "table-wrapper">
                    <table width = "100%">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Username</th>
                            <th>Content</th>
                            <th>Date and time</th>
                            <th></th>
                        </tr>
                    </thead>   

                        {
                            products.map(product => (
                                <CommentHistory key = {product._id} product = {product} />
                            ))
                        }

                </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

