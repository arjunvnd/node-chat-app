const path = require('path');
const http = require('http');
const express=require('express');
const bodyparser=require('body-parser');
const socketIO=require('socket.io');

const {generateMessage,generateLocationMessage}=require('./utils/message')
const {isRealString}=require('./utils/validation')
const {Users}=require('./utils/users')


const port=process.env.PORT||3000
const app = express();
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users()


const publicPath=path.join(__dirname+'./../public')
app.use(bodyparser.json())
app.use(express.static(publicPath))

io.on('connection',(socket)=>{
    console.log(`New user connected`)

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name)||!isRealString(params.room)){
            callback('Enter a valid name and room')
        }else{
            socket.join(params.room)
            users.removeUser(socket.id)
            users.addUsers(socket.id,params.name,params.room)

            io.to(params.room).emit('updateUserList',users.getUserList(params.room))
            //Welcome message and new user added message
            socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'))
            socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined the room`))
            callback()
        }
    })

    
    socket.on('disconnect',()=>{
        // console.log(`User was disconencted`)
        let user=users.removeUser(socket.id)
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room))
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the room`))
        }
    })


    //New user generated message
    socket.on('createMessage',(data,callback)=>{
        let user=users.getUser(socket.id)
        if(user){
            io.to(user.room).emit('newMessage',generateMessage(user.name,data.text))
        }
        callback()



    })
    //Location message
    socket.on('createLocationMessage',(data)=>{
        let user=users.getUser(socket.id)
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,data.latitude, data.longitude))
        }
        
    })




})

server.listen(port,()=>{
    console.log(`Serever running on port 3000`)
})









