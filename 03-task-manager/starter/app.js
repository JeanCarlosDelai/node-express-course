
const express = require("express");
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config()

//Middlewarew
app.use(express.static('./public'))
app.use(express.json())

//Rotas
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.nextTick.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`O servidor está rodando na porta ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start()
