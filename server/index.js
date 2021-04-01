const express=require('express')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
const fileupload=require('express-fileupload')
require('dotenv').config()
const path=require('path')
const complainRoutes=require('./routes/userComplain.route')
const officerRoutes=require('./routes/officer.route')


// mongoose.connect(process.env.HOST, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

mongoose.connect('mongodb://localhost:27017/roadService', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

mongoose.connection.once('open',()=>{
    console.log('connected to mongo');
})

const app=express()
app.use(express.json())
app.use(cookieParser())

app.use(fileupload())
app.use('/images',express.static(__dirname+'/images'))

app.use('/api/complains',complainRoutes)
app.use('/api/officer',officerRoutes)

if(process.env.NODE_ENV === 'production'){
  //set static folder
  app.use(express.static("client/build"))
  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,"client","build","index.html"))
  })
}

app.listen(process.env.PORT || 4000,()=>{
  console.log('app running',process.env.PORT);
})
