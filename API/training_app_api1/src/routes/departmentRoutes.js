const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/departments', departmentController.getDepartments);
router.post('/', departmentController.createDepartment);
router.put('/:id', departmentController.editDepartment);
router.delete('/:id', departmentController.deleteDepartment);
router.get('/departmentById/:id', departmentController.departmentById);


module.exports = router;