'use strict'
var dbConn = require('../../config/db.config')
//Users object created
var ApartmentsCommonAreas = function(apartmentscommonareas){
    
    this.area_code    = apartmentscommonareas.area_code;
    this.area_name      = apartmentscommonareas.area_name;
    this.apartment_id    = apartmentscommonareas.apartment_id;
    this.createdby      = apartmentscommonareas.createdby;
    this.created_date     = new Date();
    

};


//Users Create
ApartmentsCommonAreas.AppartmentBlocksCreate = function(apartmentscommonareas, result){

    var values = [];
   // console.log(apartmentsblocks.blocks_val)
   // result(null, apartmentsblocks);
    if(apartmentscommonareas.blocks_quantity > 0)
    {
        var sql = "INSERT INTO apartment_blocks (block_name, apartment_id, createdby,created_date) VALUES ?";
        for(var i = 0; i < apartmentsblocks.blocks_quantity; i++) {
            //console.log(block_data[i].block_name)
             values[i] = [apartmentsblocks.blocks_val[i].block_name,apartmentsblocks.apartment_id,apartmentsblocks.createdby,new Date()];
           
          }
        
    }
    
    dbConn.query(sql, [values], function(err) {
        if (err) result(err, null)
       
    });
      result(null, values);
  
    
    };



module.exports = ApartmentsCommonAreas