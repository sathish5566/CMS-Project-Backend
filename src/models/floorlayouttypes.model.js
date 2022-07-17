'use strict'
var dbConn = require('../../config/db.config')
//Users object created
var FloorLayoutTypes = function(floor_layout_types){
    
    this.layout_name    = floor_layout_types.layout_name;
    this.apartment_id      = floor_layout_types.apartment_id;
    this.layout_qtn      = floor_layout_types.layout_qtn;
    this.createdby      = floor_layout_types.createdby;
    this.created_date     = new Date();
    

};


//List FloorLayoutTypes
FloorLayoutTypes.FloorLayoutTypesList = function(floor_layout_types, result){

    dbConn.query("Select id,layout_name from  floor_layout_types where apartment_id  = ? and createdby = ?", [floor_layout_types.apartment_id,floor_layout_types.users_id],function(err,res){

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



module.exports = FloorLayoutTypes