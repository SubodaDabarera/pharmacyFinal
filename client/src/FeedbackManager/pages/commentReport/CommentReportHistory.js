import React, { useState } from 'react'
import { getData } from '../../../utils/FetchData'
import CommentReportHistoryCard from './CommentReportHistoryCard'

import jsPDF from "jspdf";
import "jspdf-autotable";

const CommentReportHistory = ({product}) => {

    const id = product._id
    const [comments, setComments] = useState([])

    useState(() => {
        getData(`/comments/report/${id}`)         
        .then(res => {
            setComments(res.data.comments)
        })
        .catch(err => console.log(err.responce.data.msg))
    }, [id])

  
    
    return (
       <>
            {
                comments.map(comment => (
                    <CommentReportHistoryCard key = {comment._id} comment = {comment} product = {product}/>
                ))
            }

       </>
    )
}

export default CommentReportHistory
