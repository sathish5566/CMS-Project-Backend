'use strict'
var dbConn = require('../../config/db.config')
//Users object created
var ResidentialTypes = function(residential_types){
    
    this.residential_name    = residential_types.residential_name;
    this.unit_type      = residential_types.unit_type;
    this.residential_size      = residential_types.residential_size;
    this.unit_type      = residential_types.unit_type;
    this.parking_slot    = residential_types.parking_slot;
    this.createdby      = residential_types.createdby;
    this.created_date     = new Date();
    

};


//List ResidentialType
ResidentialTypes.ResidentialTypeList = function(residential_types, result){

    dbConn.query("Select id,residential_name from  residential_types where apartment_id  = ? and createdby = ?", [residential_types.apartment_id,residential_types.users_id],function(err,res){

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



module.exports = ResidentialTypes