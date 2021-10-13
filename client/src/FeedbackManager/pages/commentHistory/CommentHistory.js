import React, { useState } from 'react'
import '../../components/table/table.css'
import '../../assets/css/indexAdmin.css'
import { getData } from '../../../utils/FetchData'
import CommentHistoryCard from './CommentHistoryCard'

function CommentHistory({product}){

    
    const id = product._id
    const [comments, setComments] = useState([])

    useState(() => {
        getData(`/comments/${id}`)         
        .then(res => {
            setComments(res.data.comments)
        })
        .catch(err => console.log(err.responce.data.msg))
    }, [id])

    // console.log(comments)
   

    return (
          
        <>
            {
                comments.map(comment => (
                    <CommentHistoryCard key = {comment._id} comment = {comment} product = {product}/>
                ))
             }
        </>
             
    )
}

export default CommentHistory
