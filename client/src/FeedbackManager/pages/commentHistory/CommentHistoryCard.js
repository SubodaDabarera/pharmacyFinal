import React from 'react'
import '../../components/table/table.css'
import '../../assets/css/indexAdmin.css'

const CommentHistoryCard = (props) => {

    const productId = props.product._id
    const path = `/product/${productId}` 

    return (
            <tbody>
                <tr>
                    <td >{props.product.name}</td>
                    <td >{props.comment.username}</td>
                    <td >{props.comment.content}</td>
                    <td >{props.comment.createdAt}</td>
                    <td ><a href = {path}><button className = "replyButtonCH" >Reply {'  '}<i class="fas fa-reply"></i></button></a></td>
                    
                </tr>
            </tbody>
    )
}

export default CommentHistoryCard
