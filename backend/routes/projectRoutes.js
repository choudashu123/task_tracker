const express = require('express');
const router = express.Router();

const { createProject, getProjects } = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware')

router.post('/', protect, createProject);
router.get('/', protect, getProjects);

module.exports = router;