const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/dbname', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error(error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
