const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected");
    }catch(error){
        console.log(error.message);
    }
}

module.exports = connectDB;