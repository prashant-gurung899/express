let express=require('express')
let mongoose= require('mongoose')
let bodyparser= require('body-parser')
let router = express.Router();

const log = console.log;

//body-parser
router.use(bodyparser.json())
router.use(express.urlencoded({extended:false}))

//mongodb cloud connection
let url="mongodb+srv://prashant89964:prashant89964@newcluster.5pgdo.mongodb.net/express?retryWrites=true&w=majority"
mongoose.connect(url,{useNewUrlParser:true},{useUnifiedTopology:true})
let db = mongoose.connection

//cloud connection error check
db.on('error',()=>console.error.bind(console,'connection error'))
db.once('open',()=>
{
    log('Connection with cloud mongoDB is success')
})

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
router.post('/contact',(req,res)=>
{
    let enquiry1= new Enquiries(req.body)
    //save form data
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

module.exports=router