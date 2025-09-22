const express = require('express')
const router = express.Router()
const { createTask, getTasks, updateTask, deleteTask } = require('../controller/todolist')

router.post('/tasks', createTask)
router.get('/tasks', getTasks)
router.put('/tasks/:id', updateTask)
router.delete('/tasks/:id', deleteTask)

module.exports = router