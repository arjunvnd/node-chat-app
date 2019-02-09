const path = require('path');
const http = require('http');
const express=require('express');
const bodyparser=require('body-parser');
const socketIO=require('socket.io');
const port=process.env.PORT||3000
const app = express();
var server=http.createServer(app);
var io=socketIO(server);

const publicPath=path.join(__dirname+'./../public')
app.use(bodyparser.json())
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log(`New user connected`)


    
    socket.on('disconnect',()=>{
        console.log(`User was disconencted`)
    })

    socket.emit('newMessage',{
        from:'user01',
        text:'This is a test message',
        createdAt:new Date().toUTCString()
    })

    socket.on('createMessage',(data)=>{
        console.log(`Message form front end`, data)
    })


})

server.listen(port,()=>{
    console.log(`Serever running on port 3000`)
})









