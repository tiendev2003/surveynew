const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, addMultipleUsers } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/bulk', addMultipleUsers);

module.exports = router;