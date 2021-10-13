import React, { useEffect, useRef } from 'react'
import { patchData } from '../../utils/FetchData'
import './CommentFormInput.css'

function CommentFormInput({id, socket, rating, setReply, send, name, update, setEditReply}) {

    const nameRef = useRef()
    const contentRef = useRef()

    useEffect(() => {
        if(name && update){
            contentRef.current.innerHTML = `
            <a href="#!"
                style="color: crimson;
                font-weight: 600;
                text-transform: capitalize;"
            > ${update}</a> `
        }
        else if(name){
            contentRef.current.innerHTML = `
            <a href="#!"
            style="color: crimson;
            font-weight: 600;
            text-transform: capitalize;"
            >${name}: </a> `
        }
    }, [name, update])

    const commentSubmit = () => {

        const username = sessionStorage.getItem("userName")
        const content = contentRef.current.innerHTML

        if(contentRef.current.textContent.trim().length < 20)
            return alert('Contents too short, must be at least 20 characters')

        const createdAt = new Date().toISOString()

        socket.emit('createComment', {
            username, content, product_id: id, createdAt, rating, send
        })

        if(rating && rating !== 0){
            patchData(`http://localhost:8000/products/${id}`, {rating})
        }

        contentRef.current.innerHTML = ''

        if(setReply) setReply(false)
        if(setEditReply) setEditReply(false)
    }


    return (
        <div className = "form_input">
           {/* <p> Name</p>
           <input type = "text" ref = {nameRef} /> */}

           <p> Content</p>
           <div ref = {contentRef}
                contentEditable = "true"

                style = {{
                    height: '100px',
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    outline : 'none'
                }}
           />

           <button style = {{borderRadius: "10px"}} onClick={commentSubmit}>Post</button>
          
           {/* onClick={commentSubmit} */}
        </div>
    )
}

export default CommentFormInput
