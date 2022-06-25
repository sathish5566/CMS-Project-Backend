'use strict'
var dbConn = require('../../config/db.config')
//SupserAdmin object created
var SupserAdmin = function(users){
    
    this.name    = users.name;
    this.username      = users.username;
    this.email  =users.email;
    this.password  =users.password;
    this.created_date     = new Date();
    

};


//Users Create
SupserAdmin.create = function(newUser, result){

    dbConn.query("INSERT INTO superadmin set ?", newUser , function(err,res){
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
SupserAdmin.Login = function(users, result){
    //console.log(users.email)
    dbConn.query("Select id,name,email,password from superadmin where email    = ?", users.email,function(err,res){

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
    
    SupserAdmin.findById = function(id,result)
{
    dbConn.query("Select * from  superadmin where id  = ?", id,function(err,res){

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
SupserAdmin.findAll = function (status='',result) {

    if(status != '')
    {
       
        dbConn.query("Select * from users where status=? order by id desc",status, function (err, res) {
            if(err) {
              console.log("error: ", err);
              result(null, err);
            }
            else{
              console.log('users : ', res);
              result(null, res);
            }
            });

    }else
    {
        

        dbConn.query("Select * from users  order by id desc", function (err, res) {
            if(err) {
              console.log("error: ", err);
              result(null, err);
            }
            else{
              console.log('users : ', res);
              result(null, res);
            }
            });
    }
    
    };
    SupserAdmin.readStatus = function(id, token, result){
    dbConn.query("UPDATE superadmin SET token=? WHERE id = ?",
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
SupserAdmin.updateAdminStatus = function(users, result){
    
   const update_date=new Date();
    dbConn.query("UPDATE users SET status=?,approved_by=?,approved_date=?,updated_date=? WHERE id = ?",
    [users.admin_status,users.admin_id,update_date,update_date,users.user_id],
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
SupserAdmin.delete = function(id, result){
    dbConn.query("DELETE FROM  superadmin where id=?", [id],function(err, res){

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



module.exports = SupserAdmin