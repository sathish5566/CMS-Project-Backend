'use strict';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Users = require('../models/users.model');
const auth_key = require('../../config/auth.config')
const saltRounds = 10;



//Login Api
exports.Login= function(req, res){
  const new_users = req.body
 //return res.status(400).send({ error:true, message: new_users });
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
     // res.status(400).send({ error:true, message: 'Please provide all required field' });
     res.json({httpCode:400,error:true,message:"Please provide all required field"});
    }else{
        Users.Login(new_users, function(err, users){
          if (err)
          {
          res.send(err);
          }else
          {
            if(users !='')
            {
              //console.log(users[0].id)
              
               const validPassword = bcrypt.compareSync(new_users.password, users[0].password);
              if (validPassword) {
               // res.status(200).json({ message: "Valid password" });
               // Create token
               var email_id=users[0].email_id
               var users_details=users
                const token = jwt.sign(
                  { user_id: users[0].id,email_id},
                  auth_key.secret,
                  {
                    expiresIn: "24h",
                  }
                );
                res.json({httpCode:200,error:false,message:"Users Login successfully!",data:token});
                //Update token
                /*Users.readStatus(users[0].id, token, function(err, users_details) {

                  if (err)
                  {
                  res.send(err);
                  }else{     
                  //res.json({ error:false, message: '' });
                  
                  //res.json({httpCode:200,error:false,message:"Users Login successfully!",data:users});
                  }
              });*/
             
              } else {
                //res.status(400).json({httpCode:400, error: "Invalid Password" });
                return res.json({httpCode:400,error:true,message:"Invalid Password",data:null});
              }
              
            }else
            {
              return res.json({httpCode:400,error:true,message:"The admin approve soon.. "});
            }

            
          }

          
        })
    }
};




//Insert Users
exports.Create= function(req, res){
  const new_users = new Users(req.body)
  //res.json({data:new_users.password});
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
     // res.status(400).send({ error:true, message: 'Please provide all required field' });
     return  res.json({httpCode:400,error:false,message:"Please provide all required field"});
    }else{
     
      var ip =req.connection.remoteAddress || req.ip;
      new_users.ip_address=ip
      //console.log(ip)
     // return  res.json({httpCode:400,error:false,ip:ip });
      bcrypt.hash(new_users.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        new_users.password=hash
        Users.create(new_users, function(err, users){
          if (err)
          res.send(err);
          return res.json({httpCode:200,error:false,message:"User added successfully!",data:users});
        })
    });
      
      
    }
};



