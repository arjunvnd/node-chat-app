const expect = require('expect');
const {generateMessage}=require('./message');


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