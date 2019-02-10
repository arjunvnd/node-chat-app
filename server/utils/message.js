var generateMessage=(from,text)=>{
    this.from=from;
    this.text=text;
    return {
        from,
        text,
        createdAt:new Date().getTime()
    }
}

module.exports={generateMessage}