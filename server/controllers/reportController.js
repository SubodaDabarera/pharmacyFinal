const Users = require("../models/users");
const Prescription = require("../models/prescription");


const  getReport = (req, res) => {
   var reportData = [];
   Users.find().exec(
       (err,users)=>{
           if(err){
               return res.status(400).json({
                   err:err
               })

           }
           users.forEach((element,index)=> {
               Prescription.find({customer:element._id},(err,prescriptions)=>{
                   if(err){
                    return res.status(400).json({
                        err:err
                    })
                       
                   }
                   const presCount = prescriptions.length
                   reportData.push({element,presCount})
                   if(index===users.length-1){
                       return res.status(200).json({
                           success:true,
                           reportData
                       })
                   }

               })
           });
       }
   )
  };




module.exports = {
     getReport
  };