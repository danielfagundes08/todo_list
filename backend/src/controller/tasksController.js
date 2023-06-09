const tasksModel = require('../models/tasksModel');

module.exports = {
    getAll: async (_req, res) => {
        const tasks = await tasksModel.getAll();
        return res.status(200).json(tasks);
    },

    createTask: async (req, res) => {
        const createdTask = await tasksModel.createTask(req.body);
        return res.status(201).json(createdTask);
    },
    
    deleteTask: async (req, res) => {
        const { id } = req.params;

        await tasksModel.deleteTask(id);
        res.status(204).json();
    },

    updateTask: async (req, res) => {
        const { id } = req.params;

        await tasksModel.updateTask(id, req.body);
        res.status(204).json();
    }
}