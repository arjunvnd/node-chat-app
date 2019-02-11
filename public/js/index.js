var socket=io();
const inputEl=document.querySelector('#message')
const submitBtn=document.querySelector('.btn')
const messageForm=document.querySelector('#message-form')
const locationBtn=document.querySelector('#send-location')
const olEl=document.querySelector('ol')

socket.on('connect',function(){
    console.log(`Connected to server`)    
})

socket.on('disconnect',function(){
    console.log(`Server is disconnected `)
})

socket.on('newMessage',function(message){
    console.log(`New Message !! ` , message)
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

locationBtn.addEventListener('click',function(){
    
    if(!navigator.geolocation){
        return alert('Your browser does not support this feature')
    }

    navigator.geolocation.getCurrentPosition(function(postion){

        socket.emit('createLocationMessage',{
            latitude:postion.coords.latitude,
            longitude:postion.coords.longitude
        }) 
    },function(){
        console.log(`Unable to fetch location`)
    })

})

socket.on('newLocationMessage',function(location){
    
    let liEl=document.createElement('li')
    let aEl=document.createElement('a')
    aEl.setAttribute('target','_blank')
    aEl.setAttribute('href',location.url)
    aEl.textContent='This is my location'
    liEl.innerHTML=`${location.from}: `
    liEl.appendChild(aEl)
    olEl.appendChild(liEl)
    console.log(olEl)
})
