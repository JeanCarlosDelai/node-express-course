require('dotenv').config()
require('express-async-errors')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
// express 
const express = require('express')
const app = express()

// rest of the packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
// database
const connectDB = require('./db/connect')

// router
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')


app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))

app.get('/api/v1', (req, res) => {
    console.log(req.signedCookies);
    res.send('E-commerce')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Servidor rodando na porta ${port}`))
    } catch (error) {
        console.log(error);
    }
}

start()