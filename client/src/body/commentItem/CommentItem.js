import React, { useEffect, useState } from 'react'
import { deleteComment, DeleteReply } from '../../utils/FetchData'
import CommentFormInput from '../commentFormInput/CommentFormInput'
import CommentCard from './CommentCard'

function CommentItem({comment, socket}) {

    const [reply, setReply] = useState(false)
    const [name, setName] = useState(sessionStorage.getItem("userName"))

    // #########################################
    // const [name, setName] = useState('Admin')

    const [commentDelete, setCommentDelete] = useState('')
    const [replyDelete, setReplyDelete] = useState('')
    const [updateReply, setUpdateReply] = useState('')
    let updateDetails = ''
    const [editReply, setEditReply] = useState(false)

    const [isActualUser, setIsActualUser] = useState(false)
    const [isFeedbackAdmin, setIsFeedbackAdmin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(true)

    useState(() => {

        if(name == comment.username){
            setIsActualUser(true)
        }
    })

    useState(() => {
        if(sessionStorage.getItem("userRole") == ""){       //######################----Admin
            setIsFeedbackAdmin(true)
        }
    })
 
    //delete comment
    useEffect(() => {
        deleteComment(`/comments/${commentDelete}`)
            .then(res => {
                console.log("Comment deleted")
                return alert('Comment deleted!')
            })
            .catch(err => console.log("Comment delete unsuccess"))
    }, [commentDelete])

    //delete reply
    useEffect(() => {
        DeleteReply(`/comments/reply/${replyDelete}`)
        .then(res => {
            console.log("Reply Deleted")
            return alert('Reply deleted!')
        })
        .catch(err => console.log("Reply delete unsuccess"))
    }, [replyDelete])


    const handleReply = (username) => {
        setReply(true)
        setName(username)
    }

    const hideReply = () => {
        setReply(false)
    }

    const handleReplyDelete = (commentId) => {
        setReplyDelete(commentId)
    }

    //for updation
    const handleUpdateReply = (commentId) => {
        setEditReply(true)
        setReplyDelete(commentId)
        setUpdateReply(updateDetails)
    }

    const handleCommentDelete = (commentId) => {
        setCommentDelete(commentId)
    }


    if(comment.reply) {
        if(comment.reply[0]){
            updateDetails = comment.reply[0].content
        }
    }


    return (
        <div>
            <CommentCard comment = {comment}>
                <div className = "nav_comment">
                    {   
                        isFeedbackAdmin &&
                        <>
                            <button className = "addReplyButton" onClick={() => handleReply(comment.username)}>Reply</button> {'  '}
                        </>
                    }
                    {
                        isActualUser || isFeedbackAdmin?
                        <button className = "DeleteCommentButton" onClick={() => handleCommentDelete(comment._id)}>Delete Comment</button>
                             : null
                    } 
        
                    {   
                        reply &&
                        <p onClick={hideReply}>Hide Reply</p>
                    }

                </div>
                <div className = "reply_comment">
                    {
                        comment.reply.map(rep => (
                            <CommentCard comment = {rep} key={rep._id}>
                                
                                {
                                    isFeedbackAdmin &&
                                    <>
                                        <button className = "DeleteCommentButton" onClick={() => handleReplyDelete(comment._id)}>Delete Reply</button>
                                        <button className = "addReplyButton" onClick={() => handleUpdateReply(comment._id)}>Edit Reply</button>
                                    </>
                                }

                                {
                                    editReply && 
                                    <CommentFormInput 
                                        id= {comment._id}
                                        socket= {socket}
                                        name = {name}
                                        setEditReply = {setEditReply}
                                        send= "replyComment"
                                        update = {updateDetails}
                                    />
                                }
                                    
                            </CommentCard>
                        ))
                        
                    }
                </div>
                {
                    reply && 
                    <CommentFormInput 
                        id= {comment._id}
                        socket= {socket}
                        name = {name}
                        setReply = {setReply}
                        send= "replyComment"
                        update = {updateDetails}
                    />
                }


            </CommentCard>
            
        </div>
    )
}

export default CommentItem
