require('dotenv').config({path:__dirname + '/./.env'});

const express = require('express');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/userRoutes')
const followRoutes = require('./routes/followRoutes')
const postRoutes = require('./routes/postRoutes')


app.use(express.json());
app.use(cors({
    origin:"*"
}))
connectDB();

app.get('/',(req,res)=>{
    res.send('API WORKING')
});

app.use('/api',userRoutes)
app.use('/api',followRoutes)
app.use('/api',postRoutes)


app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen('5000',()=>{
    console.log(`listening to ${port}`);
});