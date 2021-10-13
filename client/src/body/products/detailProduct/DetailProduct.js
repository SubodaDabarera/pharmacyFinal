import { Card, Container, Grid, makeStyles } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../../components/Topbar';
import SideDrawer from '../../../components/SideDrawer'
import {Link, useParams} from 'react-router-dom'
import { DataContext } from '../../../GlobalStateD';
import { getData } from '../../../utils/FetchData';
import DetailProductCard from '../../detailProductCard/DetailProductCard';
import './DetailProduct.css'
import CommentFormInput from '../../commentFormInput/CommentFormInput';
import CommentItem from '../../commentItem/CommentItem';

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: "100%",
      borderRadius: 12,
      boxShadow: "rgba(83, 144, 217, 0.1) 0px 4px 12px",
      overflow: "unset",
    },
    mainGrid: {
        [theme.breakpoints.down("xs")]: {
          justifyContent: "center",
        },
      },
    topBarGrid: {
        paddingTop: "22px !important",
        marginBottom: "auto",
        [theme.breakpoints.down("xs")]: {
        display: "block",
        maxWidth: "unset",
        paddingLeft: "0 !important",
        paddingRight: "0 !important",
        },
    },
    sideDrawer: {
        minWidth: "17.9%",
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },
        [theme.breakpoints.up("xl")]: {
          minWidth: "16.66667%",
        },
      },
    sideDrawerGrid: {
        marginTop: 10,
        [theme.breakpoints.down("xs")]: {
          display: "none",
        },
      },
      container: {
        width: "100%",
        margin: "0 auto",
        paddingTop: 10,
        paddingBottom: 10,
        minHeight: "100vh",
      },
   
  }));


function DetailProduct() {

    const {id} = useParams() 
    const classes = useStyles();

    const state = useContext(DataContext)
    const [products] = state.products
    const socket = state.socket


    const [detailProduct, setDetailProduct] = useState([])
    const [rating, setRating] = useState(0)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchUsername, setSearchUsername] = useState('')


    // ############################################--------Testing details
    //const [userInfo, setUserInfo] = useState('Lahiru')
    const [name, setName] = useState(sessionStorage.getItem("userName"))

    useEffect(() => {
        setDetailProduct(products.filter(product => product._id === id) )
       
    }, [id, products])

    useState(() => {
        setLoading(true)
        getData(`http://localhost:8000/comments/${id}`)
            .then(res => {
                setComments(res.data.comments)
                setLoading(false)
            })

            .catch(err => console.log(err.responce.data.msg))
    }, [id])


    //Realtime
    //Join room
    useEffect(() => {
        if(socket){
            socket.emit('JoinRoom', id)
        }
        
    },[socket, id] )

    useEffect(() => {
        if(socket){
            socket.on('sendCommentToClient', msg => {
                setComments([msg, ...comments])
            })

            return () => socket.off('sendCommentToClient')
        }
    },[socket, comments])

  
    //end realtime
    //Reply comments with realtime
    useEffect(() => {
        if(socket){
            socket.on('sendReplyCommentToClient', msg => {
                const newArr = [...comments]

                newArr.forEach(cm => {
                    if(cm._id === msg._id){
                        cm.reply = msg.reply
                    }
                })
                setComments(newArr)
            })

            return () => socket.off('sendReplyCommentToClient')
        }
    },[socket, comments])

   

    return (
        
        <div className={classes.root}>
            <div className="overlay">
                <Container maxWidth={false} className={classes.container}>
                    <Grid
                        container
                        direction="row"
                        spacing={3}
                        className={classes.mainGrid}
                        justify="space-between"
                        alignItems="flex-start">
                        
                        <Grid
                            item
                            container
                            xs={12}
                            spacing={3}
                            className={classes.topBarGrid}
                            direction="column"
                            justify="space-between"
                            >

                            <Grid item sm={12}>
                                <Topbar  />
                            </Grid>
                            <Grid item xs={12}>
                                <SideDrawer  />
                            </Grid>

                        </Grid>
                    </Grid>

                    {/* ####################################### */}
                    
                    <Card className={classes.root}>
                        <div className = "detail_product_page"> 
                                {
                                    detailProduct.map(product => (
                                        <DetailProductCard key = {product._id} product = {product}/>
                                    ))
                                }

                            <div className = "comments">
                                <h2 className = "app_title">
                                    Feedbacks and Reviews
                                </h2>

                                {   name ? 
                                    <>
                                        <div className = "reviews">
                                            <input type="radio" name="rate" id="rd-5" onChange = {() => setRating(5)}/>
                                            <label htmlFor="rd-5" className="fas fa-star"></label>

                                            <input type="radio" name="rate" id="rd-4" onChange = {() => setRating(4)}/>
                                            <label htmlFor="rd-4" className="fas fa-star"></label>

                                            <input type="radio" name="rate" id="rd-3" onChange = {() => setRating(3)}/>
                                            <label htmlFor="rd-3" className="fas fa-star"></label>

                                            <input type="radio" name="rate" id="rd-2" onChange = {() => setRating(2)}/>
                                            <label htmlFor="rd-2" className="fas fa-star"></label>

                                            <input type="radio" name="rate" id="rd-1" onChange = {() => setRating(1)}/>
                                            <label htmlFor="rd-1" className="fas fa-star"></label>
                                            
                                        </div>
                                            <CommentFormInput id={id} socket={socket} rating={rating}> </CommentFormInput>
                                    </>  
                                    :
                                    <p> Wants to post a comment, First <Link to = "/login" style = {{color: "#a66cd9" , fontSize: "20px"}}>Log In </Link> </p>
                                    
                                } 
                               
                                    <br/>
                               
                                

                                                               
                                {/* search input */}
                               <input className = "searchUsernameStyles" type = "text" placeholder = "Search Username..." onChange = {(event) => {
                                   setSearchUsername(event.target.value)
                               }} ></input>

                                <div className = "comments_list">
                                    
                                    { 
                                        // filter comments 
                                        comments.filter((comment) =>{
                                            if(searchUsername == ""){
                                                return comment
                                            }else if(comment.username.toLowerCase().includes(searchUsername.toLowerCase())){
                                                return comment
                                            }
                                            

                                        } ).map(comment => (
                                                <CommentItem key = {comment._id} comment = {comment} socket= {socket}/>
                                            ))
                                        

                                        
                                    }
                                </div>

                            </div>
                        </div> 
                    </Card>

                </Container>
            </div>
        </div>
     
    )
}

export default DetailProduct
