const log = console.log;
const PORT= 5000;

let express = require('express');
let router=require('./routes/api/employeesapi')

const req = require('express/lib/request');
const res = require('express/lib/response');

//initialize express
let app = express()

app.use(express.json())
app.use('/api/employees',router)
app.listen(PORT,()=>
{
    log(`Server started on port : ${PORT}`)
})