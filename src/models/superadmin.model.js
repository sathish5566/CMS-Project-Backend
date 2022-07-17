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
SupserAdmin.findAll = function (status='',filters = {},result) {
    var $sql = "select * from users "; var $whereCondition = '';var $totalSql = '';
    if(status != ''){
        $whereCondition += 'status='+status+' ';
    }
    if(filters.searchText){
        if($whereCondition){
            $whereCondition += ' and ';
        }
        $whereCondition += "( name like '%"+filters.searchText+"%' or email like '%"+filters.searchText+"%' or phone like '%"+filters.searchText+"%' )";
    }
    if($whereCondition !== ''){
        $sql += " where "+$whereCondition;
    } 
    $totalSql = "Select count(id) as total from users";
    if($whereCondition !== ''){
        $totalSql += " where "+$whereCondition;
    } 
    if(filters.sortBy){
        $sql += " order by "+filters.sortBy+" ";
    } else {
        $sql += " order by id  ";
    }
    if(filters.sortType){
        $sql += filters.sortType;
    }
    $sql += " LIMIT "+filters.startLimit+","+filters.endLimit;
    console.log($sql);
    console.log(filters);
    if(status != ''){
        dbConn.query($sql+';'+$totalSql,[1,2],function (err, res) {
            if(err) {
              console.log("error: ", err);
              result(null, err);
            }
            else{
                var returnData = {
                    "result" : res[0],
                    "total" : res[1][0]['total']
                };
              console.log('users : ', returnData);
              result(null, returnData);
            }
        });
    } else {
        dbConn.query("Select * from users  order by id ", function (err, res) {
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

//Get all Users Details Expect Admin Only
SupserAdmin.findAllTotal = function (status='',filters = {},result) {
    var $sql = "Select count(id) as total from users "; var $whereCondition = '';
    if(status != ''){
        $whereCondition += 'status='+status+' ';
    }
    if(filters.searchText){
        if($whereCondition){
            $whereCondition += ' and ';
        }
        $whereCondition += "( name like '%"+filters.searchText+"%' or email like '%"+filters.searchText+"%' or phone '%"+filters.searchText+"%' )";
    }
    if($whereCondition !== ''){
        $sql += " where "+$whereCondition;
    } 
    
    if(status != ''){
        dbConn.query($sql, function (err, res) {
            if(err) {
              console.log("error: ", err);
              result(null, err);
            }
            else{
              console.log('users : ', res);
              result(null, res);
            }
        });
    } else {
        dbConn.query("Select count(id) as total from users ", function (err, res) {
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
   var $sql = "UPDATE users SET status='"+users.user.status+"',approved_by='"+users.admin_id+"',approved_date='"+update_date+"',updated_date='"+update_date+"' ";
   if(users.user.declineReason){
        $sql += ",decline_reason='"+users.user.declineReason+"' ";
   }
   $sql += " WHERE id IN ("+users.user.user_ids+")";
    var query = dbConn.query($sql,
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
    console.log(query.sql); 
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

SupserAdmin.GetCurrentLoginUsers =  (users_type,user_id,result) => {

    if(users_type != 2)
    {       
        dbConn.query("Select * from superadmin where id=?",user_id, function (err, res) {
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

        dbConn.query("Select * from users where id=?",user_id, function (err, res) {
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


module.exports = SupserAdmin