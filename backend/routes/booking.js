
const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const nodemailer = require('nodemailer');

// Booking endpoint
router.post('/book', async (req, res) => {
    const { name, email, phone, date, time } = req.body;

    try {
        // Save booking to the database
        const newBooking = new Booking({ name, email, phone, date, time });
        await newBooking.save();

        // Send confirmation email (optional)
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-email-password'
            }
        });

        let mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Appointment Confirmation',
            text: `Dear ${name},\n\nYour appointment is booked for ${date} at ${time}.\n\nThank you!`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Email sent: ' + info.response);
        });

        res.status(200).json({ message: 'Booking successful' });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
