'use strict';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const Users = require('../models/users.model');
const Apartments = require('../models/apartments.model');
const ApartmentsBlocks = require('../models/apartmentsblocks.model');
const ResidentialTypes = require('../models/residentialtypes.model');
const FloorLayoutTypes = require('../models/floorlayouttypes.model');
const auth_key = require('../../config/auth.config')
const saltRounds = 10;



//Insert Appartment 

exports.AppartmentCreate= function(req, res){
  const new_apartments = new Apartments(req.body)
  
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
     // res.status(400).send({ error:true, message: 'Please provide all required field' });
     return  res.json({httpCode:400,error:false,message:"Please provide all required field"});
    }else{
      new_apartments.createdby=req.user.user_id
      Apartments.AppartmentCreate(new_apartments, function(err, apartments){
        if (err)
        res.send(err);
        return res.json({httpCode:200,error:false,message:"Apartments created successfully!",data:apartments});
      })
     
      
      
    }
};


//Insert AppartmentBlock,Comman Areas,Types 

exports.AppartmentBlockCreate= function(req, res){
  const form_data = req.body
  
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
     // res.status(400).send({ error:true, message: 'Please provide all required field' });
     return  res.json({httpCode:400,error:false,message:"Please provide all required field"});
    }else{
      
      form_data.createdby=req.user.user_id
      if(form_data.blocks_quantity > 0)
      {
       
        const block_data = JSON.parse(form_data.blocks);
        form_data.blocks_val = block_data;
       
      }
      if(form_data.common_areas_quantity > 0)
      {
       
        const area_data = JSON.parse(form_data.common_areas);
        form_data.area_val = area_data;
       
      }
      if(form_data.residential_quantity > 0)
      {
       
        const residential_data = JSON.parse(form_data.residential_types);
        form_data.residential_val = residential_data;
       
      }
      ApartmentsBlocks.AppartmentBlocksCreate(form_data, function(err, apartments){
        if (err)
        res.send(err);
        return res.json({httpCode:200,error:false,message:"Appartment block created successfully!"});
      })
     
      
      
    }
};

//Floor Layout Api

exports.CreateFloorLayout= function(req, res){
  const floor_layout= req.body
  
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
     // res.status(400).send({ error:true, message: 'Please provide all required field' });
     return  res.json({httpCode:400,error:false,message:"Please provide all required field"});
    }else{
      floor_layout.createdby=req.user.user_id
      
      ApartmentsBlocks.FloorLayoutCreate(floor_layout, function(err, apartments){
        if (err)
        res.send(err);
        return res.json({httpCode:200,error:false,message:"Floor Layout created successfully!",data:apartments});
      })
     
      
      
    }
};
//List the Residential Type List Dropdown Value

exports.ResidentialTypeList = (req, res) => {

  var residential_data={apartment_id:'',users_id:''}
  residential_data.apartment_id=req.query.apartment_id
  residential_data.users_id=req.user.user_id
  //const apartment_id=req.query.apartment_id
  ResidentialTypes.ResidentialTypeList(residential_data,function(err, residential_list) {

    if (err)
    res.send(err);
    
    res.json({httpCode:200,error:false,message:"Residential Type List",data:residential_list});
  
    });


};

//List the .FloorLayout Type List Dropdown Value

exports.FloorLayoutTypesList = (req, res) => {

  var floor_data={apartment_id:'',users_id:''}
  floor_data.apartment_id=req.query.apartment_id
  floor_data.users_id=req.user.user_id
  //const apartment_id=req.query.apartment_id
  FloorLayoutTypes.FloorLayoutTypesList(floor_data,function(err, floorlayout_list) {

    if (err)
    res.send(err);
    
    res.json({httpCode:200,error:false,message:"Floor Layout List",data:floorlayout_list});
  
    });


};

//List the .Total Block for block units setup

exports.TotalBlockList = (req, res) => {

  var floor_data={apartment_id:'',users_id:''}
  floor_data.apartment_id=req.query.apartment_id
  floor_data.users_id=req.user.user_id
  //const apartment_id=req.query.apartment_id
  ApartmentsBlocks.TotalBlockList(floor_data,function(err, floorlayout_list) {

    if (err)
    res.send(err);
    
    res.json({httpCode:200,error:false,message:"Floor Layout List",data:floorlayout_list});
  
    });


};


//Update Apartment Block
exports.UpdateApartmentBlock = (req,res) => {
  const update_block= req.body
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
     // res.status(400).send({ error:true, message: 'Please provide all required field' });
     return  res.json({httpCode:400,error:false,message:"Please provide all required field"});
    }else{
      update_block.createdby=req.user.user_id
       ApartmentsBlocks.UpdateBlockData(update_block, function(err, update_status){
        if (err)
        res.send(err);
        return res.json({httpCode:200,error:false,message:" Apartment block created successfully!",data:update_status});
      })
     
      
      
    }

};

exports.GetAllUnits = function(req, res) {
  var apartment_id = req.query.apartment_id;
  var searchText = req.query.search ? req.query.search : "" ;
  var sortBy = req.query.sort_by ? req.query.sort_by : "";
  var sortType = req.query.sort_type ? req.query.sort_type : "";
  var startLimit = 0;
  var endLimit = 10;
  if(req.query.page && req.query.page > 0){
    startLimit = parseInt(req.query.page) * 10;
  }
  var filters = {'searchText':searchText,"sortBy" :sortBy,"sortType" : sortType,"startLimit" : startLimit,"endLimit" : endLimit};

  ApartmentsBlocks.GetAllUnits(apartment_id,filters,function(err, unitList) {
    console.log('controller')
    if (err)
    res.send(err);
    console.log('res', unitList);
    return res.json({httpCode:200,error:false,message:"Units data!",data:unitList});
  });
};



