'use strict';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Users = require('../models/superadmin.model');
const auth_key = require('../../config/auth.config')
//const helpers = require('../helpers/helpers')
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
                res.json({httpCode:200,error:false,message:{"":"Authenticate successfully!"},data:token});
               
             
              } else {
                //res.status(400).json({httpCode:400, error: "Invalid Password" });
                return res.json({httpCode:400,error:true,message:{"":"Invalid Password"},data:null});
              }
              
            }else
            {
              return res.json({httpCode:400,error:true,message:{"":"Email id does not exsits"}});
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


exports.findAll = function(req, res) {
  var status = req.query.status;
  var searchText = req.query.search ? req.query.search : "" ;
  var sortBy = req.query.sort_by ? req.query.sort_by : "";
  var sortType = req.query.sort_type ? req.query.sort_type : "";
  var startLimit = 0;
  var endLimit = 2;
  if(req.query.page && req.query.page > 0){
    startLimit = parseInt(req.query.page) * 2;
  }
  var filters = {'searchText':searchText,"sortBy" :sortBy,"sortType" : sortType,"startLimit" : startLimit,"endLimit" : endLimit};

Users.findAll(status,filters,function(err, users) {
console.log('controller')
if (err)
res.send(err);
console.log('res', users);
return res.json({httpCode:200,error:false,message:"Users data!",data:users});
});
};

exports.findAllTotal = function(req, res) {
  var status = req.query.status;
  var searchText = req.query.search;
  var sortBy = req.query.sort_by;
  var sortType = req.query.sort_type;
  
  var filters = {'searchText':searchText};

Users.findAllTotal(status,filters,function(err, users) {
console.log('controller')
if (err)
res.send(err);
console.log('res', users);
return res.json({httpCode:200,error:false,message:"Users data!",data:users});
});
};

exports.ApproveAdminStatus = function(req, res) {
  const new_users = req.body
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    return res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    new_users.admin_id = req.user.user_id;
    //new_users.user_ids = req.user.user_ids.join(',');
    console.log(new_users);
    Users.updateAdminStatus(new_users, function(err, users) {
   if (err)
   {
    res.send(err);
   }else{     
  return res.json({httpCode:200, error:false, message: 'Users status has been  updated.' });
   }
});
}
};

exports.CurrentLoginUserDetails = (req, res) => {
  const users_type = req.query.user_type
  if(users_type && users_type != '')
  {
    const user_id=req.user.user_id
    Users.GetCurrentLoginUsers(users_type,user_id, function(err, users) {

      if (err)
      res.send(err);
      
      res.json({httpCode:200,error:false,message:"get users!",data:users});
    
      });
  }
  
};



