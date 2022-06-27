'use strict'
var dbConn = require('../../config/db.config')
//Users object created
var Users = function(users){
    
    this.name    = users.name;
    this.phone      = users.phone;
    this.address      = users.address;
    this.email  =users.email;
    this.password  =users.password;
    this.salt  =users.salt;
    this.ip_address  =users.ip_address;
    this.created_date     = new Date();
    

};

//Check email and phone no before create account 
Users.checkuser = function(newUser, result){
    
    dbConn.query("Select id,name,phone,address,email,password from  users where email = ? OR phone = ?", [newUser.email,newUser.phone],function(err,res){
        if(err) {
            console.log(err);
            result(err, null);
        } else { 
            console.log(res);
            result(null ,res);
        }
    });
    
};

//Users Create
Users.create = function(newUser, result){

    dbConn.query("INSERT INTO users set ?", newUser , function(err,res){
        if(err)
        {
            console.log("error:", err)
            result(err, null)
        }
        else
        {
            console.log(res.insertId)
            result(null, res.insertId)
        }
    });
    
};

Users.Login = function(users, result){
    //console.log(users.email)
    dbConn.query("Select id,name,phone,address,email,password,status from  users where email    = ?", users.email,function(err,res){

        if(err)
        {
            console.log(err)
            result(err, null)
        }else
        {
            console.log(res)
            result(null ,res)
        }
    });
    
};
    
Users.findById = function(id,result)
{
    dbConn.query("Select * from  users where id  = ?", id,function(err,res){

        if(err)
        {
            console.log(err)
            result(err, null)
        }else
        {
            console.log(res)
            result(null ,res)
        }
    });
};
//Get all Users Details Expect Admin Only
Users.findAll = function (result) {
    dbConn.query("Select * from users where id NOT IN (1) order by id desc", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('users : ', res);
      result(null, res);
    }
    });
    };
Users.readStatus = function(id, token, result){
    dbConn.query("UPDATE users SET token=? WHERE id = ?",
    [token,id],
    function(err, res)
    {
        if(err) 
        {
            console.log(err)
            result(null, err)
        }else
        {
            console.log(res)
            result(null, res)
        }  
    });
};



//Update Users
Users.update = function(id, users, result){
    
   const update_date=new Date();
    dbConn.query("UPDATE users SET user_name=?,email_id=?,phone_number=?,updated_at=? WHERE id = ?",
    [users.user_name,users.email_id,users.phone_number,update_date,id],
    function(err, res)
    {
        if(err)
        {
            console.log(err)
            result(null, err)
        }else
        {
            console.log(res)
            result(null, res)
        }  
    });
};

//Delete Users
Users.delete = function(id, result){
    dbConn.query("DELETE FROM  users where id=?", [id],function(err, res){

        if(err)
        {
            console.log(err)
            result(null, err)
        }else
        {
            console.log(res)
            result(null, res)
        }  
        
    });
};



module.exports = Users