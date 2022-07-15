import React, { Children, useEffect, useState } from 'react'


import jsPDF from "jspdf";
import "jspdf-autotable";

const CommentReportHistoryCard = (props) => {

    const [isRepExist, setIsRepExist] = useState(false)

    const productId = props.product._id
    const path = `/product/${productId}` 

    useEffect(() => {
        if(props.comment.reply[0]){
            setIsRepExist(true)
        }
            
    }, [isRepExist])


    return (
        <tbody>
            <tr>
                <td >{props.product.name}</td>
                <td >{props.comment.username}</td>
                <td >{props.comment.content}</td>
                <td width = "12%">{new Date(props.comment.createdAt).toLocaleString()}</td>
                
                {
                    isRepExist ? (
                        <>
                            <td >{props.comment.reply[0].username}</td>
                            {/* <td >{props.comment.reply[0].content}</td> */}
                            <td><p dangerouslySetInnerHTML={{__html: props.comment.reply[0].content}}/> </td>
                            <td width = "12%">{new Date(props.comment.reply[0].createdAt).toLocaleString()}</td> 

                            
                        </>
                    ):(
                        <>
                            <td >-----------</td>
                            <td >-----------</td>
                            <td >-----------</td> 
                        </>
                    
                    )
                    
                }
                               
            </tr>
           
    </tbody>
    )
}

export default CommentReportHistoryCard
