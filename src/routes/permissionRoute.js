const express=require("express");
const router=express.Router();
const permissionController=require('../controllers/permissionController');
const { route } = require("./userRoute");


router.post('/',permissionController.createPermission);
router.get('/getAllpermission',permissionController.getAllpermission);
router.put('/:id',permissionController.updatePermission);
router.delete('/:id',permissionController.deletePermission);
router.post('/assignpermission',permissionController.assignPermission);


module.exports=router;