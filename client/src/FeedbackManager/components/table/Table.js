import React from 'react'
import './table.css'
import '../status-card/statusCard.css'
import '../../assets/css/indexAdmin.css'

const Table = () => {
    return (
        <div className = "card">
            <div className = "table-wrapper">
                <table width = "100%">
                   
                    <thead>
                        <tr>
                            <th>one</th>
                            <th>two</th>
                            <th>three</th>
                            <th>four</th>
                            <th>five</th>
                        </tr>
                       
                    </thead>
                    <tbody>
                        <tr>
                            <td width = "22%">jhfd</td>
                            <td width = "22%">jhfd</td>
                            <td width = "22%">jhfd</td>
                            <td width = "22%">jhfd</td>
                            <td width = "10%"><button>Reply</button></td>
                        </tr>
                        <tr>
                            <td>jhfd</td>
                            <td>jhfd</td>
                            <td>jhfd</td>
                            <td>jhfd</td>
                            <td width = "10%"><button>Reply</button></td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
