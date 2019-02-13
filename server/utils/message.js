const moment=require('moment');
var date=moment()
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
        createdAt:date.valueOf()
    }
}

module.exports={generateMessage,generateLocationMessage}