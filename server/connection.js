const mongoose = require ('mongoose')
require('dotenv').config()
mongoose.connect(`mongodb+srv://nicochat:${process.env.DB_PWD}@cluster0.iaajd.mongodb.net/MernChatApp?retryWrites=true&w=majority`,()=>{
    console.log(`DB successfully connected!`)
})