const Appointment = require('../models/appointment');
const sendWhatsAppNotification = require('../utils/sendNotification');

// Book a new appointment
exports.bookAppointment = async (req, res) => {
    const { patientName, service, date, time, contactNumber } = req.body;
    try {
        const newAppointment = new Appointment({ patientName, service, date, time, contactNumber });
        await newAppointment.save();

        // Optionally send WhatsApp notification
        sendWhatsAppNotification(contactNumber, `Your appointment for ${service} on ${date} at ${time} is confirmed!`);

        res.status(201).json({ message: 'Appointment booked successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error booking appointment' });
    }
};

// Get all appointments (for admin dashboard)
exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
};

// Update appointment status (confirm or cancel)
exports.updateAppointmentStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        appointment.status = status;
        await appointment.save();
        res.json({ message: 'Appointment status updated' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating appointment status' });
    }
};
