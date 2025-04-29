const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try{
        const task = new Task({ ...req.body, projectId: req.body.projectId });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task Not found'});
        res.json(task);
    } catch (err) {
        res.status(500).json({message:err.message});
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (!task) return res.status(404).json({ message: 'Task not found'});
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found'});
        res.json({ message: 'Task deleted'});
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
};

