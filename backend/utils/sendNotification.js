const twilio = require('twilio');

// Twilio credentials (replace with your own)
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = twilio(accountSid, authToken);

// Function to send WhatsApp notification
const sendWhatsAppNotification = (contactNumber, message) => {
    client.messages.create({
        from: 'whatsapp:+14155238886',  // Twilio sandbox number
        to: `whatsapp:${contactNumber}`,
        body: message,
    })
    .then(message => console.log('WhatsApp message sent: ', message.sid))
    .catch(error => console.error('Error sending WhatsApp message:', error));
};

module.exports = sendWhatsAppNotification;
