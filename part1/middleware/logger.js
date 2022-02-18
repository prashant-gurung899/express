//logger middleware
let moment=require('moment')
const log = console.log;
let logger = (req,res,next)=>
{
    log(`${req.protocol}://${req.get('host')} ${req.originalUrl} : ${moment().format()}`)
    next();
}
module.exports=logger