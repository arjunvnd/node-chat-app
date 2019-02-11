const expect = require('expect');
const {generateMessage,generateLocationMessage}=require('./message');


describe('generateMessage',()=>{
    it('should generate correct message object',()=>{
        let from='user1'
        let text='Hello there'
        let res=generateMessage(from,text)
        expect(res.from).toBe(from)
        expect(res.text).toBe(text)
        expect(res.createdAt).toBeA('number')
        
    })
})


describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        let from='user1'
        let lati=12
        let longi=11
        let res=generateLocationMessage(from,lati,longi)
        expect(res.from).toBe(from)
        expect(res.createdAt).toBeA('number')
        expect(res.url).toBe(`https://www.google.com/maps?q=${lati},${longi}`)
    })
})