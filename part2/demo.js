const log = console.log;
const PORT = 5000;
const exp = require('constants');
let express = require('express')
let path = require('path')
//let bodyparser = require('body-parser')
//let mongoose = require('mongoose');
let router=require('./api')
const { stringify } = require('querystring');

let app = express()  

app.use(router)
//static middleware to route html files
app.use(express.static(path.join(__dirname,'public')))



app.listen(PORT,()=>{
    log(`Server started at port: ${PORT}`)
})


