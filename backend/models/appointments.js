const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    contactNumber: { type: String, required: true },
    status: { type: String, default: 'pending' },  // 'pending', 'confirmed', 'cancelled'
});

module.exports = mongoose.model('Appointment', appointmentSchema);
