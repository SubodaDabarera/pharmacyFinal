require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const app = express();
const { Socket } = require('dgram');


//import routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const prescriptionRoutes = require("./routes/prescription");
const filesRoutes = require("./routes/files");
const contactRoutes = require("./routes/contact");
const reportRoutes = require("./routes/report");

//##############################################
const adminRoute = require("./routes/adminSignInRoute")
const productRoute = require("./routes/productRoute")
const commentRoute = require('./routes/commentRoute');
const Comments = require('./models/commentModel');
const { Server } = require("http");
const commentReport = require("./models/commentReportModel");


// app middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());
app.use(helmet());
app.use(
  helmet.frameguard({
    action: "deny",
  })
);

app.use(compression());

app.use(require('cors')())

const http = require('http').createServer(app)
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"]
  }
})

//socket
// io.on('connection', (socket) => {
//   console.log("connected")
//   console.log(socket.id)
// })


// const http = require('http').createServer(app)
// const io = require('socket.io')(http)

//sockets
let users = []
io.on('connection', socket => {
    console.log(socket.id + ' connected.')

    socket.on('JoinRoom', id => {
        const user = {userId: socket.id, room: id}
       
        const check = users.every(user => user.userId !== socket.id)

        if(check){
            users.push(user)
            socket.join(user.room)

        }else{
            users.map(user => {
                if(user.userId === socket.id){
                    if(user.room !== id){
                        socket.leave(user.room)
                        socket.join(id)
                        user.room = id
                    }
                }
            })
        }

       

        //console.log(users)
       // console.log(socket.adapter.rooms)
    })

    socket.on('createComment',async msg => {
        const {username, content, product_id, createdAt, rating, send} = msg

        const newComment = new Comments({
            username, 
            content,
            product_id,
            createdAt,
            rating
        })

        const ReportComment = new commentReport({
          _id:newComment._id ,
          username, 
          content,
          product_id,
          createdAt,
          rating
      })

        if(send === 'replyComment'){
            const {_id, username, content, product_id, createdAt, rating} = newComment

            const comment = await Comments.findById(product_id)
            const reportCommentReply = await commentReport.findById(product_id)  // ###################
            
          
     
            if(comment){
                comment.reply.push({_id, username, content, createdAt, rating})
                await comment.save()

                // ###################
                reportCommentReply.reply.push({_id, username, content, createdAt, rating})
                await reportCommentReply.save()

                io.to(comment.product_id).emit('sendReplyCommentToClient', comment)
            }

     
        }else{
            await newComment.save()
            await ReportComment.save()
            io.to(newComment.product_id).emit('sendCommentToClient', newComment)
        }

    })

    socket.on('disconnect', () =>{
        console.log(socket.id + ' disconnected')
    })
})

// route middleware
app.use(userRoutes);
app.use(prescriptionRoutes);
app.use(filesRoutes);
app.use("/api", authRoutes);
app.use(contactRoutes);
app.use(reportRoutes);

app.use(productRoute);
app.use(commentRoute)
app.use(adminRoute)


const PORT = 8000;
const DB_URL = process.env.MONGO_TOKEN;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Error in DB connection", err);
  });

  http.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
