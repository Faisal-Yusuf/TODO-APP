require('dotenv').config()
const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const PORT = process.env.PORT || 3302

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ejs setup
app.set('view engine', 'ejs')
app.use(expressLayouts)

app.use(express.static('public'))

const taskRoutes = require('./routes/tasks')

app.use("/", taskRoutes)
app.get('/', (req, res) => {
    res.render('todoList', { layout: 'layouts/todoListLayout' })
})


process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:' , err)
    process.exit(1)
})

app.listen(PORT, () => {
    console.log(`Server running at PORT(${PORT})✅`)
})

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection: ', err)
    // Stops express server from accepting new connections, ongoing requests are allowed to finish no new request handled
    Server.close(() => process.exit(1))
})