'use strict'
var dbConn = require('../../config/db.config')
//Users object created
var ApartmentsBlocks = function(apartmentsblocks){
    
    this.block_code    = apartmentsblocks.block_code;
    this.block_name      = apartmentsblocks.block_name;
    this.apartment_id    = apartmentsblocks.apartment_id;
    this.total_levels      = apartmentsblocks.total_levels;
    this.first_level    = apartmentsblocks.first_level;
    this.createdby      = apartmentsblocks.createdby;
    this.created_date     = new Date();
    

};


//Block Create
ApartmentsBlocks.AppartmentBlocksCreate = function(apartmentsblocks, result){

    var values = [];
    var comman = [];
    var residential = [];

   // console.log(apartmentsblocks.blocks_val)
   // result(null, apartmentsblocks);
    if(apartmentsblocks.blocks_quantity > 0)
    {
        var sql = "INSERT INTO apartment_blocks (block_name, apartment_id, createdby,created_date) VALUES ?";
        for(var i = 0; i < apartmentsblocks.blocks_quantity; i++) {
            //console.log(block_data[i].block_name)
             values[i] = [apartmentsblocks.blocks_val[i].block_name,apartmentsblocks.apartment_id,apartmentsblocks.createdby,new Date()];
           
          }
          dbConn.query(sql, [values], function(err,res) {
            if (err){
                result(err, null)
            }
            
           
        });
        
    }
    if(apartmentsblocks.common_areas_quantity > 0)
    {
        var comman_sql = "INSERT INTO apartment_common_areas (area_name, apartment_id, createdby,created_date) VALUES ?";
        for(var i = 0; i < apartmentsblocks.common_areas_quantity; i++) {
            //console.log(block_data[i].block_name)
            comman[i] = [apartmentsblocks.area_val[i].area_name,apartmentsblocks.apartment_id,apartmentsblocks.createdby,new Date()];
           
          }
          dbConn.query(comman_sql, [comman], function(err,res) {
            if (err){
                result(err, null)
            }
            
           
        });
          
        
    }
    if(apartmentsblocks.residential_quantity > 0)
    {
        var residential_sql = "INSERT INTO residential_types (apartment_id,residential_name,unit_type,residential_size,parking_slot,createdby,created_date) VALUES ?";
        for(var i = 0; i < apartmentsblocks.residential_quantity; i++) {
            //console.log(block_data[i].block_name)
            residential[i] = [apartmentsblocks.apartment_id,
                                apartmentsblocks.residential_val[i].name,
                                apartmentsblocks.residential_val[i].unit_type,            
                                apartmentsblocks.residential_val[i].residential_size,
                                apartmentsblocks.residential_val[i].parking_slot,
                                apartmentsblocks.createdby,new Date()];
           
          }
          dbConn.query(residential_sql, [residential], function(err,res) {
            if (err){
                result(err, null)
            }
            
           
        });
          
        
    }
   
      result(null, 'Inserted Successfully!');
   
    
    };

    ApartmentsBlocks.FloorLayoutCreate = function(floor_layout, result){
        if(floor_layout.total_floor_layout > 0)
        {
            const floor_data = JSON.parse(floor_layout.layout_type);
            const sub_floor_data = JSON.parse(floor_layout.layout_sub);
            const output = floor_data.map(floor => floor.type_qtn);
            var floor_val=[]
            var sub_floor_val=[]
            var data=[]
            //console.log(output);
           // result(null, output[0])
           // console.log(res.insertId)
            //result(null, res.insertId)
            var floor_sql="INSERT INTO floor_layout_types (apartment_id,layout_name,layout_qtn,createdby,created_date) VALUES (?,?,?,?,?)";
            var floor_sub_sql="INSERT INTO layout_residential_mapping (floor_layout_id,residential_types_id,quantity,createdby,created_date) VALUES (?,?,?,?,?)";
            for(var i=0;i<floor_data.length;i++)
            {
                dbConn.query(floor_sql, [floor_layout.apartment_id,floor_data[i].layout_name,floor_data[i].type_qtn,floor_layout.createdby,new Date()] , function(err,res){
                    if(err)
                    {
                        console.log("error:", err)
                        result(err, null)
                    }
                    else
                    {
                        console.log(res.insertId)
                        floor_val.push({'id':res.insertId})
                        
                    }
                });
                
            }
            //data.push(floor_val,sub_floor_val)
            result(null, floor_val)
        }
    };

    ApartmentsBlocks.UpdateBlockData = function(update_data, result){
        const update_date=new Date();
        dbConn.query("UPDATE apartment_blocks SET total_levels=?,first_level=?,updated_date=? WHERE createdby = ? and apartment_id = ?",
        [update_data.total_level,update_data.start_level,update_date,update_data.createdby,update_data.apartment_id],
        function(err, res)
        {
            if(err)
            {
                console.log(err)
                result(null, err)
            }
        });
        
        const apartment_block_unit= JSON.parse(update_data.unit_data);   
       
        const apartment_block_data =[]     
        if(apartment_block_unit.length > 0)
        {
            var block_sql = "INSERT INTO apartment_block_units (apartment_id,level_number,floor_layout_id,createdby,created_date) VALUES ?";
            for(var i = 0; i < apartment_block_unit.length; i++) {
               
                apartment_block_data[i] = [update_data.apartment_id,
                                    apartment_block_unit[i].level,
                                    apartment_block_unit[i].floor_layout,            
                                    update_data.createdby,
                                    new Date()];
               
              }
              dbConn.query(block_sql, [apartment_block_data], function(err,res) {
                if (err){
                    result(err, null)
                }
                
               
            });
        }
        result(null, 'Inserted Successfully!');

    }
    

module.exports = ApartmentsBlocks