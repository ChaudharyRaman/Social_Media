require('dotenv').config({path:__dirname + '/./.env'});

const express = require('express');
const { default: mongoose } = require('mongoose');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');
const app = express();
// const userRoutes = require('./routes/userRoutes')
const commonRoutes = require('./routes/commonRoutes')

app.use(express.json());

connectDB();

// app.use('/api/user/')
app.get('/',(req,res)=>{
    res.send('API WORKING')
});

// app.use('/api/authenticate',userRoutes);
// app.use('/api',userRoutes)
app.use('/api',commonRoutes)


app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen('5000',()=>{
    console.log(`listening to ${port}`);
});