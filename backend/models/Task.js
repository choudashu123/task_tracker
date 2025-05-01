const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : { type: String, required: true},
    description : { type: String},
    status: { type: String, enum: ['To Do', 'In Progress', 'Completed'], default: 'To Do'},
    createdAt: { type: Date, default: Date.now},
    completedAt : {type: Date},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 

})

module.exports = mongoose.model('Task', taskSchema);