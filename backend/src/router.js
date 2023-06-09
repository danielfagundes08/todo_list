const express = require('express');
const tasksController = require('./controller/tasksController');
const tasksMiddleware = require('./middleware/tasksMiddelware');

const router = express.Router();

router.get('/tasks', tasksController.getAll);
router.post('/tasks', tasksMiddleware.validaBody, tasksController.createTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', tasksController.updateTask);

module.exports = router;