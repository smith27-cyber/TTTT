document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var date = document.getElementById('date').value;
    var time = document.getElementById('time').value;

    var confirmationMessage = "Thank you, " + name + "! Your appointment is booked for " + date + " at " + time + ".";
    document.getElementById('confirmation-message').innerText = confirmationMessage;

    // Here, you would typically send this data to a server or save it in a database.
});
