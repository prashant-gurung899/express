const log = console.log;
let express= require('express')
let employees= require('../../employees')
let uuid = require('uuid')
let mongoose = require('mongoose');
const req = require('express/lib/request');
let router = express.Router()


let url ="mongodb+srv://prashant89964:prashant89964@newcluster.5pgdo.mongodb.net/api?retryWrites=true&w=majority"

//db conncetion
mongoose.connect(url)
let db = mongoose.connection;
//db connection error check
db.on('error',console.error.bind(console,'connection error'))
db.once('open',()=>
{
    log('Connection success')
})
//create object
let employeesdb={
    eid:String,
    ename:String,
    ecity:String
}
//create schema
let employeeSchema = mongoose.Schema(employeesdb)
let Employees = mongoose.model('Employees',employeesdb,'employees')
//GET : localhost:5000/api/employees =>GET => response as JSON which contains all employees
router.get('/',(req,res)=>res.json(employees))
//post
router.post('/',(req,res)=>
{
     //log(req.body)
     let newEmployee ={
         eid:uuid.v4(),
         ename:req.body.ename,
         ecity:req.body.ecity
     }
     //push this newEmployee object into employees array
     if(newEmployee.ename!=null && newEmployee.ecity!=null){
        let employee1= new Employees(newEmployee)
        employee1.save((err,result)=>
        {
            if(err){log(err)}
            else{
                log(`${result.eid} document saved successfully`)
            }
        })
        res.json({msg:`Employee with ID :${newEmployee.eid} created successfully`})
        employees.push(newEmployee)
     }
     else{
         res.status(400).json({msg:'please provide ename and ecity'})
     }
})

//update:to update a resource

router.put('/:eid',(req,res)=>
{
    let found=employees.some(employee=>employee.eid===parseInt(req.params.eid))
    if(found){
        let updatedEmployee = req.body
        //logic to update
        employees.forEach(employee=>{
            if(employee.eid===parseInt(req.params.eid)){
                employee.ename=updatedEmployee.ename?updatedEmployee.ename:employee.ename
                employee.ecity=updatedEmployee.ecity?updatedEmployee.ecity:employee.ecity
                res.json(employee)
            }
        })
        res.json({msg:`employee with the id : ${req.params.eid} updated successfully`}
        )
    }
    else{
        res.send(400).json({msg:`employee with id: ${req.params.eid} not found`})
        
    }
})
//delete
router.delete('/:eid',(req,res)=>
{
    let found=employees.some(employee=>employee.eid===parseInt(req.params.eid))
    if(found){
        res.json({msg:`Employee with id: ${req.params.eid} deletd successfully`,
        employees:employees.filter(employee=>employee.eid!==parseInt(req.params.eid))})
    }
    else{
        res.send(400).json({msg:`employee with id: ${req.params.eid} not found`})
    }
})
module.exports=router;