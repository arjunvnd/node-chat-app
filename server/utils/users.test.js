const expect = require('expect')
const {Users}=require('./users')



describe('Users',()=>{
    var users
    beforeEach(()=>{
        users=new Users()
        users.users=[{
            id:'1',
            name:'Mike',
            room:'Node Course'
        },
        {
            id:'2',
            name:'Jen',
            room:'React Course'
        },
        {
            id:'3',
            name:'Lisa',
            room:'Node Course'
        }
        ]
    })
    it('should add new user',()=>{
        users=new Users()
        let user = {
            id:'1234',
            name:'John',
            room:'office fans'
        }
        let userRes= users.addUsers(user.id,user.name,user.room)
        expect(users.users).toEqual([user])
    })
    it('should return node course users',()=>{
        let resUser=users.getUserList('Node Course')
        expect(resUser).toEqual(['Mike','Lisa'])
    })
    it('should return react course users',()=>{
        let resUser=users.getUserList('React Course')
        expect(resUser).toEqual(['Jen'])
    })

    it('should find user',()=>{
        let resUser=users.getUser("1")
        expect(resUser.id).toBe('1')
    })
    it('should not find user',()=>{
        let resUser = users.getUser('99')
        expect(resUser).toNotExist()
    })

    it('should remove user',()=>{
        let userId='2'
        let resUser= users.removeUser(userId)

        expect(resUser.id).toBe(userId)
        expect(users.users.length).toBe(2)
    })
    it('should not remove user',()=>{
        let userId='99'
        let resUser= users.removeUser(userId)

        expect(resUser).toNotExist()
        expect(users.users.length).toBe(3)
    })
    
})