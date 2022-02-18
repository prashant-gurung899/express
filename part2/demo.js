const log = console.log;
const PORT = 5000;
const exp = require('constants');
let express = require('express')
let path = require('path')
let bodyparser = require('body-parser')
let mongoose = require('mongoose');
const { stringify } = require('querystring');

let app = express()

//mongodb cloud connection
let url="mongodb+srv://prashant89964:prashant89964@newcluster.5pgdo.mongodb.net/express?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true},{useUnifiedTopology:true})
let db = mongoose.connection

//cloud connection error check
db.on('error',()=>console.error.bind(console,'connection error'))
db.on('open',()=>
{
    log('Connection with cloud mongoDB is success')
})

//static middleware to route html files
app.use(express.static(path.join(__dirname,'public')))

//body-parser
app.use(bodyparser.json())
app.use(express.urlencoded({extended:false}))

//database schema
let enquiriesSchema = mongoose.Schema(
    {
        name:String,
        email:String,
        mobile:String,
        subject:String,
        message:String

    }
)
let Enquiries = mongoose.model('Enquiries',enquiriesSchema,'enquiries')

//contact form submission with POST method
app.post('/contact',(req,res)=>
{
    let enquiry1= new Enquiries(req.body)
    enquiry1.save((err,enquiry)=>
    {
        if(err){log(err)}
        else
        {
            log(`Dear ${enquiry.name}, your document is saved successully.`)
        }
    })
    res.send(`<h2 style='text-center;color:blue'>Dear ${req.body.name},your enquiry is submitted successfully.</h2>`)
    //log(req.body) //capturing incoming form data
})
app.listen(PORT,()=>{
    log(`Server started at port: ${PORT}`)
})


