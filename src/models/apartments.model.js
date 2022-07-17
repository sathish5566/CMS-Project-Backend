'use strict'
var dbConn = require('../../config/db.config')
//Users object created
var Apartments = function(apartments){
    
    this.property_type    = apartments.property_type;
    this.createdby      = apartments.createdby;
    this.created_date     = new Date();
    

};


//Users Create
Apartments.AppartmentCreate = function(apartments, result){

    dbConn.query("INSERT INTO apartments set ?", apartments , function(err,res){
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



module.exports = Apartments