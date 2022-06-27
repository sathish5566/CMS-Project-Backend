'use strict';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Users = require('../models/users.model');
const auth_key = require('../../config/auth.config')
const saltRounds = 10;



//Login Api
exports.Login= function(req, res){
  const new_users = req.body;
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
     res.json({httpCode:400,error:true,message:"Please provide all required field"});
  } else {
    Users.Login(new_users, function(err, users){
      if (err){
        res.send(err);
      } else {
        if(users !=''){
          var status=users[0].status;
          switch(status){
            case 0:
              return res.json({httpCode:400,error:true,message:{"":"Your request has not approved yet.Please contact admin"}});
            break;
            case 1:
              const validPassword = bcrypt.compareSync(new_users.password, users[0].password);
              if (validPassword) {
                var email_id=users[0].email_id
                var users_details=users
                const token = jwt.sign(
                  { user_id: users[0].id,email_id},
                  auth_key.secret,
                  {
                    expiresIn: "24h",
                  }
                );
                res.json({httpCode:200,error:false,message:{"":"Users Login successfully!"},data:token});
              } else {
                return res.json({httpCode:400,error:true,message:{"":"Invalid Password"},data:null});
              }
            break;
            default:
              return res.json({httpCode:400,error:true,message:{"":"Your request might be declined.Please contact admin to get the clarification"}});
            break;
          }
        } else {
          return res.json({httpCode:400,error:true,message:{"":"Email id does not exsists"}});
        }
      }
    });
  }
};




//Insert Users
exports.Create= function(req, res){
  const new_users = new Users(req.body)
  //res.json({data:new_users.password});
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
     // res.status(400).send({ error:true, message: 'Please provide all required field' });
     return  res.json({httpCode:400,error:true,message:{"":"Please provide all required field"}});
    }else{
     
      var ip =req.connection.remoteAddress || req.ip;
      new_users.ip_address=ip
      //console.log(ip)
     // return  res.json({httpCode:400,error:false,ip:ip });
      bcrypt.hash(new_users.password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        new_users.password=hash
        Users.checkuser(new_users, function(err, users){
          if (err)
            res.send(err);

          if(users !=''){
            var email_id=users[0].email;
            var phone=users[0].phone;
            if(email_id == new_users.email){
              return  res.json({httpCode:400,error:true,message:{"":"Email id already registered with us"}});
            } else if(phone == new_users.phone){
              return  res.json({httpCode:400,error:true,message:{"":"Phone number already registered with us"}});
            } 
          } else {
            Users.create(new_users, function(err, users){
              if (err)
              res.send(err);
              return res.json({httpCode:200,error:false,message:{"":"Regstered successfully! Once admin approved you can access our portal"},data:users});
            });
          }
        });
    });
      
      
    }
};



