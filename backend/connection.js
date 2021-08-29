const mongoose = require('mongoose')
const {mongodbURI} =require('./secretdata/secret')
const connectionurl=mongodbURI

const connection=async()=>{
try {
    await mongoose.connect(connectionurl,{
        useNewUrlParser:true,
        useFindAndModify:false,
        useCreateIndex:true,
        useUnifiedTopology: true,
    })
    console.log('connected to mongo db')
} catch (error) {
    console.log(error)
}
}

module.exports=connection