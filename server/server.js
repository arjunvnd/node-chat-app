const path = require('path');
const http = require('http');
const express=require('express');
const bodyparser=require('body-parser');
const socketIO=require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message')



const port=process.env.PORT||3000
const app = express();
var server=http.createServer(app);
var io=socketIO(server);

const publicPath=path.join(__dirname+'./../public')
app.use(bodyparser.json())
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log(`New user connected`)
    //Welcome message and new user added message
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'))
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'))

    
    socket.on('disconnect',()=>{
        console.log(`User was disconencted`)
    })


    //New user generated message
    socket.on('createMessage',(data,callback)=>{
        callback('Got the message on the server')
        io.emit('newMessage',generateMessage(data.from,data.text))


    })
    //Location message
    socket.on('createLocationMessage',(data)=>{
        
        io.emit('newLocationMessage',generateLocationMessage('Admin',data.latitude, data.longitude))
    })


})

server.listen(port,()=>{
    console.log(`Serever running on port 3000`)
})









