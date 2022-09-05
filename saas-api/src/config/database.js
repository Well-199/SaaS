const { Client } = require('pg')

// const connection = new Client({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     dialect: 'postgres',
//     ssl: { 
//         rejectUnauthorized: false 
//     },
//     dialectOptions: {
//         useUTC: false,
//     },
//     timezone: '-03:00',
// })

const connection = new Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
})

connection.connect((error) => {
    if(error) throw error;
    console.log(`Database ${process.env.DB_NAME} successfully connected`)
})

module.exports = connection
