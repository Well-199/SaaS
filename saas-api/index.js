require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connection = require('./src/config/database')
const routes = require('./src/routes/routes')

const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.get('/', (req, res) => {
    res.json({service: 'on'})
})

server.use('/api', routes)

server.use((req, res) => {
    res.status(404)
    res.json({ message: 'url não encontrada' })
})

server.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})

connection.connect((error) => {
    if(error){
        console.log(`Error in connecting database ${error}`)
    } else {
        console.log(`Database ${process.env.DB_NAME} successfully connected`)
    }
})
