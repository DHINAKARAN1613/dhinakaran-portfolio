const express = require('express');
const { body } = require('express-validator');
const {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} = require('../controllers/contactController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Public route
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required'),
], validate, createContact);

// Admin routes (protected)
router.get('/', auth, getContacts);
router.patch('/:id/read', auth, markAsRead);
router.delete('/:id', auth, deleteContact);

module.exports = router;
