const express = require('express');
const { body } = require('express-validator');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Admin routes (protected)
router.post('/', auth, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('techStack').isArray({ min: 1 }).withMessage('At least one tech is required'),
], validate, createProject);

router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
