const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const userProjects = await Project.find({ userId: req.user._id});
        if (userProjects.length >=4) return res.status(400).json({ message: 'Project limit reached (4)'});
        const project = new Project({ title:req.body.title, userId: req.user._id});
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user._id});
        res.json(projects);
    } catch(err){
        res.status(500).json({message: err.message});
    }
};
