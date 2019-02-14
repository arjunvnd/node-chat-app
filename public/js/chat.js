


var socket=io();
const inputEl=document.querySelector('#message')
const submitBtn=document.querySelector('.btn')
const messageForm=document.querySelector('#message-form')
const locationBtn=document.querySelector('#send-location')
const olEl=jQuery('#messages')

function scrollToBottom(){
    //selectors
    let newMessage=olEl.children('li:last-child')
    

    //Heights
    let clientHeight=olEl.prop('clientHeight')
    let scrollTop=olEl.prop('scrollTop')
    let scrollHeight=olEl.prop('scrollHeight')
    let newMessageHeight=newMessage.innerHeight()
    let lastMessageHeight=newMessage.prev().innerHeight()
    
    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
        olEl.scrollTop(scrollHeight)
    }
}

socket.on('connect',function(){
    console.log(`Connected to server`)    
    let parms=jQuery.deparam(window.location.search)
    socket.emit('join',parms,function(err){
        if(err){
            window.location.href='/';
            alert(err)
        }else{
            console.log(`No error`)
        }
    })
})

socket.on('disconnect',function(){
    console.log(`Server is disconnected `)
})

socket.on('newMessage',function(message){
    let formattedTime=moment(message.createdAt).format('h:mm a')
    let templateEl=document.querySelector('#message-template')
    let template=templateEl.innerHTML
    let html = Mustache.render(template,{
        text:message.text,
        from:message.from,
        createdAt:formattedTime
    })

    // console.log(typeof(html))
    jQuery('#messages').append(html)
    scrollToBottom()
    // 
    // console.log(`New Message !! ` , message)
    // let liEl=document.createElement('li')
    // liEl.textContent=`${message.from} ${formattedTime}:${message.text}`
    // olEl.appendChild(liEl)
})


//New Location message printer
socket.on('newLocationMessage',function(location){

    let formattedTime=moment(message.createdAt).format('h:mm a')
    let template=document.getElementById('location-message-template').innerHTML
    let html=Mustache.render(template,{
        from:location.from,
        createdAt:formattedTime,
        url:location.url
    })
    jQuery('#messages').append(html)
    scrollToBottom()
    // let liEl=document.createElement('li')
    // let aEl=document.createElement('a')
    // aEl.setAttribute('target','_blank')
    // aEl.setAttribute('href',location.url)
    // aEl.textContent='This is my location'
    // liEl.innerHTML=`${location.from} ${formattedTime}: `
    // liEl.appendChild(aEl)
    // olEl.appendChild(liEl)
    // console.log(olEl)
})

socket.on('updateUserList',function(users){
    // console.log('User list',users)
    let ol=jQuery('<ol></ol>')
    users.forEach(user=>{
        ol.append(jQuery('<li></li>').text(user))
    })
    jQuery('#users').html(ol)
})

//Event Listner for submition of new messages

messageForm.addEventListener('submit',function(e){

    socket.emit('createMessage',{
        text:inputEl.value
    },function(){
        inputEl.value=''
    })
    e.preventDefault()
    

})

//Location sender function
locationBtn.addEventListener('click',function(){
    
    if(!navigator.geolocation){
        return alert('Your browser does not support this feature')
    }
    locationBtn.setAttribute('disabled','disabled')
    locationBtn.textContent='Sending location...'
    navigator.geolocation.getCurrentPosition(function(postion){
        locationBtn.removeAttribute('disabled')
        locationBtn.textContent='Send location'
        socket.emit('createLocationMessage',{
            latitude:postion.coords.latitude,
            longitude:postion.coords.longitude
        }) 
    },function(){
        locationBtn.removeAttribute('disabled')
        locationBtn.textContent='Send location'
        console.log(`Unable to fetch location`)
    })

})


