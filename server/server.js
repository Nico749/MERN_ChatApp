const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const User =require('./models/User')
const Message =require('./models/Message')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/users', userRoutes)
//CONNECT THE DB
require('./connection')


const server = require('http').createServer(app)
const PORT = 5001
const io = require('socket.io')(server,
    {
        cors:{
            origin:"http://localhost:3000",
            methods:['GET','POST']
        }
    })

app.get("/rooms",(req,res)=>{
    res.json(rooms)
})    

async function getLastMessagesFromRoom(room){
    let roomMessages = await Message.aggregate([
        {$match:{to:room}},
        {$group:{_id:'$date',messagesByDate:{push:'ROOT'}}}
    ])
    return roomMessages
}
//sort messages by date 
function sortRoomMessagesByDate(messages){
    return messages.sort(function(a,b){
        let date1 = a._id.split('/')
        let date2 = b._id.split('/')
        // year, months,day, the format is 01/22/2000
        date1 = date1[2] + date1[0] +date1[1]
        date2 = date2[2] + date2[0]+ date2[1]

        return date1<date2? -1 :1
    })
}

//socket connection
//the first one is the socket frontend
io.on('connection',(socket)=>{

    socket.on('new-user',async()=>{
        const members = await User.find()
        //add the newly created user to the existing user list 
        io.emit('new-user',members)
    })

    socket.on('join-room',async(room)=>{
        socket.join(room)
        let roomMessages = await getLastMessagesFromRoom(room)
        roomMessages = sortRoomMessagesByDate(roomMessages)
        socket.emit('room-message',roomMessages)

    })
})

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})