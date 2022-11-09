require('dotenv').config()
const express = require('express');
const app = express();
const connectDB = require('./config/dbConfig')
const mongoose = require('mongoose');
const corsOptions = require('./config/corsOptions');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const blogRoutes = require('./route/blogRoutes')
const PORT = process.env.PORT || 4500;

connectDB();

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

//blog post routes
app.use('/api/blog', blogRoutes)

app.get('/', (req, res) => {
    res.status(200).json({status: true, message: 'server up and running'})
})

app.all('*', (req, res) => {
    res.status(400).json({ success: false, message: 'resource not found' })
})
    
mongoose.connection.once('open', () => {
    console.log('Database connected successfully')
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
})
