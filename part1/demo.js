let express = require('express');
let path = require('path')
let logger= require('./middleware/logger')
let employees= require('./employees')
//let moment = require('moment')
const req = require('express/lib/request');
const res = require('express/lib/response');

let app = express();

const log = console.log
const PORT = 5000;
//http://localhost:5000
/*app.get('/',(req,res)=>
{
    res.send(`<h2 style='color:blue;text-align:center'>welcome to express js tutorial</h2>`)
})

app.get('/contact',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public','contact.html'))
})
*/
app.use(logger)
//static middleware
app.use(express.static(path.join(__dirname,'public')))
app.get('/api/employees',(req,res)=>
{
    res.json(employees)
})


app.listen(PORT,()=>
{
    log(`Server listening on ${PORT}`)
})