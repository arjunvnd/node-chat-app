var socket=io();
const inputEl=document.querySelector('#message')
const submitBtn=document.querySelector('.btn')
const messageForm=document.querySelector('#message-form')


socket.on('connect',function(){
    console.log(`Connected to server`)    
})

socket.on('disconnect',function(){
    console.log(`Server is disconnected `)
})

socket.on('newMessage',function(message){
    console.log(`New Message !! ` , message)
    const olEl=document.querySelector('ol')
    let liEl=document.createElement('li')
    liEl.textContent=`${message.from}:${message.text}`
    olEl.appendChild(liEl)
})


//Event Listner for submition

messageForm.addEventListener('submit',function(e){

    socket.emit('createMessage',{
        from:'User',
        text:inputEl.value
    },function(){

    })
    e.preventDefault()
    

})


