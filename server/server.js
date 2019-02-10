const path = require('path');
const http = require('http');
const express=require('express');
const bodyparser=require('body-parser');
const socketIO=require('socket.io');

const {generateMessage}=require('./utils/message')



const port=process.env.PORT||3000
const app = express();
var server=http.createServer(app);
var io=socketIO(server);

const publicPath=path.join(__dirname+'./../public')
app.use(bodyparser.json())
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log(`New user connected`)
    socket.emit('newMessage',generateMessage('Admin','Welcome new user'))
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'))

    
    socket.on('disconnect',()=>{
        console.log(`User was disconencted`)
    })



    socket.on('createMessage',(data)=>{
        
        io.emit('newMessage',generateMessage(data.from,data.text))

        // socket.broadcast.emit('newMessage',{
        //     from:data.from,
        //     text:data.text,
        //     createdAt:new Date()
        // })
    })


})

server.listen(port,()=>{
    console.log(`Serever running on port 3000`)
})









