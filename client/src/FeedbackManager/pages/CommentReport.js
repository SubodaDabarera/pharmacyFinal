import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../GlobalStateD'
import '../assets/css/indexAdmin.css'
import '../components/table/table.css'
import CommentHistory from './commentHistory/CommentHistory'
import CommentReportHistory from './commentReport/CommentReportHistory'
import '../components/table/table.css'

import jsPDF from "jspdf";
import "jspdf-autotable";
import { getData } from '../../utils/FetchData'



const CommentReport = () => {

    const state = useContext(DataContext)
    const [products] = state.products
    const [comments, setComments] = useState([])


    useEffect(() => {

        products.forEach(product=> {
            getData(`/comments/report/${product._id}`)         
                .then(res => {setComments(res.data.comments)
                })
                .catch(err => console.log(err.responce.data.msg) 
                )
        })

    })


   useEffect(() => {
  
   }, [comments])


    const exampleDoc = () => {

        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
    
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);
    
        doc.setFontSize(15);
    
        const title = "Comment Report";
        const headers = [["Product ID", "Username", "Date", "Content"]];
        const tableRows = []


        const data = comments.map(comment=> [
            comment.product_id, comment.username, new Date(comment.createdAt).toLocaleString(), comment.content]);


        let contentX = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(contentX);
        doc.save("CommentReport.pdf")

    }


    return (

        <div>
            <h2 style = {{paddingLeft:" 20px"}}>Comments Report</h2>
     
            <div className = "card">

            <button onClick={() => exampleDoc()} className = "replyButtonCH" style = {{width: "180px", marginBottom : "30px", backgroudColor: "#019707"}}>Get the Report</button>

                <div className = "table-wrapper">
                    <table width = "100%">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Username</th>
                            <th>Comment</th>
                            <th>Date and time</th>
                            <th>Staff Name</th>
                            <th>Reply</th>
                            <th>Reply added Date and time</th>
                        </tr>
                    </thead>   

                        {
                            products.map(product => (
                                <CommentReportHistory key = {product._id} product = {product} />
                            ))
                        }

                </table>
                   
                    
                   
                </div>
            </div>
        </div>
    )
}

export default CommentReport
