require('dotenv').config()

const express = require('express')
const cors = require('cors')
const connection = require('./src/config/connection')
const routes = require('./src/routes/routes')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: { origin: "*" }
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({service: 'on'})
})

app.use('/api', routes)

app.use((req, res) => {
    res.status(404)
    res.json({ message: 'url não encontrada' })
})

server.listen(process.env.PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})

connection.connect((error, client) => {
    if(error){
        console.log(`Error in connecting database ${error}`)
    } else {
        console.log(`Database ${process.env.DB_NAME} successfully connected`)

        io.on('connection', (socket) => {

            client.on('notification', (msg) => {

                // msg payload recebe os dados do novo pedido adcionado no banco
                let data = msg.payload

                // excuta metodo que avisa o front do novo pedido
                if(data){
                    socket.emit("pedido", {data: true})
                }
            })
            const query = client.query("LISTEN pedidos_new")
        
        })
        
    }
})

