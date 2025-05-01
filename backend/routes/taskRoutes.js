const express = require('express');
const router = express.Router();
const { createTask, getTask, updateTask, deleteTask, getTasksByProject } = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');


router.get('/project/:projectId', protect, getTasksByProject);
router.post('/', protect, createTask);
router.get('/:id', protect, getTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, deleteTask);


module.exports = router;
