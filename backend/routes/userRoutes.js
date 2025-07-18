const express = require('express');
const router = express.Router();
const {registerUser,authUser,allUsers} = require('../controllers/userControllers');
const {protect} = require('../middleware/authMiddleware');

// This will be added after the existing url 
router.route('/').post(registerUser).get(protect, allUsers); // Protect middleware is used
router.post('/login',authUser)

module.exports = router;