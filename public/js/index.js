var socket=io();
socket.on('connect',function(){
    console.log(`Connected to server`)
    socket.emit('createMessage',{
        from:"user02",
        text:"This is the new message"
    })


    
})
socket.on('disconnect',function(){
    console.log(`Server is disconnected `)
})

socket.on('newMessage',function(message){
    console.log(`New Message !! ` , message)
})
