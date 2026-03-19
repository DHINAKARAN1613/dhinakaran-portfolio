const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public read
router.get('/', getProfile);

// Admin write
router.put('/', auth, updateProfile);

module.exports = router;
