const mongoose = require('mongoose')
const alertmessages = require('./alertMessages')
mongoose.connect('mongodb+srv://AppsMaven:AppsMaven@1136@cluster0.zmxsu.mongodb.net/liveDemo?retryWrites=true&w=majority',{
    useNewUrlParser: true , useUnifiedTopology: true 
})

.then(()=>{
    console.log(alertmessages.connection)
})
.catch((err)=>{
    console.log(err)
})