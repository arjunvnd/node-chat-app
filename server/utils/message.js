var generateMessage=(from,text)=>{
    this.from=from;
    this.text=text;
    return {
        from,
        text,
        createdAt:new Date().getTime()
    }
}
var generateLocationMessage=(from,lati,longi)=>{
    return {
        from:from,
        url:`https://www.google.com/maps?q=${lati},${longi}`,
        createdAt:new Date().getTime()
    }
}

module.exports={generateMessage,generateLocationMessage}