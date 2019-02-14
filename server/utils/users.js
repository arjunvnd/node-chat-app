class Users {
    constructor(){
        this.users=[]
    }
    addUsers(id,name,room){
        var user={id,name,room}
        this.users.push(user)
        return user
        
    }
    removeUser(id){
        let user=this.getUser(id)
        if(user){
            this.users=this.users.filter(user=> user.id!==id)
        }
        return user
        
    }

    getUser(id){
        return this.users.filter(user=> user.id===id)[0]
    }
    getUserList(room){
        let userRoom= this.users.filter(user=>user.room===room)
        let userName = userRoom.map(user=>user.name)
        return userName
    }
}

module.exports={Users}