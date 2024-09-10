const express = require('express');
const http = require('http');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');

// Initialize Express application
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static('public')); // Serve static files from the public directory

// Content Security Policy (CSP) Setup using Helmet
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:5000"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    }
  }
}));

// Routes
app.use('/api', require('./routes/booking'));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/booking.html', (req, res) => {
    res.sendFile(__dirname + '/public/booking.html');
});

// Endpoint to handle the booking form submission
app.post('/submit-booking', (req, res) => {
    const { name, email, appointmentDate } = req.body;

    // Setup Nodemailer to send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Use environment variables
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Use environment variables
        to: 'recipient-email@example.com', // Replace with the recipient email
        subject: 'New Booking Submission',
        text: `Booking Details:
        Name: ${name}
        Email: ${email}
        Appointment Date: ${appointmentDate}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error submitting booking.' });
        } else {
            res.status(200).json({ message: 'Booking submitted successfully!' });
        }
    });
});

// Server setup
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
