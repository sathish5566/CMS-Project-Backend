const express = require('express')
const router = express.Router()
const usersController =   require('../controllers/users.controller');
const superadminController =   require('../controllers/superadmin.controller');
const InitialSetupController =   require('../controllers/initialsetup.controller');
const auth = require("../middleware/auth");
const auth_key = require('../../config/auth.config')


//Register Super Admin
router.post('/register-superadmin', superadminController.Create);
// Retrive  Super Admin Login User 
router.post('/login-superadmin', superadminController.Login);
//Retrive  All User From Super Admin
 router.get('/get-all-users',[auth], superadminController.findAll);
 router.get('/get-all-users-total',[auth], superadminController.findAllTotal);
//Admin Approve Api
router.post('/admin-approve-status',[auth], superadminController.ApproveAdminStatus);

// Retrive  a Login User 
router.post('/login', usersController.Login);
//Register the Users
router.post('/register-user', usersController.Create);

// Retrieve current logged in user details 
router.get('/current-users-details',[auth], superadminController.CurrentLoginUserDetails)


//Initial Setup 
router.post('/create-appartment',[auth], InitialSetupController.AppartmentCreate);
//Insert AppartmentBlock,Comman Areas,Types 
router.post('/create-appartment-blocks',[auth], InitialSetupController.AppartmentBlockCreate);
//Insert Floor layout set up
router.post('/create-floor-layout',[auth], InitialSetupController.CreateFloorLayout);
//Residential Type List
router.get('/residential-type-list',[auth], InitialSetupController.ResidentialTypeList);
//Floor Layout Type Lis
router.get('/floor-layout-type-list',[auth], InitialSetupController.FloorLayoutTypesList);
//get block list
router.get('/total-blocks-list',[auth], InitialSetupController.TotalBlockList);
//Update Floor Level
router.post('/update-apartment-blocks',[auth], InitialSetupController.UpdateApartmentBlock);
//Property Type
router.get('/property-type', usersController.PropertyTypeList); 
//Property Type
router.get('/unit-types', usersController.UnitTypeList);
//Retrive  All User Units for display 
router.get('/get-all-appartment-units',[auth], InitialSetupController.GetAllUnits);

module.exports = router