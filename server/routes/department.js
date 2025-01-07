const express = require('express');

const { createDepartment, getDepartments, deleteDepartment, updateDepartment, getDepartmentById } = require('../controllers/departmentController');

const router = express.Router();

router.post('/', createDepartment);
router.get('/', getDepartments);
router.get('/:id', getDepartmentById);
router.put('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);

module.exports = router;