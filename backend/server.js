const express = require('express');
const dotenv = require('dotenv');
const chats = require('./data');
const connectDB = require('./config/db');
const colors = require("colors");
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');

// .env configuration
dotenv.config();

//connecting the database
connectDB();

const app = express();

// To accept the json data from the frontend
app.use(express.json());



const PORT = process.env.PORT || 5000;

// api
// app.get('/', (req, res) => {
//     res.send("API is running!");
// });

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/notification',notificationRoutes);

// Deployment

const __dirname1 = path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1,"/frontend/build")));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
    });
}
else{
    app.get('/',(req,res)=>{
        res.send("API is running successfully!");
    })
}

// ----

app.use(notFound);
app.use(errorHandler);


// app.get("/api/chat/:id",(req,res)=>{
//     const singleChat = chats.find((c)=>c._id == req.params.id);
//     res.send(singleChat);
// });


const server = app.listen(5000, console.log(`Server running on port ${PORT}`.yellow.bold));

const io = require('socket.io')(server, {
    pingTimeout: 60000, // 60 seconds without a pong message from the client will cause the server to consider the connection closed
    cors: {
        origin: "*",
        //add other origin as well
        // credentials : true
    },
});

io.on("connection", (socket) => {
    console.log(`Connected to socket.io`.green.underline);

    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        console.log(`User ${userData.name} has joined the chat`);
        socket.emit('connected');
    })

    socket.on("joinChat",(room)=>{
        socket.join(room);
        console.log(`User has joined the room `+room);
    })

    socket.on("typing",(room)=>{
        socket.in(room).emit("typing");
    });

    socket.on("stopTyping",(room)=>{
        socket.in(room).emit("stopTyping");
    });

    socket.on("newMessage",(newMessageRecieved)=>{
        var chat = newMessageRecieved.chat;
        if(!chat.users) return console.log("Chat.users not defined");

        chat.users.forEach((user)=>{
            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("messageReceived",newMessageRecieved);
        })
    });

    socket.off("setup",()=>{
        console.log("User disconnected");
        socket.leave(userData._id);
    });
});

