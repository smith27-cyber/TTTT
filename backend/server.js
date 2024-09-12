const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

// Connect to the database
connectDB();

// Create the Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const appointmentRoutes = require('./routes/appointments');  // Make sure the path is correct
const adminRoutes = require('./routes/admin');

app.use('/api', appointmentRoutes);  // Route for appointments
app.use('/api', adminRoutes);        // Route for admin login

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
