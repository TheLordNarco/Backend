const express = require('express');
const { registerUser, getUsers, approveUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.post('/register', registerUser);
router.post('/:id/approve', approveUser);

module.exports = router;
