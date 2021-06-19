const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const config = require('../config/keys')
const Auth = require('../models/Auth')



exports.postSignup = async (req,res)=>{
    const { email,password } = req.body;
   const user = await Auth.findOne({email : email})
   if(user){
       if(user.status == 'pending'){
        return res.status(401).send({
            message: "Pending Account. Please Verify Your Email!",
          });
       }else{
         return  res.status(401).json({message : 'User already exists'});
       }
   }

  

 let newUser = new Auth({
     email : email,
     password : password
 })

  await newUser.save((err,doc) => {
    if(err) return res.status(404).json({error : err});
    console.log(doc);
    const token =   jwt.sign({email : email, id : doc._id}, config.secret )
    res.status(201).json({user : doc, success : true, token : token});

  })

}