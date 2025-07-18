const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async () =>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI,{});
        // console.log('MONGO_URI:', process.env.MONGO_URI); // should not be undefined

        console.log(`Database connection successful ${conn.connection.host}`.cyan.bold);
    }
    catch(err){
        console.log(`Error connecting to the database ${err}`.red.underline);
        process.exit();
    }
};

module.exports = connectDB;