const express = require('express')
const router = express.Router()
const usersController =   require('../controllers/users.controller');
const superadminController =   require('../controllers/superadmin.controller');
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

module.exports = router