console.log('Hello World')
const submitBtn = document.getElementById('submitBtn')
const taskInput = document.getElementById('taskInput')
const taskList = document.getElementById('taskList')

const URL = '/tasks'
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        console.log("Enter key disabled, use button instead")
    }
})


async function fetchTasks() {
    taskList.innerHTML = '' // Clears UI before rendering
    try {
        const res = await fetch(URL)
        const data = await res.json()

        if(Array.isArray(data)) {
            data.forEach(renderTask)
        }else {
            taskList.innerHTML = `<li>${data.message}</li>`
        }

    }catch(err){
        console.error('Error fetching tasks: ', err)
    }
}

// Render a single task
function renderTask(task) {
    const action = document.createElement('div')
    action.classList.add('task-actions')
    const li = document.createElement('li')
    li.textContent = task.title

    if(task.completed) {
        li.classList.add('completed')
    }

    // Complete Button
    const completeBtn = document.createElement('button')
    completeBtn.classList.add('complete-btn')
    completeBtn.textContent = '✔'
    completeBtn.onclick = async() => {
        await fetch(`${URL}/${task.id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json' },
            body: JSON.stringify({ completed: !task.completed })
        })
        fetchTasks() // refresh List
    }

    // Delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.textContent = '❌'
    deleteBtn.onclick = async() => {
        await fetch(`${URL}/${task.id}`, { method: 'DELETE'})
        fetchTasks()
    }
    
    action.appendChild(completeBtn)
    action.appendChild(deleteBtn)
    li.appendChild(action)
    taskList.appendChild(li)
}

// New task submission
submitBtn.addEventListener('click', async() => {
    const title = taskInput.value.trim()
    if(!title) return

    await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ title })
    })

    taskInput.value = ''
    fetchTasks()
})