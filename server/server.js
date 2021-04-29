const express = require("express")
const mongoose = require("mongoose")
var cors = require('cors')
const todosRoute = require('./router/todoRoute')
const app = express()

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const PORT = process.env.PORT
const DB = process.env.DB 

const DB_Options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

mongoose
    .connect(DB, DB_Options ,(err) => 
        err === true? console.log(err): console.log(`DB Connected`))

app.listen(PORT, (err) => 
    err === true? console.log(err): console.log(`Working on port ${PORT}`))

app.use('/todos', todosRoute)



