const mongoose = require('mongoose');
const User = require('./models/userModel');
require('dotenv').config()

const createUser = async (username, email, password) => {
    
    try {
        mongoose.set('strictQuery',false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("database Connected");
        await User.create({
            username,
            email,
            password
        });
    } catch (error) {
        console.log(error.message);
    }


    await mongoose.connection.close();
}

createUser('varun', 'varun@gmail.com', '123456789');