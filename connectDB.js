const mongoose = require('mongoose')

const connectToMongoDB = async (url) =>{
    try {
            await mongoose.connect(url);
            console.log("✅ MongoDB connected successfully");
        } catch (error) {
            console.error("❌ MongoDB connection error:", error);
            process.exit(1); // Exit process if connection fails
        }
}

module.exports = {
    connectToMongoDB
}