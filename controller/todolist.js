let tasks = []
let idCounter = 1

exports.createTask = (req, res) => {
    const { title } = req.body
    if(!title) return res.status(400).json({ message: 'Task title is required!' })

    const newTask = {
        id: idCounter++,
        title,
        completed: false
    }

    tasks.push(newTask)
    res.status(201).json(newTask)
}

// Read / view Tasks
exports.getTasks = (req, res) => {
    if(tasks.length === 0) return res.status(200).json({ message: "No tasks created" })
    res.json(tasks)
}

// Update Tasks
exports.updateTask = (req, res) => {
    const { id } = req.params
    const { title, completed } = req.body

    const task = tasks.find(t => t.id === parseInt(id))
    if (!task) return res.status(400).json({ message: "Task not found" })
    if (title !== undefined) task.title = title
    if (completed !== undefined) task.completed = completed

    res.json(task)
}

// DELETE TASK
exports.deleteTask = (req, res) => {
    const { id } = req.params
    const index = tasks.findIndex(t => t.id === parseInt(id))

    if (index === -1) return res.status(404).json({ message: "Task not Found" })
    
    tasks.splice(index, 1)
    res.json({ message: "Task Deleted Successfully" })
}