const Task = require('../models/Task');
const Project = require('../models/Project')

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, projectId } = req.body;

        if (!title || !projectId) {
            return res.status(400).json({ message: 'Title and projectId are required.' });
        }

        // Add userId to the task being created
        const task = new Task({
            title,
            description,
            status,
            projectId,
            userId: req.user._id,  // Set userId from the authenticated user
            createdAt: new Date(),
        });

        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: err.message });
    }
};


exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task Not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const updates = req.body;

        // If the status is being updated to "Completed", set completedAt
        if (updates.status === 'Completed') {
            updates.completedAt = new Date();
        } else if (updates.status && updates.status !== 'Completed') {
            // If status is changed from Completed to something else, remove completedAt
            updates.completedAt = null;
        }
        const task = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

// exports.getTasksByProject = async (req, res) => {
//   try {
//       const projectId = req.params.projectId;

//       if (!projectId) {
//           return res.status(400).json({ message: 'Project ID is required' });
//       }

//       // Find the project to make sure it's associated with the user
//       const project = await Project.findById(projectId);
//       if (!project) {
//           return res.status(404).json({ message: 'Project not found' });
//       }

//       // Ensure the project belongs to the authenticated user
//       if (project.userId.toString() !== req.user._id.toString()) {
//           return res.status(403).json({ message: 'You are not authorized to view tasks for this project' });
//       }

//       // Fetch tasks for the project and the user
//       const tasks = await Task.find({ projectId, userId: req.user._id });

//       // Return tasks, or an empty array if no tasks are found
//       if (!tasks || tasks.length === 0) {
//           return res.status(200).json([]);
//       }

//       res.json(tasks);
//   } catch (err) {
//       console.error('Error fetching tasks:', err);
//       res.status(500).json({ message: err.message });
//   }
// };

exports.getTasksByProject = async (req, res) => {
    const projectId = req.params.projectId;
    const tasks = await Task.find({ projectId })
    res.json(tasks);
}

