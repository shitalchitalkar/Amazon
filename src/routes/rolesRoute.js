const express=require('express');
const router=express.Router();
const rolesController=require('../controllers/rolesController');

router.post('/roles',rolesController.rolesCreate);
router.get('/roles',rolesController.rolesGet);
router.put('/roles/:id',rolesController.rolesUpdate);
router.delete('/roles/:id',rolesController.rolesDelete);
router.post('/assign_role',rolesController.assignRole);

module.exports=router;